require('dotenv').config();
const mysql = require('mysql2/promise');
const { Client } = require('pg');

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Missing DATABASE_URL in .env');
    process.exit(2);
  }

  const url = new URL(databaseUrl);
  const protocol = url.protocol.replace(':', '');
  const email = process.env.ADMANAGER_EMAIL || 'admanager@example.com';

  try {
    if (protocol.startsWith('postgres')) {
      const client = new Client({
        host: url.hostname,
        port: Number(url.port || 5432),
        user: url.username || undefined,
        password: url.password || undefined,
        database: url.pathname && url.pathname.slice(1) ? url.pathname.slice(1) : undefined,
        ssl: url.searchParams.get('sslmode') === 'require' ? { rejectUnauthorized: false } : false
      });
      await client.connect();
      const res = await client.query('SELECT id, email, role FROM admin WHERE email = $1 LIMIT 1', [email]);
      await client.end();
      if (res.rows.length === 0) {
        console.error('admanager user not found (postgres)');
        process.exit(1);
      }
      console.log('admanager found:', res.rows[0]);
      process.exit(0);
    }

    if (protocol.startsWith('mysql')) {
      const connection = await mysql.createConnection({
        host: url.hostname,
        port: Number(url.port || 3306),
        user: url.username || undefined,
        password: url.password || undefined,
        database: url.pathname && url.pathname.slice(1) ? url.pathname.slice(1) : undefined,
        ssl: url.searchParams.get('sslmode') === 'require' ? { rejectUnauthorized: false } : undefined,
      });
      const [rows] = await connection.execute('SELECT id, email, role FROM admin WHERE email = ? LIMIT 1', [email]);
      await connection.end();
      if (!rows || rows.length === 0) {
        console.error('admanager user not found (mysql)');
        process.exit(1);
      }
      console.log('admanager found:', rows[0]);
      process.exit(0);
    }

    console.error('Unsupported DATABASE_URL protocol:', protocol);
    process.exit(2);
  } catch (e) {
    console.error('Test error:', e);
    process.exit(1);
  }
}

main();
