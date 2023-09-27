import 'dotenv/config';
import postgres from 'postgres';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

export const sql = postgres(URL, {
  host: PGHOST, // Postgres ip address[s] or domain name[s]
  port: 5432, // Postgres server port[s]
  database: PGDATABASE, // Name of database to connect to
  username: PGUSER, // Username of database user
  password: PGPASSWORD, // Password of database user
});

// export const sql = postgres(URL, { ssl: 'require' });
