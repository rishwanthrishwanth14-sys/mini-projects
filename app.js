const express = require("express");
const path = require("path");
const session = require("express-session")
const cookieParser = require("cookie-parser")

const app = express();
const port = 2007;

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(
    session({
        secret: "studentprojectsecret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 
        }
    })
);

app.use((req, res, next) => {

    const publicRoutes = [
        "/",
        "/login",
        "/api/student/login",
    ];

    if (publicRoutes.includes(req.path)) {
        return next();
    }

    if (req.session.user) {
        return next();
    }

    res.status(401).json({message: "unauthorised request"});
});


const viewRoutes = require("./Routes/viewsRoutes");
const apiRoutes = require("./Routes/apiRoutes");

app.use("/", viewRoutes);
app.use("/api", apiRoutes);


app.listen(port, () => {
    console.log(
        `Server running on http://localhost:${port}`
    );
});