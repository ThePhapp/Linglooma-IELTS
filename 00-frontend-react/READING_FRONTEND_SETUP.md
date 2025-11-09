# Reading Feature - Frontend Setup Guide

## Các file đã tạo

1. **ReadingList.jsx** - Component hiển thị danh sách bài đọc
2. **ReadingTest.jsx** - Component làm bài đọc và hiển thị kết quả

## Cách tích hợp vào project

### 1. Thêm routes vào Routes.jsx

```jsx
import ReadingList from './components/ReadingList';
import ReadingTest from './components/ReadingTest';

// Trong component Routes hoặc App.jsx
<Route path="/reading" element={<ReadingList />} />
<Route path="/reading/:id" element={<ReadingTest />} />
```

### 2. Cấu hình axios (nếu chưa có)

Tạo file `src/utils/axios.js`:

```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
});

// Thêm token vào mọi request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
```

Sau đó update import trong ReadingList.jsx và ReadingTest.jsx:
```javascript
import axios from '../utils/axios';
```

### 3. Thêm link navigation

Trong menu hoặc dashboard, thêm link đến trang Reading:

```jsx
<Link to="/reading" className="...">
  <span>📖</span>
  <span>Reading Practice</span>
</Link>
```

### 4. Wrapper component có route params

Nếu sử dụng React Router v6, tạo wrapper:

```jsx
// ReadingTestPage.jsx
import { useParams } from 'react-router-dom';
import ReadingTest from '../components/ReadingTest';

const ReadingTestPage = () => {
  const { id } = useParams();
  return <ReadingTest passageId={id} />;
};

export default ReadingTestPage;
```

Sau đó update route:
```jsx
<Route path="/reading/:id" element={<ReadingTestPage />} />
```

## Features

### ReadingList Component
- ✅ Hiển thị danh sách tất cả bài đọc
- ✅ Phân loại theo độ khó (Easy, Medium, Hard, Academic)
- ✅ Hiển thị chủ đề (Topic)
- ✅ Card design với hover effect
- ✅ Responsive grid layout

### ReadingTest Component
- ✅ Hiển thị nội dung bài đọc
- ✅ Câu hỏi trắc nghiệm
- ✅ Radio button cho mỗi lựa chọn
- ✅ Validation: phải trả lời hết trước khi submit
- ✅ Confirm dialog trước khi nộp bài
- ✅ Chấm điểm trực tiếp
- ✅ Hiển thị đáp án đúng/sai
- ✅ Highlight câu đúng (xanh) và sai (đỏ)
- ✅ Hiển thị điểm số và phần trăm
- ✅ Nút "Làm lại" để reset bài test

## Styling

Components sử dụng Tailwind CSS. Đảm bảo Tailwind đã được cấu hình trong project.

### Màu sắc chính:
- Blue (#3B82F6) - Primary actions
- Green (#10B981) - Correct answers
- Red (#EF4444) - Wrong answers
- Purple (#8B5CF6) - Academic level
- Yellow (#F59E0B) - Medium level

## API Integration

### Endpoints được sử dụng:

1. **GET /api/reading** - Lấy danh sách
2. **GET /api/reading/:id** - Lấy chi tiết bài đọc
3. **POST /api/reading/:id/submit** - Nộp bài

### Request format:

```javascript
// Submit reading
{
  "answers": [
    {
      "questionId": 1,
      "selectedOptionId": 2
    },
    {
      "questionId": 2,
      "selectedOptionId": 6
    }
  ]
}
```

## Testing Flow

1. Mở trang `/reading` - Xem danh sách bài đọc
2. Click vào một bài - Chuyển đến `/reading/1`
3. Đọc passage và chọn đáp án
4. Click "Nộp bài"
5. Xem kết quả với highlight đúng/sai
6. Click "Làm lại" để reset

## Customization

### Thay đổi số câu hiển thị trên một dòng:

```jsx
// ReadingList.jsx - line ~65
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// Đổi lg:grid-cols-3 thành lg:grid-cols-4 cho 4 cột
```

### Thêm timer:

```jsx
const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes

useEffect(() => {
  if (timeLeft > 0 && !result) {
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  } else if (timeLeft === 0 && !result) {
    handleSubmit();
  }
}, [timeLeft, result]);
```

### Thêm progress bar:

```jsx
<div className="mb-4">
  <div className="text-sm text-gray-600 mb-2">
    Đã trả lời: {Object.keys(answers).length}/{questions.length}
  </div>
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className="bg-blue-600 h-2 rounded-full transition-all"
      style={{
        width: `${(Object.keys(answers).length / questions.length) * 100}%`
      }}
    ></div>
  </div>
</div>
```

## Troubleshooting

### Lỗi CORS
Đảm bảo backend đã cấu hình CORS cho frontend origin:
```javascript
// app.js
const allowedOrigins = ["http://localhost", "http://localhost:4028"];
```

### Token không được gửi
Kiểm tra localStorage có token:
```javascript
console.log(localStorage.getItem('token'));
```

### Không hiển thị đúng kết quả
Check console.log response từ API:
```javascript
console.log('Result:', response.data);
```
