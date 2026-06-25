const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "student_info",
});

db.connect((err) =>{
    if (err) {
        console.log("db connection error:",err);
    } else {
        console.log("mysql connected");
    }
});

module.exports = db;
