import { assert } from 'console';
import DBConnection from './models/dbConnection';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import formRouter from './routes/forms.route';
import submissionRouter from './routes/submission.route';
const {MongoClient} = require("mongodb");
var httpContext = require('express-http-context');
require('dotenv').config();

type dbConfigType = {
    connectionString: string,
    host: string,
    user: string,
    password: string,
    database: string,
    port: number
}

const dbConfig : dbConfigType = {
    connectionString: process.env.DB_CONN_STR || "",
    host: process.env.DB_HOST || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || 'simba',
    port: (process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306)
};

//Init db connection here and add the db object to the global variable
//so it can be shared with other routes
async function init() {    
     DBConnection.initialize(dbConfig.connectionString, dbConfig.database);
}

const exitHandler = async() : Promise<void> => {
    await DBConnection.Instance?.close();
    console.log("Database connection closed");
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

app.get('/', (req:any, res:any) => {
    res.json({'message': 'ok'});
})

app.use('/forms', formRouter);
app.use('/submission', submissionRouter);

/* Error handler middleware */
app.use((err:any, req:any, res:any, next:any) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'message': err.message});
    return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

process.on('exit', exitHandler);