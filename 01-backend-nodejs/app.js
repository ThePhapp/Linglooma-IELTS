const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json({ limit: "50mb" })); // tăng giới hạn size vì audio base64 có thể lớn
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const corsOptions = {
  origin: 'http://localhost',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));


// route dữ liệu 
const scoreRoutes = require("./routes/scoreRoutes");
const authRoutes = require("./routes/authRoutes");
const lessonRoutes = require("./routes/lessonRoute");
const lessonResultRoutes = require('./routes/lessonResultRoute');
const questionRoutes = require('./routes/questionRoute');
const questionResultRoutes = require('./routes/questionResultRoute')
const userRoutes = require('./routes/userRoute');
const jwtauth = require("./middleware/jwtauth");
const incorrectphonemesRoutes = require('./routes/incorrectphonemesRoutes');

// middleware
app.use(jwtauth);

// app.use(express.urlencoded({ limit: '50mb', extended: true }));


// truy xuất dữ liệu 
app.use("/api", scoreRoutes);
app.use("/api", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lessons/results", lessonResultRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questions/results", questionResultRoutes);
app.use("/api/users", userRoutes);
app.use('/api/incorrectphonemes', incorrectphonemesRoutes);

// 404 handler đặt cuối cùng
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
