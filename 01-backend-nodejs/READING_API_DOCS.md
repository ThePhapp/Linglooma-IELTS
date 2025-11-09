# Reading API Documentation

## Endpoints

### 1. Lấy danh sách tất cả bài đọc
```
GET /api/reading
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Impact of Technology on Modern Education",
      "difficulty": "Medium",
      "topic": "Education & Technology",
      "image": "https://images.unsplash.com/...",
      "created_at": "2025-11-09T10:00:00.000Z"
    }
  ]
}
```

### 2. Lấy một bài đọc kèm câu hỏi (không có đáp án)
```
GET /api/reading/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "passage": {
      "id": 1,
      "title": "The Impact of Technology on Modern Education",
      "passage": "Technology has revolutionized...",
      "difficulty": "Medium",
      "topic": "Education & Technology",
      "image": "https://..."
    },
    "questions": [
      {
        "id": 1,
        "question_text": "According to the passage, what has technology done to education?",
        "question_type": "multiple-choice",
        "question_order": 1,
        "options": [
          {
            "id": 1,
            "option_text": "It has made education more expensive",
            "option_order": 1
          },
          {
            "id": 2,
            "option_text": "It has transformed traditional classrooms",
            "option_order": 2
          }
        ]
      }
    ]
  }
}
```

### 3. Nộp bài và chấm điểm trực tiếp
```
POST /api/reading/:id/submit
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Request Body:**
```json
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

**Response:**
```json
{
  "success": true,
  "message": "Reading test submitted successfully",
  "data": {
    "resultId": 1,
    "score": 3,
    "totalQuestions": 4,
    "percentage": 75,
    "details": [
      {
        "questionId": 1,
        "selectedOptionId": 2,
        "correctOptionId": 2,
        "isCorrect": true
      },
      {
        "questionId": 2,
        "selectedOptionId": 6,
        "correctOptionId": 6,
        "isCorrect": true
      }
    ]
  }
}
```

### 4. Lấy lịch sử làm bài của học viên
```
GET /api/reading/results/history?passageId=1
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Query Parameters:**
- `passageId` (optional): Lọc theo bài đọc cụ thể

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "studentId": 1,
      "passageId": 1,
      "score": 3,
      "total_questions": 4,
      "percentage": 75,
      "completed_at": "2025-11-09T10:30:00.000Z",
      "title": "The Impact of Technology on Modern Education",
      "topic": "Education & Technology",
      "difficulty": "Medium"
    }
  ]
}
```

### 5. Lấy chi tiết một kết quả
```
GET /api/reading/results/:resultId
```

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "result": {
      "id": 1,
      "studentId": 1,
      "passageId": 1,
      "score": 3,
      "total_questions": 4,
      "percentage": 75,
      "completed_at": "2025-11-09T10:30:00.000Z"
    },
    "details": [
      {
        "id": 1,
        "resultId": 1,
        "questionId": 1,
        "selectedOptionId": 2,
        "is_correct": true,
        "question_text": "According to the passage...",
        "question_type": "multiple-choice",
        "selected_option_text": "It has transformed traditional classrooms",
        "correct_option_text": "It has transformed traditional classrooms"
      }
    ]
  }
}
```

## Cách sử dụng

### 1. Chạy migration SQL
```bash
# Kết nối vào PostgreSQL container
docker exec -it linglooma-ielts-db-1 psql -U postgres -d linglooma

# Chạy file migration
\i /docker-entrypoint-initdb.d/reading_migration.sql
```

### 2. Test API với curl (Windows CMD)

**Lấy danh sách bài đọc:**
```cmd
curl http://localhost:3000/api/reading
```

**Lấy một bài đọc:**
```cmd
curl http://localhost:3000/api/reading/1
```

**Nộp bài (cần JWT token):**
```cmd
curl -X POST http://localhost:3000/api/reading/1/submit ^
  -H "Authorization: Bearer YOUR_JWT_TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"answers\":[{\"questionId\":1,\"selectedOptionId\":2},{\"questionId\":2,\"selectedOptionId\":6},{\"questionId\":3,\"selectedOptionId\":11},{\"questionId\":4,\"selectedOptionId\":13}]}"
```

**Lấy lịch sử:**
```cmd
curl http://localhost:3000/api/reading/results/history ^
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Test với Postman

1. **GET** `http://localhost:3000/api/reading` - Lấy danh sách bài đọc
2. **GET** `http://localhost:3000/api/reading/1` - Lấy bài đọc số 1
3. **POST** `http://localhost:3000/api/reading/1/submit` - Nộp bài
   - Headers: `Authorization: Bearer <token>`
   - Body (JSON):
   ```json
   {
     "answers": [
       {"questionId": 1, "selectedOptionId": 2},
       {"questionId": 2, "selectedOptionId": 6},
       {"questionId": 3, "selectedOptionId": 11},
       {"questionId": 4, "selectedOptionId": 13}
     ]
   }
   ```

## Flow hoạt động

1. **Student lấy danh sách bài đọc** → GET `/api/reading`
2. **Student chọn một bài** → GET `/api/reading/:id`
3. **Student làm bài và submit** → POST `/api/reading/:id/submit`
4. **Hệ thống chấm và trả kết quả ngay lập tức**
5. **Student xem lịch sử** → GET `/api/reading/results/history`
6. **Student xem chi tiết một lần làm** → GET `/api/reading/results/:resultId`

## Database Schema

### reading_passage
- Chứa nội dung bài đọc
- Metadata: title, difficulty, topic, image

### reading_question
- Câu hỏi cho mỗi bài đọc
- Có thứ tự (question_order)
- Loại: multiple-choice, true-false

### reading_option
- Các lựa chọn cho mỗi câu hỏi
- is_correct: đánh dấu đáp án đúng

### reading_result
- Lưu kết quả tổng thể
- Score, percentage, timestamp

### reading_answer_detail
- Chi tiết từng câu trả lời
- Lưu câu chọn và đúng/sai
