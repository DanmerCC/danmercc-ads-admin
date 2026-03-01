import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { Client as PgClient } from "pg";
import mysql from "mysql2/promise";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // First try authenticating against an external API (Laravel)
        try {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (apiUrl) {
            const res = await fetch(`${apiUrl.replace(/\/?$/, '')}/login`, {
              method: 'POST',
              body: JSON.stringify({ email: credentials.email, password: credentials.password }),
              headers: { "Content-Type": "application/json" }
            });

            const contentType = res.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
              const user = await res.json();
              if (res.ok && user && user.token) {
                return {
                  id: user.user.id.toString(),
                  name: user.user.name,
                  email: user.user.email,
                  token: user.token
                };
              }
            } else {
              const text = await res.text();
              console.error(`Auth error: expected JSON but got (status ${res.status}):`, text.substring(0, 2000));
            }
          }
        } catch (e) {
          console.error('Auth (API) error:', e);
        }

        // Fallback: validate directly against local DATABASE_URL (postgres or mysql)
        try {
          const databaseUrl = process.env.DATABASE_URL;
          if (!databaseUrl) return null;

          const url = new URL(databaseUrl);
          const protocol = url.protocol.replace(':', '');

          if (protocol.startsWith('postgres')) {
            const client = new PgClient({
              host: url.hostname,
              port: Number(url.port || 5432),
              user: url.username || undefined,
              password: url.password || undefined,
              database: url.pathname && url.pathname.slice(1) ? url.pathname.slice(1) : undefined,
              ssl: url.searchParams.get('sslmode') === 'require' ? { rejectUnauthorized: false } : false
            });
            await client.connect();
            const res = await client.query('SELECT id, name, email, password FROM admin WHERE email = $1 LIMIT 1', [credentials.email]);
            await client.end();
            if (res.rows.length === 0) return null;
            const row = res.rows[0];
            const match = await bcrypt.compare(credentials.password, row.password);
            if (!match) return null;
            return { id: row.id.toString(), name: row.name, email: row.email };
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
            const [rows]: any = await connection.execute('SELECT id, name, email, password FROM admin WHERE email = ? LIMIT 1', [credentials.email]);
            await connection.end();
            if (!rows || rows.length === 0) return null;
            const row = rows[0];
            const match = await bcrypt.compare(credentials.password, row.password);
            if (!match) return null;
            return { id: row.id.toString(), name: row.name, email: row.email };
          }

          return null;
        } catch (error) {
          console.error('Auth (DB) error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // user object is available only initially when signing in
        token.accessToken = (user as any).token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      (session.user as any).id = token.id;
      (session as any).accessToken = token.accessToken;
      return session;
    }
  },
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/login', // Adjust if you have a custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
};
