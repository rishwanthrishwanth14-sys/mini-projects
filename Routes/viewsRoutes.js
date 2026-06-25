
const express = require("express");
const router = express.Router();

router.get("/",(req,res) =>{
    res.render("studenthome")
});

router.get("/student",(req,res) =>{
    res.render("student")
});

router.get("/students",(req,res) =>{
    res.render("studentList");
})

router.get("/student/edit",(req,res) => {
    res.render("studentedit");
})

module.exports = router;
