# 🚀 Hướng Dẫn Setup Supabase cho Linglooma IELTS

## 📋 Mục Lục
1. [Tạo Supabase Project](#1-tạo-supabase-project)
2. [Lấy Connection String](#2-lấy-connection-string)
3. [Run Migration](#3-run-migration)
4. [Cấu hình Environment Variables](#4-cấu-hình-environment-variables)
5. [Deploy to Render](#5-deploy-to-render)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Tạo Supabase Project

### Bước 1: Đăng ký/Đăng nhập Supabase
1. Truy cập: https://supabase.com
2. Click **"Start your project"** hoặc **"Sign In"**
3. Đăng nhập bằng GitHub (khuyến nghị)

### Bước 2: Tạo Project Mới
1. Click **"New Project"**
2. Điền thông tin:
   - **Name**: `linglooma-ielts`
   - **Database Password**: Tạo password mạnh (LƯU LẠI PASSWORD NÀY!)
   - **Region**: Chọn **Singapore** hoặc **Southeast Asia** (gần Việt Nam nhất)
   - **Pricing Plan**: Chọn **Free** (đủ cho development và small production)

3. Click **"Create new project"**
4. Đợi 2-3 phút để Supabase khởi tạo database

---

## 2. Lấy Connection String

### Bước 1: Vào Database Settings
1. Trong Supabase Dashboard, click **Settings** (⚙️) ở sidebar bên trái
2. Click **Database** trong menu Settings

### Bước 2: Copy Connection String
1. Scroll xuống phần **"Connection string"**
2. Chọn tab **"URI"** (KHÔNG phải Nodejs/psql)
3. Copy chuỗi có dạng:
   ```
   postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
   ```

4. **QUAN TRỌNG**: Thay `[YOUR-PASSWORD]` bằng database password bạn đã tạo ở bước 1.2

### Ví dụ Connection String:
```
# Trước khi thay password (từ Supabase)
postgresql://postgres.abcdefghij:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# Sau khi thay password (sử dụng)
postgresql://postgres.abcdefghij:MySuper$ecureP@ss123@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

---

## 3. Run Migration

### Option 1: Sử dụng psql (Khuyến nghị)

#### Windows:
```bash
# Mở PowerShell hoặc Git Bash

# Set DATABASE_URL
set DATABASE_URL=postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# Run migration
psql "%DATABASE_URL%" -f 02-database-postgresql/linglooma_update.sql
```

#### Mac/Linux:
```bash
# Set DATABASE_URL
export DATABASE_URL="postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"

# Run migration
psql "$DATABASE_URL" -f 02-database-postgresql/linglooma_update.sql
```

### Option 2: Sử dụng Supabase SQL Editor (Dễ nhất cho người mới)

1. Vào Supabase Dashboard
2. Click **"SQL Editor"** ở sidebar
3. Click **"New query"**
4. Mở file `02-database-postgresql/linglooma_update.sql` bằng text editor
5. Copy toàn bộ nội dung
6. Paste vào SQL Editor
7. Click **"Run"** (Ctrl+Enter)
8. Đợi 5-10 giây để migration chạy xong

### Kiểm tra Migration thành công:

Chạy query này trong SQL Editor:
```sql
SELECT 
    schemaname,
    tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
```

Kết quả phải có **11 tables**:
- ✅ incorrectphonemes
- ✅ lesson
- ✅ lessonresult
- ✅ question
- ✅ questionresult
- ✅ reading_answers
- ✅ reading_passages
- ✅ reading_questions
- ✅ users
- ✅ writing_submissions
- ✅ writing_tasks

---

## 4. Cấu hình Environment Variables

### Cho Local Development:

Tạo/Sửa file `.env` trong `01-backend-nodejs/`:
```properties
# Supabase Connection
DATABASE_URL=postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres

# JWT
JWT_SECRET=0dbbfbb3-5a8c-4657-bdc0-92c3f7d54f25
JWT_EXPIRE=1d

# Gemini AI
GEMINI_API_KEY=AIzaSyBcyCeP_T9gMz_9NRld6zPOy1bFtQeBFHI

# Azure Speech
AZURE_SPEECH_KEY=DP9zwU29Z1HBSL1Zwr1aSLdrPgm1GavAUxJcpsZfxCFiJf6jIz09JQQJ99BEAC3pKaRXJ3w3AAAYACOGYrCv
AZURE_SPEECH_REGION=eastasia

# Server
PORT=3000
```

### Test Connection Local:
```bash
cd 01-backend-nodejs
npm install
npm run dev
```

Nếu thấy:
```
✅ Connected to PostgreSQL database successfully!
   Source: Supabase/Cloud (DATABASE_URL)
```
→ **Thành công!** 🎉

---

## 5. Deploy to Render

### Bước 1: Tạo Render Account
1. Truy cập: https://render.com
2. Đăng nhập bằng GitHub
3. Click **"New +"** → **"Web Service"**

### Bước 2: Connect Repository
1. Chọn repository `Linglooma-IELTS`
2. Click **"Connect"**

### Bước 3: Cấu hình Web Service
- **Name**: `linglooma-backend`
- **Region**: `Singapore` (gần Việt Nam)
- **Branch**: `master`
- **Root Directory**: `01-backend-nodejs`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### Bước 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Thêm các biến sau:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | `postgresql://postgres.xxx:password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres` |
| `JWT_SECRET` | `0dbbfbb3-5a8c-4657-bdc0-92c3f7d54f25` |
| `JWT_EXPIRE` | `1d` |
| `GEMINI_API_KEY` | `AIzaSyBcyCeP_T9gMz_9NRld6zPOy1bFtQeBFHI` |
| `AZURE_SPEECH_KEY` | `DP9zwU29Z1HBSL1Zwr1aSLdrPgm1GavAUxJcpsZfxCFiJf6jIz09JQQJ99BEAC3pKaRXJ3w3AAAYACOGYrCv` |
| `AZURE_SPEECH_REGION` | `eastasia` |
| `PORT` | `3000` |
| `NODE_VERSION` | `22.16.0` |

### Bước 5: Deploy
1. Click **"Create Web Service"**
2. Đợi 3-5 phút để Render build và deploy
3. Nếu thành công, bạn sẽ thấy URL: `https://linglooma-backend.onrender.com`

### Bước 6: Test API
```bash
# Test health check
curl https://linglooma-backend.onrender.com/

# Test chat endpoint
curl -X POST https://linglooma-backend.onrender.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, how can I improve my IELTS score?"}'
```

---

## 6. Troubleshooting

### ❌ Lỗi: "password authentication failed"

**Nguyên nhân**: Password trong DATABASE_URL sai

**Giải pháp**:
1. Vào Supabase Dashboard → Settings → Database
2. Click **"Reset database password"**
3. Tạo password mới
4. Cập nhật DATABASE_URL với password mới
5. Nếu đã deploy Render, update environment variable

---

### ❌ Lỗi: "relation 'users' does not exist"

**Nguyên nhân**: Chưa chạy migration

**Giải pháp**:
1. Vào Supabase SQL Editor
2. Run migration theo hướng dẫn [Option 2](#option-2-sử-dụng-supabase-sql-editor-dễ-nhất-cho-người-mới)
3. Kiểm tra lại bằng query:
   ```sql
   SELECT tablename FROM pg_tables WHERE schemaname = 'public';
   ```

---

### ❌ Lỗi: "too many connections"

**Nguyên nhân**: Supabase Free plan giới hạn connections

**Giải pháp**:
1. Sử dụng **connection pooling** (đã config sẵn trong `db.js`)
2. Đảm bảo đang dùng **Pooler connection string** (port 6543), KHÔNG phải Direct (port 5432)
3. Check trong Supabase: Settings → Database → Connection pooling → **Enabled**

---

### ❌ Lỗi: "require is not defined"

**Nguyên nhân**: Có file vẫn dùng ES Modules

**Giải pháp**: Đã fix ở các bước trước! Nhưng nếu vẫn gặp:
```bash
# Kiểm tra lại
cd 01-backend-nodejs
grep -r "import.*from" --include="*.js" .
grep -r "export default" --include="*.js" .

# Phải không có kết quả nào
```

---

### ❌ Render deployment failed: "Build failed"

**Nguyên nhân**: Thiếu dependencies hoặc lỗi code

**Giải pháp**:
1. Check Render logs (tab "Logs")
2. Thường là do:
   - `package.json` thiếu dependency → Run `npm install` local để test
   - Node version không khớp → Set `NODE_VERSION=22.16.0` trong Render env vars
   - Build command sai → Đổi thành `npm install` (không cần build cho Node.js)

---

## 🎯 Checklist Hoàn Thành

- [ ] Tạo Supabase project thành công
- [ ] Lấy được DATABASE_URL
- [ ] Run migration thành công (11 tables)
- [ ] Test local với DATABASE_URL (✅ Connected)
- [ ] Deploy Render thành công
- [ ] Test API endpoints hoạt động
- [ ] Frontend connect được backend

---

## 📚 Tài Liệu Tham Khảo

- [Supabase Documentation](https://supabase.com/docs)
- [Render Node.js Deployment](https://render.com/docs/deploy-node-express-app)
- [PostgreSQL Connection Strings](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-CONNSTRING)

---

## 💡 Tips

### Tiết Kiệm Chi Phí:
- Supabase Free plan: 500MB database, 2GB bandwidth/month
- Render Free plan: 750 giờ/tháng, sleep sau 15 phút inactive
- Nếu dự án lớn hơn → Nâng cấp Render lên Starter ($7/tháng)

### Bảo Mật:
- ⚠️ **KHÔNG** commit `.env` vào Git
- ⚠️ **KHÔNG** share API keys công khai
- ✅ Sử dụng `.env.example` cho template
- ✅ Rotate API keys định kỳ

### Performance:
- Sử dụng **Pooler connection** (port 6543) cho production
- Enable **Connection pooling** trong Supabase
- Monitor usage trong Supabase Dashboard

---

**Made with ❤️ by Linglooma Team**
