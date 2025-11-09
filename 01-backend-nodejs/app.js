// server.js
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Middleware body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// CORS setup
const allowedOrigins = [
  "http://localhost",
  "http://localhost:4028",
  "https://linglooma.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman hoặc server internal
    if (allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Logging middleware để debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Import route modules
const scoreRoutes = require("./routes/scoreRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const lessonRoutes = require("./routes/lessonRoute.js");
const lessonResultRoutes = require("./routes/lessonResultRoute.js");
const questionRoutes = require("./routes/questionRoute.js");
const questionResultRoutes = require("./routes/questionResultRoute.js");
const userRoutes = require("./routes/userRoute.js");
const jwtauth = require("./middleware/jwtauth.js");
const incorrectphonemesRoutes = require("./routes/incorrectphonemesRoutes.js");
const readingRoutes = require("./routes/readingRoutes.js");
const writingRoutes = require("./routes/writingRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");

// -------------------
// Public routes (không cần JWT)
app.use("/api/users", userRoutes); // chứa /register, /login
app.use("/api/auth", authRoutes);

// -------------------
// JWT middleware chỉ áp dụng cho private routes
app.use(jwtauth);

// Private routes
app.use("/api", scoreRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/lessons/results", lessonResultRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/questions/results", questionResultRoutes);
app.use("/api/incorrectphonemes", incorrectphonemesRoutes);
app.use("/api/reading", readingRoutes);
app.use("/api/writing", writingRoutes);
app.use("/api", chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message, err.stack);
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "CORS Not Allowed" });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

// Listen port
const PORT = process.env.PORT || 4028;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
