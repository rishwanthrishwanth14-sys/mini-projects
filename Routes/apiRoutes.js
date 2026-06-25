const express = require("express");
const router = express.Router();

const db = require("../config/db");


const gender_options = ["male", "female", "others"]

function validateStudent(data) {

    const error = [];

    if (!(data.name && data.name.length >= 3)) {
        error.push("name must be contain atleast 2 characters");
    }
    if (!(data.gender && gender_options.includes(data.gender))) {
        error.push("invalid gender");
    }
    if (!(data.phoneNumber && data.phoneNumber.length === 10 && /^\d+$/.test(data.phoneNumber))) {
        error.push("invalide phone number");
    }
    if (!(data.dob && /^\d{4}-\d{2}-\d{2}$/.test(data.dob))) {
        error.push("invalid date of birth");
    }
    if (!(data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))) {
        error.push("your gmail must contain (a-z,A-Z,0-9)");
    }
    if (!(data.password && data.password.length >= 6)) {
        error.push("your password must contains 8 characters ");
    }
    return error;
};



//===create===//

router.post("/student", (req, res) => {
    const data = req.body;


    const errors = validateStudent(data);

    if (errors.length > 0) {
        return res.status(400).json(errors);
    }
    const sql = `
    insert into student (
       name, gender, phoneNumber, dob, email, password)
       values(?, ?, ?, ?, ?, ?)
       `;

    db.query(
        sql, [
        data.name,
        data.gender,
        data.phoneNumber,
        data.dob,
        data.email,
        data.password,
    ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.redirect("/students");
        }
    );
});

//===get all id===//

router.get("/students", (req, res) => {

    db.query(
        "select * from student",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }
            res.json(result);
        });
});

//===get single id===//

router.get("/student/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "select * from student where id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }
            res.json(result[0]);
        });
});

//===update||put===//

router.put("/student/:id", (req, res) => {

    const id = req.params.id;
    const data = req.body;

    const errors = validateStudent(data)
    if (errors.length > 0)
        return res.status(400).json(error);

    const sql = `
     update student 
     set 
     name=?,
     gender=?,
     phoneNumber=?,
     dob=?,
     email=?,
     password=?
     where id=?
     `;

    db.query(
        sql,
        [
            data.name,
            data.gender,
            data.phoneNumber,
            data.dob,
            data.email,
            data.password,
            id
        ],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "student where succesfully updated"
            });
        }

    );


});

//===delete===//

router.delete("/student/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM student WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }
            res.json({
                message: "Student deleted successfully"
            });
        }

    );
});


module.exports = router;
