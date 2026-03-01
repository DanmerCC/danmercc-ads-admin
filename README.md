# DanmerCC Ads Admin Panel

Breve guía rápida para crear el usuario admin por defecto.

**Seed recomendado (rápido y compatible con MySQL/Postgres):**
- Usa el seeder raw `prisma/seed-raw.js` (ya configurado y probado).

Comandos:
```bash
cd /root/danmercc-ads-platform-local/danmercc-ads-admin
pnpm run seed
# Ejecuta `prisma/seed-raw.js` y asegura el admin: admin@example.com
```

**Usar el seeder Prisma (opcional):**
Si prefieres usar `prisma/seed.js` (requiere Prisma Client generado y engine `library` en algunos entornos):
```bash
cd /root/danmercc-ads-platform-local/danmercc-ads-admin
export PRISMA_CLIENT_ENGINE_TYPE=library
pnpm exec prisma generate
node prisma/seed.js
```

Notas:
- Asegúrate de que `DATABASE_URL` en tu `.env` apunte a la base de datos correcta.
- El seeder raw incluye manejo para conexiones TLS auto-firmadas en entornos de desarrollo.

Archivo con instrucciones de seed: [README.md](README.md)

Credenciales por defecto (creadas/aseguradas por el seeder):

- **Email:** admin@example.com
- **Password:** admin123

Puedes sobrescribirlas mediante variables de entorno antes de ejecutar el seeder:

```bash
export ADMIN_EMAIL="tu-admin@example.com"
export ADMIN_PASSWORD="miPasswordSeguro"
pnpm run seed
```
