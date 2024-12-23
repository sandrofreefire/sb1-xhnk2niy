/*
  # Initial Dating App Schema

  1. New Tables
    - `profiles`
      - Core user profile information
      - Linked to Supabase auth.users
      - Includes basic details and preferences
    
    - `photos`
      - User profile photos
      - Supports multiple photos per user
      - Stores photo URLs and metadata
    
    - `matches`
      - Records mutual matches between users
      - Includes match timestamp and status
    
    - `likes`
      - Records user swipes/likes
      - Used for match creation
    
    - `messages`
      - Chat messages between matched users
      - Includes message content and status

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated access
    - Secure user data visibility
*/

-- Profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  phone text UNIQUE,
  full_name text,
  birth_date date,
  gender text,
  bio text,
  occupation text,
  education text,
  location_lat decimal,
  location_lng decimal,
  interested_in text[],
  age_range_min int,
  age_range_max int,
  distance_range int,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Photos table
CREATE TABLE photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Likes table (swipes)
CREATE TABLE likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  is_super_like boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(from_user_id, to_user_id)
);

-- Matches table
CREATE TABLE matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  user2_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '7 days'),
  is_active boolean DEFAULT true,
  UNIQUE(user1_id, user2_id)
);

-- Messages table
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id uuid REFERENCES matches(id) ON DELETE CASCADE,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Photos policies
CREATE POLICY "Users can view photos of potential matches"
  ON photos FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can manage their own photos"
  ON photos FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Users can view their likes"
  ON likes FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can create likes"
  ON likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

-- Matches policies
CREATE POLICY "Users can view their matches"
  ON matches FOR SELECT
  TO authenticated
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Messages policies
CREATE POLICY "Users can view messages in their matches"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM matches m
      WHERE m.id = match_id
      AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their matches"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id
    AND EXISTS (
      SELECT 1 FROM matches m
      WHERE m.id = match_id
      AND (m.user1_id = auth.uid() OR m.user2_id = auth.uid())
    )
  );

-- Create functions
CREATE OR REPLACE FUNCTION create_match()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if there's a mutual like
  IF EXISTS (
    SELECT 1 FROM likes
    WHERE from_user_id = NEW.to_user_id
    AND to_user_id = NEW.from_user_id
  ) THEN
    -- Create a match
    INSERT INTO matches (user1_id, user2_id)
    VALUES (
      LEAST(NEW.from_user_id, NEW.to_user_id),
      GREATEST(NEW.from_user_id, NEW.to_user_id)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for match creation
CREATE TRIGGER create_match_trigger
AFTER INSERT ON likes
FOR EACH ROW
EXECUTE FUNCTION create_match();