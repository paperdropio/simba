const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const formRouter = require('./src/routes/forms.route.js');
const submissionRouter = require('./src/routes/submission.route.js');
const {MongoClient} = require("mongodb");
const db = require('./src/configs/db.config');
var httpContext = require('express-http-context');

const client = new MongoClient(db.connectionString);

//Init db connection here and add the db object to the global variable
//so it can be shared with other routes
async function init() {
     await client.connect();
     const dbObj = await client.db(db.DB_NAME);
    //share the connection globally 
    global.db = dbObj;
}

//init 
(async () => await init())();
console.log("DB connection initialized");

//Server Initialization
console.log("Initializing server");
const app = express();
const port = process.env.PORT || 3000;

app.use(httpContext.middleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

app.use('/forms', formRouter);
app.use('/submission', submissionRouter);

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