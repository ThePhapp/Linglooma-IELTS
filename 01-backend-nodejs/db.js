const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Sử dụng Pool thay vì Client để hỗ trợ connection pooling
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    port: process.env.DB_PORT || 5432,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'linglooma',
    max: 20, // Số connection tối đa
    idleTimeoutMillis: 30000, // Timeout khi idle
    connectionTimeoutMillis: 2000, // Timeout khi connect
});

// Test connection khi khởi động
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error connecting to PostgreSQL database:', err.stack);
        console.error('Please check:');
        console.error(`  - DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
        console.error(`  - DB_PORT: ${process.env.DB_PORT || 5432}`);
        console.error(`  - DB_NAME: ${process.env.DB_NAME || 'linglooma'}`);
        console.error(`  - DB_USER: ${process.env.DB_USER || 'postgres'}`);
        console.error('  - Is the database running?');
    } else {
        console.log('✅ Connected to PostgreSQL database successfully!');
        console.log(`   Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}`);
        console.log(`   Database: ${process.env.DB_NAME || 'linglooma'}`);
        release();
    }
});

// Xử lý lỗi pool
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Export pool với interface tương thích Client (để không cần sửa code hiện tại)
module.exports = pool;