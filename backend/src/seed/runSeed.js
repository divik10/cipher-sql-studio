import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../db/postgres.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const runSeed = async () => {
    const schemaSQL = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const seedSQL = fs.readFileSync(path.join(__dirname, 'seed.sql'), 'utf8');

    const client = await pool.connect();
    try {
        console.log('Running schema...');
        await client.query(schemaSQL);
        console.log('Seeding data...');
        await client.query(seedSQL);
        console.log('Seed complete.');
    } finally {
        client.release();
        await pool.end();
    }
};

runSeed().catch((err) => {
    console.error('Seed failed:', err.message);
    process.exit(1);
});
