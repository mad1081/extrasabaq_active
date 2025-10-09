-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  username TEXT UNIQUE NOT NULL,
  age INTEGER,
  city TEXT,
  school TEXT,
  grade INTEGER,
  interests TEXT[],
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create competitions table
CREATE TABLE IF NOT EXISTS competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  image_url TEXT,
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE,
  level TEXT CHECK (level IN ('international', 'national', 'regional', 'local')) NOT NULL,
  subject TEXT NOT NULL,
  category TEXT NOT NULL,
  age_limit TEXT,
  team_size TEXT NOT NULL,
  location TEXT,
  format TEXT CHECK (format IN ('online', 'offline', 'hybrid')) NOT NULL,
  is_free BOOLEAN DEFAULT true,
  language TEXT,
  website_url TEXT,
  organizer TEXT,
  prizes TEXT[],
  requirements TEXT[],
  schedule JSONB,
  status TEXT CHECK (status IN ('active', 'past', 'draft')) DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  competition_id UUID REFERENCES competitions(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, competition_id)
);

-- Create user_calendar table
CREATE TABLE IF NOT EXISTS user_calendar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  competition_id UUID REFERENCES competitions(id) ON DELETE CASCADE,
  reminder_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, competition_id)
);

-- Create team_posts table
CREATE TABLE IF NOT EXISTS team_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  competition_id UUID REFERENCES competitions(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  needed_members INTEGER NOT NULL,
  age_limit TEXT,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'closed', 'draft')) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_competitions_category ON competitions(category);
CREATE INDEX IF NOT EXISTS idx_competitions_subject ON competitions(subject);
CREATE INDEX IF NOT EXISTS idx_competitions_level ON competitions(level);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON competitions(status);
CREATE INDEX IF NOT EXISTS idx_competitions_deadline ON competitions(deadline);
CREATE INDEX IF NOT EXISTS idx_user_favorites_user_id ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_user_calendar_user_id ON user_calendar(user_id);
CREATE INDEX IF NOT EXISTS idx_team_posts_author_id ON team_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_team_posts_category ON team_posts(category);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_calendar ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Everyone can read active competitions
CREATE POLICY "Everyone can read active competitions" ON competitions
  FOR SELECT USING (status = 'active' OR status = 'past');

-- Users can manage their own favorites
CREATE POLICY "Users can manage own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Users can manage their own calendar
CREATE POLICY "Users can manage own calendar" ON user_calendar
  FOR ALL USING (auth.uid() = user_id);

-- Users can read all team posts
CREATE POLICY "Everyone can read team posts" ON team_posts
  FOR SELECT USING (status = 'active');

-- Users can manage their own team posts
CREATE POLICY "Users can manage own team posts" ON team_posts
  FOR ALL USING (auth.uid() = author_id);
