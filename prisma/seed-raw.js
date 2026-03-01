require('dotenv').config();
const bcrypt = require('bcryptjs');
const { Client } = require('pg');
const mysql = require('mysql2/promise');

async function main() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('Missing DATABASE_URL in .env');
    process.exit(1);
  }

  const url = new URL(databaseUrl);
  const protocol = url.protocol.replace(':', '');

  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const name = process.env.ADMIN_NAME || 'Admin';
  const adEmail = process.env.ADMANAGER_EMAIL || 'admanager@example.com';
  const adPassword = process.env.ADMANAGER_PASSWORD || 'admanager';
  const adName = process.env.ADMANAGER_NAME || 'admanager';
  const hashed = await bcrypt.hash(password, 10);
  const adHashed = await bcrypt.hash(adPassword, 10);

  if (protocol.startsWith('postgres')) {
    const useSsl = url.searchParams.get('sslmode') === 'require' || (protocol === 'postgresql' && url.hostname !== 'localhost');
    const client = new Client({
      host: url.hostname,
      port: Number(url.port || 5432),
      user: url.username || undefined,
      password: url.password || undefined,
      database: url.pathname && url.pathname.slice(1) ? url.pathname.slice(1) : undefined,
      ssl: useSsl ? { rejectUnauthorized: false } : false
    });

    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'admin',
        "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `);

    const res = await client.query(
      `INSERT INTO admin (name, email, password, role, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, now(), now())
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password = EXCLUDED.password, role = EXCLUDED.role, "updatedAt" = now()
       RETURNING id, email`,
      [name, email, hashed, 'admin']
    );

    // Ensure admanager user (postgres)
    await client.query(
      `INSERT INTO admin (name, email, password, role, "createdAt", "updatedAt")
       VALUES ($1, $2, $3, $4, now(), now())
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password = EXCLUDED.password, role = EXCLUDED.role, "updatedAt" = now()`,
      [adName, adEmail, adHashed, 'admanager']
    );

    console.log('Admin ensured (postgres):', res.rows[0]);
    await client.end();
    return;
  }

  if (protocol.startsWith('mysql')) {
    // mysql://user:pass@host:3306/db
    const connection = await mysql.createConnection({
      host: url.hostname,
      port: Number(url.port || 3306),
      user: url.username || undefined,
      password: url.password || undefined,
      database: url.pathname && url.pathname.slice(1) ? url.pathname.slice(1) : undefined,
      // allow self-signed if necessary
      ssl: url.searchParams.get('sslmode') === 'require' ? { rejectUnauthorized: false } : undefined,
    });

    // Create table compatible with MySQL
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'admin',
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await connection.execute(
      `INSERT INTO admin (name, email, password, role, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE name = VALUES(name), password = VALUES(password), role = VALUES(role), updatedAt = CURRENT_TIMESTAMP`,
      [name, email, hashed, 'admin']
    );

    // Ensure admanager user (mysql)
    await connection.execute(
      `INSERT INTO admin (name, email, password, role, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE name = VALUES(name), password = VALUES(password), role = VALUES(role), updatedAt = CURRENT_TIMESTAMP`,
      [adName, adEmail, adHashed, 'admanager']
    );

    console.log('Admin ensured (mysql):', { email });
    await connection.end();
    return;
  }

  console.error('Unsupported DATABASE_URL protocol:', protocol);
  process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
