require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl =
  process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false;
const knex = require('knex');
const app = require('./app');
const { PORT, DATABASE_URL } = require('./config');

const db = knex({
  client: 'pg',
  connection: process.env.DATABASE_URL
});

app.set('db', db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
