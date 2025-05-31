const express = require("express")
const server = express();
const mongoConnect = require("./config/dbConn.js")

server.listen(5000, () => {
    console.log("server is hearing at localhost :", 5000);
    try {
        mongoConnect()
    } catch (error) {
        console.log("error connecting to db", error.message);
        process.exit(1);
    }
})

module.exports = server