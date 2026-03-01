const mysql = require('mysql2/promise');
const { Client } = require('pg');

function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  const protocol = url.protocol.replace(':', '');
  return { url, protocol };
}

async function getClient(databaseUrl) {
  const { url, protocol } = parseDatabaseUrl(databaseUrl);
  if (protocol.startsWith('postgres')) {
    const client = new Client({
      host: url.hostname,
      port: Number(url.port || 5432),
      user: url.username || undefined,
      password: url.password || undefined,
      database: url.pathname && url.pathname.slice(1) ? url.pathname.slice(1) : undefined,
      ssl: url.searchParams.get('sslmode') === 'require' ? { rejectUnauthorized: false } : false,
    });
    await client.connect();
    return {
      type: 'postgres',
      query: (text, params) => client.query(text, params),
      close: () => client.end(),
    };
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
    return {
      type: 'mysql',
      query: (text, params) => connection.execute(text, params),
      close: () => connection.end(),
    };
  }

  throw new Error(`Unsupported protocol: ${protocol}`);
}

module.exports = { getClient };
