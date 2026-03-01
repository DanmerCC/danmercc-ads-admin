require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({ accelerateUrl: process.env.PRISMA_ACCELERATE_URL || 'file:///' });

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const name = process.env.ADMIN_NAME || 'Admin';

  const hashed = await bcrypt.hash(password, 10);

  await prisma.admin.upsert({
    where: { email },
    update: { name, password: hashed, role: 'admin' },
    create: { name, email, password: hashed, role: 'admin' },
  });

  console.log(`Admin ensured: ${email}`);

  // Ensure an admanager user exists
  const adEmail = process.env.ADMANAGER_EMAIL || 'admanager@example.com';
  const adPassword = process.env.ADMANAGER_PASSWORD || 'admanager';
  const adName = process.env.ADMANAGER_NAME || 'admanager';

  const adHashed = await bcrypt.hash(adPassword, 10);

  await prisma.admin.upsert({
    where: { email: adEmail },
    update: { name: adName, password: adHashed, role: 'admanager' },
    create: { name: adName, email: adEmail, password: adHashed, role: 'admanager' },
  });

  console.log(`Ad manager ensured: ${adEmail}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
