const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const fetch = require('node-fetch')

const IP = process.env.IP || '0.0.0.0'
const PORT = process.env.PORT || 5000

const UNSPLASH_ACCESS_KEY = "VHn6YR4Lu7j-95tdOSGf02xw05FIFJH2FMenqQvddQE"
const UNSPLASH_SECRET_KEY = "eUSCekM-sVifHouK16UXVxogYCUTfCfvr0eNB_r8TQ0"

// express setup
app.set('view engine', 'ejs');
app.use(express.static("public"))
app.use(expressLayouts)

// routes
app.get("/", async function (req, res) {
    let unsplashRandomImageUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&featured=true`
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

    let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&featured=true&query=${keyword}&count=9`
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


// starting server
app.listen(PORT, IP, function () {
    console.log(`Express server is running at http://${IP}:${PORT}`)
})