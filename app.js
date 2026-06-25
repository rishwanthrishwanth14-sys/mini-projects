const express = require("express");
const path = require("path");

const app = express();
const port = 2007;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const viewRoutes = require("./Routes/viewsRoutes");
const apiRoutes = require("./Routes/apiRoutes");

app.use("/", viewRoutes);
app.use("/api", apiRoutes);


app.listen(port, () => {
    console.log(
        `Server running on http://localhost:${port}`
    );
});