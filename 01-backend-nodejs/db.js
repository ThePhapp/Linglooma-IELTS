const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Cấu hình database - Ưu tiên DATABASE_URL (Supabase/Production) trước
let poolConfig;

if (process.env.DATABASE_URL) {
    // Sử dụng DATABASE_URL từ Supabase hoặc Render
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Cần thiết cho Supabase và các cloud databases
        },
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };
    console.log('🔗 Using DATABASE_URL for connection');
} else {
    // Fallback về config riêng lẻ cho local development
    poolConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'postgres',
        port: process.env.DB_PORT || 5432,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'linglooma',
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    };
    console.log('🔗 Using individual DB config for connection');
}

const pool = new Pool(poolConfig);

// Test connection khi khởi động
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error connecting to PostgreSQL database:', err.stack);
        console.error('Please check:');
        if (process.env.DATABASE_URL) {
            console.error('  - DATABASE_URL is set but connection failed');
            console.error('  - Make sure Supabase database is active');
            console.error('  - Verify the connection string format');
        } else {
            console.error(`  - DB_HOST: ${process.env.DB_HOST || 'localhost'}`);
            console.error(`  - DB_PORT: ${process.env.DB_PORT || 5432}`);
            console.error(`  - DB_NAME: ${process.env.DB_NAME || 'linglooma'}`);
            console.error(`  - DB_USER: ${process.env.DB_USER || 'postgres'}`);
            console.error('  - Is the database running?');
        }
    } else {
        console.log('✅ Connected to PostgreSQL database successfully!');
        if (process.env.DATABASE_URL) {
            console.log('   Source: Supabase/Cloud (DATABASE_URL)');
        } else {
            console.log(`   Host: ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}`);
            console.log(`   Database: ${process.env.DB_NAME || 'linglooma'}`);
        }
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