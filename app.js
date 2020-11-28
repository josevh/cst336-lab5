const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const app = express()
const fetch = require("node-fetch")
const mysql = require("mysql")

const formData = require("express-form-data");

const IP = process.env.IP || "0.0.0.0"
const PORT = process.env.PORT || 5000

const UNSPLASH_ACCESS_KEY = "VHn6YR4Lu7j-95tdOSGf02xw05FIFJH2FMenqQvddQE"
const UNSPLASH_SECRET_KEY = "eUSCekM-sVifHouK16UXVxogYCUTfCfvr0eNB_r8TQ0"

// express setup
app.set("view engine", "ejs");
app.use(express.static("public"))
app.use(expressLayouts)

app.use(formData.parse());

// functions
var mysqlConn = null
function getMysqlConn() {
    if (mysqlConn === null) {
        mysqlConn = mysql.createPool({
            connectionLimit: 10,
            host: process.env.MYSQL_HOST || "db",
            user: process.env.MYSQL_USER || "root",
            password: process.env.MYSQL_PASSWORD || "root",
            database: process.env.MYSQL_DATABASE || "cst336-lab5",
            insecureAuth: true
        })
    }


    return mysqlConn
}

// routes
app.get("/", async function (req, res) {
    let unsplashRandomImageUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&featured=true&orientation=landscape`
    let response = await fetch(unsplashRandomImageUrl)
    let data = await response.json()

    var viewData = {}
    if (data) {
        viewData.imageUrl = data.urls.small
    }
    res.render("index", viewData)
})

app.get("/search", async function (req, res) {
    let keyword = ""
    if (req.query.keyword) {
        keyword = req.query.keyword
    }

    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&featured=true&query=${keyword}&orientation=landscape&count=9`
    let response = await fetch(apiUrl)
    let data = await response.json()

    var viewData = {
        imageUrlArray: []
    }
    if (data) {
        viewData.imageUrl = data[0].urls.small
        for (let i = 0; i < data.length; i++) {
            const imageData = data[i];
            viewData.imageUrlArray.push(imageData.urls.small)
        }
    }
    res.render("results", viewData)
})

app.get("/api/favorite", function (req, res) {
    let conn = getMysqlConn()

    conn.query(`SELECT id, imageUrl, keyword, created FROM favorites`, function (error, results, fields) {
        if (error) {
            return res.status(500).json()
        }

        let rows = JSON.parse(JSON.stringify(results[0]));
        return res.status(200).json({
            success: true,
            data: rows
        })
    })
})

app.post("/api/favorite", function (req, res) {
    let conn = getMysqlConn()

    if (!("keyword" in req.body) || !("imageUrl" in req.body)) {
        return res.status(400).json({success: false})
    }

    let keyword = req.body.keyword
    let url = req.body.imageUrl

    conn.query(
        "INSERT INTO favorites (imageUrl, keyword) VALUES (?, ?)",
        [url, keyword],
        function (error, results, fields) {
            if (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                })
            }

            return res.status(200).json({
                success: true,
                data: {id: results.insertId}
            })
    })
})

app.delete("/api/favorite/:id", function (req, res) {
    let id = req.params.id

    if (isNaN(id)) {
        return res.status(400).json({success: false})
    }

    let conn = getMysqlConn()

    conn.query(`DELETE FROM favorites where id = ?`, [id,], function (error, results, fields) {
        if (error) {
            return res.status(500).json()
        }
        console.log(results)
        // ID not found
        if (results.affectedRows === 0) {
            return res.status(404).json()
        }

        return res.status(200).json({
            success: true
        })
    })
})


// starting server
app.listen(PORT, IP, function () {
    console.log(`Express server is running at http://${IP}:${PORT}`)
})