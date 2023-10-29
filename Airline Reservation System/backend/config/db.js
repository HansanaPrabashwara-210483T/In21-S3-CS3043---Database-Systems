import mysql from "mysql2";
import dotenv from "dotenv";

// Looks for db.env file WITHIN the config/ folder
dotenv.config({path: "./db.env"});

// Populate with your values, can keep `connectionLimit` unchanged. 
const db = mysql.createPool({
    connectionLimit: 10,
    host           : "localhost", 
    user           : "root",
    password       : "Hansaname21#",
    database       : "airline_project_g24",
});

// The following SHOULD be how the connection is made, unfortunately, for some
// reason the db.env file doesn't seem to be read...
// const db = mysql.createPool({
//     connectionLimit: 10,
//     host           : process.env.DB_HOST,
//     user           : process.env.DB_USER,
//     password       : process.env.DB_PASSWORD,
//     database       : process.env.DB_DATABASE,
// });

export default db;