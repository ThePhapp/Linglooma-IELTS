# 🗄️ Linglooma IELTS Database Migration Guide

## 📋 Overview
Complete database migration script for Linglooma IELTS learning platform, including all tables for Speaking, Reading, Writing, and Listening features.

## 📊 Database Schema

### **Tables Created (11 total)**

#### **1. Core Tables**
- `users` - User accounts and profiles
- `lesson` - Speaking practice lessons
- `question` - Speaking practice questions
- `lessonResult` - Speaking practice results
- `questionResult` - Individual question results
- `incorrectphonemes` - Pronunciation error tracking

#### **2. Reading Feature Tables**
- `reading_passages` - IELTS reading passages
- `reading_questions` - Questions for reading passages
- `reading_answers` - User answers for reading

#### **3. Writing Feature Tables**
- `writing_tasks` - IELTS writing tasks (Task 1 & Task 2)
- `writing_submissions` - User essays and AI feedback

## 🚀 How to Run Migration

### **Option 1: Using psql Command Line**

```bash
# Navigate to database folder
cd d:\New folder\Linglooma-IELTS\02-database-postgresql

# Run migration
psql -U postgres -d linglooma -f linglooma_complete_migration.sql
```

### **Option 2: Using pgAdmin**

1. Open pgAdmin 4
2. Connect to your PostgreSQL server
3. Right-click on your database → **Query Tool**
4. Open file: `linglooma_complete_migration.sql`
5. Click **Execute** (F5)

### **Option 3: Using DBeaver**

1. Open DBeaver
2. Connect to your database
3. Right-click database → **SQL Editor** → **Open SQL Script**
4. Select `linglooma_complete_migration.sql`
5. Click **Execute** (Ctrl+Enter)

## 📦 Sample Data Included

### **Users (3 accounts)**
- `demo@linglooma.com` - Demo account
- `jane@example.com` - Test user 1
- `john@example.com` - Test user 2

### **Speaking Lessons (6 topics)**
1. Technology (medium)
2. Environment (medium)
3. Education (easy)
4. Health (easy)
5. Travel (medium)
6. Love (hard)

**Total: 54 speaking questions** (9 questions per lesson)

### **Reading Passages (3 passages)**
1. The Impact of Climate Change on Global Agriculture (medium)
2. The Evolution of Artificial Intelligence (hard)
3. The Benefits of Multilingual Education (medium)

**Total: 9 reading questions** (3 questions per passage with explanations)

### **Writing Tasks (5 tasks)**
1. Graph Analysis: Internet Usage (Task 1, medium)
2. Opinion Essay: Technology in Education (Task 2, medium)
3. Problem-Solution Essay: Environmental Issues (Task 2, hard)
4. Chart Description: Employment Sectors (Task 1, easy)
5. Argumentative Essay: Public Health (Task 2, medium)

## 🔍 Database Features

### **Performance Optimizations**
- 9 indexes created for faster queries
- Foreign key constraints for data integrity
- CASCADE delete operations for clean data removal

### **Timestamps**
All tables include:
- `created_at` - Record creation time
- `updated_at` - Last modification time (where applicable)

### **JSONB Support**
- `reading_questions.options` - Stores multiple choice options as JSON
- Flexible schema for future enhancements

## ⚙️ Environment Configuration

### **Backend Configuration** 
Update your `.env` file in `01-backend-nodejs/`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=linglooma
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### **Check Database Connection**
```bash
cd 01-backend-nodejs
node -e "const db = require('./db'); db.query('SELECT NOW()', (err, res) => { console.log(err ? err : res.rows); process.exit(); });"
```

## 🧪 Verify Migration

### **Check Tables Created**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Expected output: 11 tables

### **Check Sample Data**
```sql
-- Users
SELECT COUNT(*) FROM users; -- Should return 3

-- Speaking
SELECT COUNT(*) FROM lesson; -- Should return 6
SELECT COUNT(*) FROM question; -- Should return 54

-- Reading
SELECT COUNT(*) FROM reading_passages; -- Should return 3
SELECT COUNT(*) FROM reading_questions; -- Should return 9

-- Writing
SELECT COUNT(*) FROM writing_tasks; -- Should return 5
```

### **Check Indexes**
```sql
SELECT indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY indexname;
```

Expected: 9 indexes

## 🔄 Rollback (if needed)

If you need to start fresh:

```sql
-- This will drop all tables and CASCADE delete related data
DROP TABLE IF EXISTS incorrectphonemes CASCADE;
DROP TABLE IF EXISTS questionResult CASCADE;
DROP TABLE IF EXISTS lessonResult CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS lesson CASCADE;
DROP TABLE IF EXISTS writing_submissions CASCADE;
DROP TABLE IF EXISTS writing_tasks CASCADE;
DROP TABLE IF EXISTS reading_answers CASCADE;
DROP TABLE IF EXISTS reading_questions CASCADE;
DROP TABLE IF EXISTS reading_passages CASCADE;
DROP TABLE IF EXISTS users CASCADE;
```

Then re-run the migration script.

## 📝 Notes

1. **Password Hashing**: Sample passwords use `$2b$10$` prefix (bcrypt format)
2. **Default Values**: Many fields have sensible defaults (timestamps, booleans, etc.)
3. **Nullable Fields**: Optional fields allow NULL for flexibility
4. **Order Matters**: Questions and passages have `order_number` for consistent display

## 🆘 Troubleshooting

### **Error: database "linglooma" does not exist**
```sql
CREATE DATABASE linglooma;
```

### **Error: permission denied**
Make sure your PostgreSQL user has CREATE privileges:
```sql
GRANT ALL PRIVILEGES ON DATABASE linglooma TO your_user;
```

### **Error: relation already exists**
The migration includes `DROP TABLE IF EXISTS` statements, but if you get this error, manually drop the tables first.

### **Connection refused (ECONNREFUSED)**
This error means your backend cannot connect to PostgreSQL. Check:
1. PostgreSQL is running: `pg_ctl status`
2. Port 5432 is open and listening
3. `.env` file has correct credentials
4. Firewall isn't blocking connection

**To fix the ECONNREFUSED error:**

```bash
# Windows - Check if PostgreSQL is running
sc query postgresql-x64-14

# If not running, start it
sc start postgresql-x64-14

# Or use Services app (services.msc) to start "postgresql-x64-14"
```

## ✅ Success Indicators

After successful migration, you should be able to:
- ✅ Login with demo account
- ✅ View 6 speaking lessons
- ✅ View 3 reading passages
- ✅ View 5 writing tasks
- ✅ Access all features without errors

## 📞 Support

If you encounter issues:
1. Check PostgreSQL logs
2. Verify connection settings
3. Ensure database exists
4. Check user permissions

---

**Migration Version:** 2.0  
**Last Updated:** November 9, 2025  
**Database:** PostgreSQL 12+
