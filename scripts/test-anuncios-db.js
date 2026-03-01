require('dotenv').config();
const { getClient } = require('../lib/db');

async function main() {
  const anunciosUrl = process.env.ANUNCIOS_DATABASE_URL || process.env.DATABASE_URL;
  if (!anunciosUrl) {
    console.error('Missing ANUNCIOS_DATABASE_URL or DATABASE_URL in .env');
    process.exit(2);
  }

  try {
    const client = await getClient(anunciosUrl);
    // simple probe depending on type
    if (client.type === 'postgres') {
      const res = await client.query('SELECT NOW() as now');
      console.log('Connected to anuncios DB (postgres). Time:', res.rows ? res.rows[0].now : res[0]);
    } else if (client.type === 'mysql') {
      const [rows] = await client.query('SELECT NOW() as now');
      console.log('Connected to anuncios DB (mysql). Time:', rows[0]);
    }
    await client.close();
    process.exit(0);
  } catch (e) {
    console.error('Failed to connect to anuncios DB:', e.message || e);
    process.exit(1);
  }
}

main();
