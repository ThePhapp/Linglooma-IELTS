-- Check if migration ran successfully
-- Run this in Supabase SQL Editor

-- 1. List all tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;

-- 2. Check writing_tasks table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'writing_tasks'
ORDER BY ordinal_position;

-- 3. Check sample data
SELECT id, title, task_type, difficulty FROM writing_tasks LIMIT 5;
