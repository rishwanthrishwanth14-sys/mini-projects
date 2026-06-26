
const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/auth");


//==login==//
router.get("/",(req,res) =>{
    res.render("login")
});

//==Hmoe Page==//
router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/studenthome", isLoggedIn,(req,res)=>{
    res.render("studenthome",{
        user: req.session.user
    });
});

//==
router.get("/student", isLoggedIn,(req,res) =>{
    res.render("student");
});

router.get("/students", isLoggedIn,(req,res) =>{
    res.render("studentList",{
        user:req.session.user
    });
});

router.get("/student/edit",(req,res) => {
    res.render("studentedit",{
        user: req.session.user
    });
});

module.exports = router;
