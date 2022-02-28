const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRouter = require('./src/routes/forms.route.js');
const {MongoClient} = require("mongodb");

//Initialize dotenv
require('dotenv').config();

const client = new MongoClient(process.env.DB_CONN_STR);

//Init db connection here and add the db object to the global variable
//so it can be shared with other routes
async function init() {
    const db = await client.connect();
    //share the connection globally 
    global.db = db;
}

//init 
(async () => await init())();
console.log("DB connection initialized");

//Server Initialization
console.log("Initializing server");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

app.use('/forms', formRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

process.on('exit', exitHandler);

function exitHandler() {
    let db = global.db;
    db.close();
    console.log("Database connection closed");
}