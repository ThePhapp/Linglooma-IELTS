# Environment Setup Guide - Docker & Localhost

## 📋 Tổng quan

Project này có thể chạy ở **2 môi trường**:

1. **Docker Mode** - Tất cả services chạy trên Docker
2. **Local Mode** - Database trên Docker, Backend + Frontend trên localhost

## 🔧 Cấu hình đã tạo

### Files môi trường

```
01-backend-nodejs/
├── .env              # File đang sử dụng (tự động tạo)
├── .env.local        # Config cho localhost (DB_HOST=localhost)
├── .env.docker       # Config cho Docker (DB_HOST=db)
├── .env.backup       # Backup tự động
└── db.js             # Đã upgrade lên Pool với connection pooling
```

### Scripts tiện ích

```
01-backend-nodejs/
├── use-local-env.bat     # Chuyển sang local mode
├── use-docker-env.bat    # Chuyển sang Docker mode
├── start-local.bat       # Khởi động backend ở local mode
├── run-reading-migration.bat
└── test-reading-api.bat

Root/
└── start-db-only.bat     # Chỉ khởi động database container
```

---

## 🚀 Mode 1: Docker Mode (Tất cả trên Docker)

### Khi nào dùng?
- Deploy production
- Test toàn bộ hệ thống
- Không muốn cài Node.js trên máy

### Cách sử dụng:

**Bước 1: Chuyển sang Docker mode**
```cmd
cd 01-backend-nodejs
use-docker-env.bat
```

**Bước 2: Chạy tất cả services**
```cmd
cd ..
docker-compose up --build
```

**Bước 3: Truy cập**
- Frontend: http://localhost
- Backend API: http://localhost:3000
- Database: localhost:5432

**Dừng services:**
```cmd
docker-compose down
```

---

## 💻 Mode 2: Local Mode (Development)

### Khi nào dùng?
- Development hàng ngày
- Debug dễ dàng hơn
- Hot reload nhanh hơn
- Tiết kiệm tài nguyên Docker

### Kiến trúc:
```
┌─────────────────┐
│   Frontend      │ → http://localhost:5173 (Vite dev server)
│   (localhost)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Backend       │ → http://localhost:3000
│   (localhost)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │ → localhost:5432
│   (Docker)      │
└─────────────────┘
```

### Cách sử dụng:

#### Option A: Sử dụng scripts tự động (Khuyến nghị)

**Terminal 1: Khởi động Database**
```cmd
start-db-only.bat
```

**Terminal 2: Khởi động Backend**
```cmd
cd 01-backend-nodejs
start-local.bat
```

**Terminal 3: Khởi động Frontend**
```cmd
cd 00-frontend-react
npm install
npm run dev
```

#### Option B: Manual

**Terminal 1: Database**
```cmd
# Chỉ chạy database container
docker-compose up -d db

# Kiểm tra
docker ps
```

**Terminal 2: Backend**
```cmd
cd 01-backend-nodejs

# Chuyển sang local mode
use-local-env.bat

# Install dependencies (lần đầu)
npm install

# Chạy backend
npm run dev
```

**Terminal 3: Frontend**
```cmd
cd 00-frontend-react

# Install dependencies (lần đầu)
npm install

# Chạy frontend
npm run dev
```

### Truy cập:
- Frontend: http://localhost:5173 (Vite default) hoặc port hiển thị
- Backend: http://localhost:3000
- Database: localhost:5432

---

## 🔄 Chuyển đổi giữa các modes

### Từ Docker → Local

```cmd
cd 01-backend-nodejs
use-local-env.bat
```

Sau đó:
1. Dừng Docker: `docker-compose down`
2. Chạy DB only: `start-db-only.bat`
3. Chạy backend: `npm run dev`
4. Chạy frontend: `cd ../00-frontend-react && npm run dev`

### Từ Local → Docker

```cmd
cd 01-backend-nodejs
use-docker-env.bat
```

Sau đó:
1. Dừng backend/frontend local (Ctrl+C)
2. Dừng DB container: `docker-compose down`
3. Chạy tất cả: `docker-compose up --build`

---

## 🗄️ Database Management

### Kết nối database

**Từ localhost (khi DB chạy trên Docker):**
```
Host: localhost
Port: 5432
Database: linglooma
User: postgres
Password: postgres123
```

**Tool recommendations:**
- DBeaver
- pgAdmin
- TablePlus
- VSCode extension: PostgreSQL

### Chạy migration

**Reading migration:**
```cmd
cd 01-backend-nodejs
run-reading-migration.bat
```

**Manual SQL:**
```cmd
# Vào container
docker exec -it linglooma-ielts-db-1 psql -U postgres -d linglooma

# Hoặc từ localhost (cần psql client)
psql -h localhost -U postgres -d linglooma -f file.sql
```

### Backup & Restore

**Backup:**
```cmd
docker exec linglooma-ielts-db-1 pg_dump -U postgres linglooma > backup.sql
```

**Restore:**
```cmd
docker exec -i linglooma-ielts-db-1 psql -U postgres linglooma < backup.sql
```

---

## 🐛 Troubleshooting

### 1. Backend không kết nối được database

**Triệu chứng:**
```
❌ Error connecting to PostgreSQL database
```

**Giải pháp:**

