-- Fix RLS policy for users table to allow INSERT/UPDATE
-- Run this script to fix the missing RLS policy

-- Drop existing policy if it exists (in case it was created incorrectly)
DROP POLICY IF EXISTS "Users can manage own profile" ON users;

-- Create the correct policy that allows users to manage their own profile
CREATE POLICY "Users can manage own profile" ON users
  FOR ALL USING (auth.uid() = id);

