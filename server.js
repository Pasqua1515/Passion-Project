const express = require("express");
const cors = require("cors")

const app = express()

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions))
//json
app.use(express.json())
//encoding
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Pin-it"
    })
})

//port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(` Pin-it server running on port ${PORT}`)
})

//db
const db = require("./app/models")
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database")
    }).catch(err => {
        console.log("Cannot connect to the database", err);
        process.exit()
    })