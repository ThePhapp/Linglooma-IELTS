require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
// const { name } = require('ejs');


exports.register = async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Kiểm tra trùng email
    const existingUser = await User.findUserByEmail(email);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    await User.insertUser(email, hashedPassword);

    res.json({ msg: 'Register successfully', success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Register failed', success: false });
  }
};

exports.login = async (req, res) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const { password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  console.log(`[LOGIN] Attempt for email: ${email}`);
  try {
    const userResult = await User.findUserByEmail(email);

    if (userResult.rows.length === 0) {
      console.log(`[LOGIN] ❌ Email not found in DB: ${email}`);
      return res.status(401).json({ msg: 'Email or password is wrong', success: false });
    }

    const user = userResult.rows[0];
    console.log(`[LOGIN] User found: ${user.email}, has password: ${!!user.password}`);

    // So sánh password gốc với hash đã lưu
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Có thể tạo JWT ở đây nếu cần
      const payload = {
        id: user.id,  // Thêm id vào payload
        email: user.email,
        name: user.username,
        phone: user.phonenumber,
        gender: user.gender,
        nationality: user.nationality
      }

      const access_token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRE
        }
      )

      res.status(200).json({
        access_token,
        msg: 'Login successful',
        success: true,
        user: {
          email: user.email,
          name: user.username,
          phone: user.phonenumber,
          gender: user.gender,
          nationality: user.nationality
        }
      });
    } else {
      console.log(`[LOGIN] ❌ Password mismatch for email: ${email}`);
      res.status(401).json({ msg: 'Email or password is wrong', success: false });
    }
  } catch (err) {
    console.error('[LOGIN] ❌ Error:', err.message);
    res.status(500).json({ msg: 'Login failed', error: err.message });
  }
};
