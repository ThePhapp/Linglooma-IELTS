require("dotenv").config(); // use env
const jwt = require("jsonwebtoken");

const jwtauth = (req, res, next) => {
    const allow_list = [
        "/", 
        "/register", 
        "/login",
    ];

    // Public routes that don't need authentication
    const publicReadingRoutes = [
        /^\/api\/reading$/,           // GET /api/reading (list)
        /^\/api\/reading\/\d+$/,      // GET /api/reading/:id (detail)
    ];

    const publicWritingRoutes = [
        /^\/api\/writing$/,           // GET /api/writing (list)
        /^\/api\/writing\/\d+$/,      // GET /api/writing/:id (detail)
    ];

    // Check if it's a public route
    const isPublicRoute = allow_list.some(item => req.originalUrl === '/api' + item) ||
                         (req.method === 'GET' && publicReadingRoutes.some(pattern => pattern.test(req.originalUrl))) ||
                         (req.method === 'GET' && publicWritingRoutes.some(pattern => pattern.test(req.originalUrl)));

    if (isPublicRoute) {
        next();
    } else {
        // Debug log
        console.log('🔐 Auth check:', {
            url: req.originalUrl,
            method: req.method,
            hasAuth: !!req?.headers?.authorization
        });

        if (req?.headers?.authorization?.split(' ')?.[1]) {
            const token = req.headers.authorization.split(' ')[1];

            // // verify token
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = {
                    id: decoded.id,  // Thêm id
                    email: decoded.email,
                    name: decoded.name,
                    phone: decoded.phone,
                    gender: decoded.gender,
                    nationality: decoded.nationality,
                };
                console.log('✅ Token valid, user:', req.user.id, req.user.email);
                next();
            } catch (error) {
                console.log('❌ Token verification failed:', error.message);
                return res.status(401).json({
                    message: "Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại."
                })
            }

        } else {
            console.log('❌ No token provided');
            // return exception 
            return res.status(401).json({
                message: "Bạn chưa truyền access token ở header hoặc token bị hết hạn"
            })
        }
    }
}

module.exports = jwtauth;