**Check 1: Database có chạy không?**
```cmd
docker ps
# Phải thấy container db
```

**Check 2: Đúng config chưa?**
```cmd
# Xem file .env hiện tại
type 01-backend-nodejs\.env

# Local mode: DB_HOST=localhost
# Docker mode: DB_HOST=db
```

**Check 3: Port 5432 có bị chiếm không?**
```cmd
netstat -ano | findstr :5432
```

**Fix:**
```cmd
# Restart database
docker-compose restart db

# Hoặc
docker-compose down
docker-compose up -d db
```

### 2. "Connection refused" khi chạy local

**Nguyên nhân:** Đang dùng config Docker mode

**Fix:**
```cmd
cd 01-backend-nodejs
use-local-env.bat
```

### 3. Migration không chạy được

**Fix:**
```cmd
# Tìm container ID
docker ps

# Copy file vào container
docker cp 02-database-postgresql\reading_migration.sql <CONTAINER_ID>:/tmp/

# Chạy migration
docker exec -it <CONTAINER_ID> psql -U postgres -d linglooma -f /tmp/reading_migration.sql
```

### 4. Port conflicts

**Triệu chứng:** "Port already in use"

**Frontend (port 5173):**
```cmd
# Kill process
taskkill /F /IM node.exe
# Hoặc đổi port trong vite.config.js
```

**Backend (port 3000):**
```cmd
# Kill process
taskkill /F /IM node.exe
# Hoặc đổi PORT trong .env
```

**Database (port 5432):**
```cmd
# Kill PostgreSQL local nếu có
taskkill /F /IM postgres.exe
```

### 5. Hot reload không hoạt động

**Backend:**
```cmd
# Check nodemon/dev script trong package.json
npm run dev
```

**Frontend:**
```cmd
# Check Vite config
npm run dev
```

---

## 📊 So sánh modes

| Feature | Docker Mode | Local Mode |
|---------|-------------|------------|
| Setup | Dễ, 1 command | Cần install Node.js |
| Performance | Chậm hơn (Docker overhead) | Nhanh hơn |
| Hot Reload | Chậm | Rất nhanh |
| Debug | Khó hơn | Dễ dàng (breakpoints) |
| Tài nguyên | Nhiều RAM/CPU | Ít hơn |
| Production-like | ✅ Giống production | ❌ Khác production |
| Recommended for | Testing, Deploy | Development |

---

## ✅ Best Practices

### Development workflow (Khuyến nghị)

```
1. Morning:
   - start-db-only.bat
   - cd 01-backend-nodejs && npm run dev
   - cd 00-frontend-react && npm run dev

2. Coding:
   - Edit code → Auto reload
   - Test API với Postman/curl
   - View logs trong terminal

3. Before commit:
   - Test với Docker mode
   - docker-compose up --build
   - Test tất cả chức năng

4. Before push:
   - Ensure .env không commit
   - Check .gitignore
```

### .gitignore

Đảm bảo có:
```gitignore
.env
.env.backup
node_modules/
```

**KHÔNG** ignore:
```
.env.local
.env.docker
```

Vì đây là template cho team.

---

## 🔐 Security Notes

1. **KHÔNG** commit file `.env` lên Git
2. **LƯU Ý:** `.env.local` và `.env.docker` chứa API keys
   - Trong production, dùng environment variables
   - Hoặc secrets management (AWS Secrets, Azure Key Vault)
3. Đổi `JWT_SECRET` và passwords trong production
4. Revoke và tạo mới `GEMINI_API_KEY` và `AZURE_SPEECH_KEY`

---

## 📚 Additional Resources

### Database connection string format:
```
postgresql://postgres:postgres123@localhost:5432/linglooma
```

### Environment variables reference:
```properties
DB_HOST=localhost          # localhost hoặc db
DB_PORT=5432              # PostgreSQL port
DB_USER=postgres          # Database user
DB_PASSWORD=postgres123   # Database password
DB_NAME=linglooma        # Database name
JWT_SECRET=xxx           # JWT signing secret
JWT_EXPIRE=1d           # Token expiration
GEMINI_API_KEY=xxx      # Google Gemini API
AZURE_SPEECH_KEY=xxx    # Azure Speech Service
AZURE_SPEECH_REGION=xxx # Azure region
PORT=3000               # Backend server port
```

### Useful Docker commands:
```cmd
# View all containers
docker ps -a

# View logs
docker-compose logs -f
docker-compose logs -f db
docker-compose logs -f backend

# Restart single service
docker-compose restart db

# Remove all
docker-compose down -v

# Clean up
docker system prune -a --volumes
```

---

## 🎯 Quick Reference

| Task | Command |
|------|---------|
| Switch to Local | `cd 01-backend-nodejs && use-local-env.bat` |
| Switch to Docker | `cd 01-backend-nodejs && use-docker-env.bat` |
| Start DB only | `start-db-only.bat` |
| Start Local Dev | `start-local.bat` (in 01-backend-nodejs) |
| Start All Docker | `docker-compose up --build` |
| Stop Docker | `docker-compose down` |
| View DB logs | `docker-compose logs -f db` |
| Connect to DB | `localhost:5432` (user: postgres, pass: postgres123) |
| Run migration | `run-reading-migration.bat` |
| Test API | `test-reading-api.bat` |

---

Happy coding! 🚀
