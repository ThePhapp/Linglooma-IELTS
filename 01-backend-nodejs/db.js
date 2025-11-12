const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL is not set!');
    console.error('Please set DATABASE_URL environment variable with your Supabase connection string.');
    console.error('Example: DATABASE_URL=postgresql://user:password@host:port/database');
    process.exit(1);
}

const poolConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
};

console.log('🔗 Connecting to Supabase database...');
const pool = new Pool(poolConfig);

// Test connection khi khởi động
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Error connecting to Supabase database:', err.message);
        console.error('Please check:');
        console.error('  ✓ DATABASE_URL is correctly set in environment variables');
        console.error('  ✓ Supabase project is active and running');
        console.error('  ✓ Database password is correct (check for special characters - they need URL encoding)');
        console.error('  ✓ Connection string format: postgresql://user:password@host:port/database');
        console.error('\nTip: If password contains special characters like @, #, %, encode them:');
        console.error('  @ = %40, # = %23, % = %25');
    } else {
        console.log('✅ Connected to Supabase database successfully!');
        console.log(`   Host: ${client.host}:${client.port}`);
        console.log(`   Database: ${client.database}`);
        console.log(`   User: ${client.user}`);
        release();
    }
});

// Xử lý lỗi pool
pool.on('error', (err, client) => {
    console.error('❌ Unexpected error on Supabase client:', err.message);
    console.error('The application will attempt to reconnect automatically.');
});

// Export pool
module.exports = pool;