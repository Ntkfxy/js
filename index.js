require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const mysql = require("mysql2");

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.all("/", (req, res) => {
    console.log("Just got a request!");
    res.send("Yo!");
});

app.get("/menu", (req, res) => {
    connection.query("SELECT * FROM `tbl_menu` WHERE menuID = 01", function (err, results, fields) {
        res.send(results);
    });
});

app.post("/addmenu", function (req, res) {
    connection.query(
        "INSERT INTO `tbl_menu`(`menuID`, `menuName`) VALUES (?, ?)",
        [req.body.menuID, req.body.menuName],

        function (err, results) {
            if (err) throw err;
            return res.send({
                err: false,
                data: results,
                message: "New menu has been created successfully.",
            });
        }
    );
});



app.listen(process.env.PORT || 5000);