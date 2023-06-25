/* eslint-disable import/no-import-module-exports */
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'auth',
  password: 'password',
  port: 5432,
});

module.exports = pool;
