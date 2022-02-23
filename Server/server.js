var express = require('express')
var bodyparser = require('body-parser')
var cors = require('cors')
var app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors())
var users_module = require("./users")

app.use("/users",users_module)

app.listen(8080)
console.log("server listening port no 8080")