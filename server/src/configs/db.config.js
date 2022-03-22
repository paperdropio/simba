require('dotenv').config();

const db = {
    connectionString: process.env.DB_CONN_STR,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'simba',
    port: process.env.DB_PORT || 3306,
    /*ssl: {
      mode: 'VERIFY_IDENTITY',
      ca: fs.readFileSync('/etc/ssl/cert.pem', 'utf-8'),
    }*/
};

module.exports = db;