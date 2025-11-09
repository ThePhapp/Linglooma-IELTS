# Reading Feature Integration Guide

## ✅ Đã tích hợp thành công!

Reading feature đã được tích hợp vào trang `/admin/features`.

## 🎯 Luồng hoạt động

```
1. Vào http://localhost:4028/admin/features
   ↓
2. Click nút "LEARN" trên card "📖 Reading Practice"
   ↓
3. Chuyển đến /admin/features/reading (Danh sách bài đọc)
   ↓
4. Click vào một bài đọc
   ↓
5. Chuyển đến /admin/features/reading/:id (Làm bài)
   ↓
6. Đọc passage, chọn đáp án, click "Nộp bài"
   ↓
7. Xem kết quả với highlight đúng/sai
   ↓
8. Click "Làm lại" hoặc "Quay lại danh sách"
```

## 📁 Files đã cập nhật

### 1. Routes.jsx
```jsx
// Thêm imports
import ReadingList from './components/ReadingList';
import ReadingTest from './components/ReadingTest';

// Thêm routes
<Route path="features/reading" element={<ReadingList />} />
<Route path="features/reading/:id" element={<ReadingTest />} />
```

### 2. PracticeCard.jsx
```jsx
// Thêm navigation cho Reading
else if (title.includes("Reading Practice")) {
    navigate("/admin/features/reading");
}
```

### 3. ReadingTest.jsx
```jsx
// Dùng useParams thay vì props
const { id } = useParams();
const navigate = useNavigate();

// Thêm back button
<button onClick={() => navigate('/admin/features/reading')}>
  ← Quay lại danh sách
</button>
```

### 4. ReadingList.jsx
```jsx
// Cập nhật navigation path
navigate(`/admin/features/reading/${passage.id}`)
```

## 🚀 Test Flow

### Bước 1: Đảm bảo services đang chạy

**Terminal 1 - Database:**
```cmd
docker ps
# Phải thấy linglooma-ielts-db-1 running
```

**Terminal 2 - Backend:**
```cmd
cd 01-backend-nodejs
npm run dev
# Server chạy trên localhost:3000
```

**Terminal 3 - Frontend:**
```cmd
cd 00-frontend-react
npm run dev
# Frontend chạy trên localhost:4028
```

### Bước 2: Chạy migration (nếu chưa)

```cmd
cd 01-backend-nodejs
run-reading-migration.bat
```

### Bước 3: Test trên browser

1. Mở: http://localhost:4028/admin/features
2. Tìm card "📖 Reading Practice"
3. Click nút "LEARN"
4. Sẽ thấy danh sách bài đọc (2 bài mẫu)
5. Click vào một bài
6. Làm bài và submit

## 🔗 API Endpoints được sử dụng

```
GET  /api/reading              → Lấy danh sách bài đọc
GET  /api/reading/:id          → Lấy chi tiết bài đọc + câu hỏi
POST /api/reading/:id/submit   → Nộp bài và chấm điểm
```

## 📊 URL Structure

```
/admin/features                      → Trang chọn skill (Speaking, Reading, etc.)
/admin/features/reading              → Danh sách bài đọc
/admin/features/reading/1            → Làm bài đọc ID 1
/admin/features/reading/2            → Làm bài đọc ID 2
```

## 🎨 UI Components

### ReadingList
- Grid layout responsive
- Cards với image, title, difficulty, topic
- Hover effects
- Click anywhere on card để mở bài

### ReadingTest
- Back button để quay về
- Reading passage với typography đẹp
- Multiple choice questions
- Radio buttons
- Submit button (disabled nếu chưa trả lời hết)
- Confirm dialog trước khi submit
- Result display với colors:
  - ✅ Green: Câu đúng
  - ❌ Red: Câu sai
  - Blue: Điểm số
- "Làm lại" button

## 🔧 Troubleshooting

### Lỗi: "Cannot read property 'data' of undefined"
**Nguyên nhân:** Backend chưa chạy hoặc API trả về lỗi
**Fix:**
```cmd
# Check backend logs
# Hoặc test API trực tiếp
curl http://localhost:3000/api/reading
```

### Lỗi: "404 Not Found"
**Nguyên nhân:** Migration chưa chạy
**Fix:**
```cmd
cd 01-backend-nodejs
run-reading-migration.bat
```

### Lỗi: "Unauthorized"
**Nguyên nhân:** Token hết hạn hoặc không có token
**Fix:** Login lại để lấy token mới

### Reading list rỗng
**Nguyên nhân:** Database không có data
**Fix:**
```cmd
# Chạy lại migration để insert data mẫu
run-reading-migration.bat
```

## 📝 Next Steps (Optional)

1. **Thêm filter** - Lọc theo difficulty/topic
2. **Search** - Tìm kiếm bài đọc
3. **History** - Xem lịch sử làm bài
4. **Timer** - Đếm ngược thời gian làm bài
5. **Progress bar** - Hiển thị tiến độ làm bài
6. **Statistics** - Thống kê điểm số

## ✨ Features đã có

- ✅ Danh sách bài đọc
- ✅ Làm bài trắc nghiệm
- ✅ Chấm điểm tự động
- ✅ Highlight đáp án đúng/sai
- ✅ Lưu kết quả vào database
- ✅ Responsive design
- ✅ Navigation flow hoàn chỉnh
- ✅ Error handling
- ✅ Loading states

---

**Status:** ✅ INTEGRATED  
**Tested:** Yes  
**Ready for use:** Yes 🎉
