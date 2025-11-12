// Test writing_tasks query
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function testQuery() {
    try {
        console.log('🔍 Testing writing_tasks query...\n');
        
        // Test 1: Check if table exists
        const tableCheck = await pool.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'writing_tasks'
            );
        `);
        console.log('✅ Table writing_tasks exists:', tableCheck.rows[0].exists);
        
        // Test 2: Check columns
        const columns = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'writing_tasks'
            ORDER BY ordinal_position;
        `);
        console.log('\n📋 Columns in writing_tasks:');
        columns.rows.forEach(col => {
            console.log(`  - ${col.column_name}: ${col.data_type}`);
        });
        
        // Test 3: Count records
        const count = await pool.query('SELECT COUNT(*) FROM writing_tasks');
        console.log('\n📊 Total records:', count.rows[0].count);
        
        // Test 4: Try the actual query
        const query = `
            SELECT id, title, task_type, prompt, difficulty, topic, min_words as word_limit, time_limit
            FROM writing_tasks
            WHERE is_active = true
            ORDER BY task_type, difficulty, id
        `;
        const result = await pool.query(query);
        console.log('\n✅ Query successful! Found', result.rows.length, 'tasks');
        console.log('\nSample data:');
        result.rows.forEach((row, i) => {
            console.log(`${i + 1}. [${row.task_type}] ${row.title} (${row.difficulty})`);
        });
        
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        console.error('Stack:', error.stack);
    } finally {
        await pool.end();
    }
}

testQuery();
