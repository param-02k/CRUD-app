// const localStorage = require("node-localstorage")
const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const userRouter = require("./routes/userRoutes.js")

const server = require("./app.js")

server.use(express.json())
server.use(cookieParser())


server.use(cors({
    origin: 'http://127.0.0.1:5500',
    credentials: true           // to store the cookies into the browser
}))

server.use(userRouter)



