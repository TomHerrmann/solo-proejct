const { Pool } = require('pg');
// pool.query

const connectionString =
  'postgres://slfmhlkn:69AkwVhvoQuQZraR2PTANnZVsHmZxD0Z@salt.db.elephantsql.com:5432/slfmhlkn';

const pool = new Pool({
  connectionString: connectionString,
  port: 5432
});

pool.connect(err => {
  if (err) console.log(err);
  else console.log('Connected to database on 5432!');
});

module.exports = pool;
