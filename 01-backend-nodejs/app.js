const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json({ limit: "50mb" })); // tăng giới hạn size vì audio base64 có thể lớn
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const allowedOrigins = ["http://localhost", "http://localhost:4028", "https://linglooma.vercel.app"];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


// route dữ liệu 
const scoreRoutes = require("./routes/scoreRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const lessonRoutes = require("./routes/lessonRoute.js");
const lessonResultRoutes = require('./routes/lessonResultRoute.js');
const questionRoutes = require('./routes/questionRoute.js');
const questionResultRoutes = require('./routes/questionResultRoute.js')
const userRoutes = require('./routes/userRoute.js');
const jwtauth = require("./middleware/jwtauth.js");
const incorrectphonemesRoutes = require('./routes/incorrectphonemesRoutes.js');
const readingRoutes = require('./routes/readingRoutes.js');
const writingRoutes = require('./routes/writingRoutes.js');
const chatRoutes = require("./routes/chatRoutes.js");

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
app.use('/api/reading', readingRoutes);
app.use('/api/writing', writingRoutes);
app.use("/api", chatRoutes);
// 404 handler đặt cuối cùng
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

module.exports = app;
