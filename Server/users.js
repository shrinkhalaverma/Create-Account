var express = require('express')
var conn = require('./db_connection')
const { password } = require('./db_properties')
var connection = conn.getConnection()
connection.connect()
var router = express.Router()
// Insert
router.post("/register",(req,res)=>{
    let first_name = req.body.first_name
    let last_name = req.body.last_name
    let email = req.body.email
    let password = req.body.password
    console.log(first_name, last_name, email, password)
    query1 =`INSERT INTO users (email, first_name, last_name, password) VALUES ('${email}', '${first_name}', '${last_name}', '${password}')`
    connection.query(query1,(err,result)=>{
        if(err)
        {
            res.json({'insert':'error'})
        }
        else
        {
            res.json({'insert':'success'})
        }
    })

})

router.post("/login", (req, res) => {
    let email = req.body.email
    let password = req.body.password
    sql_query = `select * from users where email = '${email}' and password = '${password}'`
    connection.query(sql_query, (err, recordsArray, fields) => {
        if(err){
            res.json({"status": "failed", "message": "credentials are not correct"})
        }
        if(recordsArray.length > 0){
            // generate token
            let length = 10
            token = Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);

            // insert token into users table
            sql_insert_token = `UPDATE users SET api_key = '${token}' WHERE id=${recordsArray[0].id}`
            console.log(sql_insert_token)
            connection.query(sql_insert_token, (err, recordsArray, fields) => {
                if(err){
                    res.json({"status": "failed", "message": "AAAA credentials are not correct"})
                }else{
                    res.json({"status": "success", "message": "logged in successfully", "token": token})
                }
            })
            
            
        }
    })

})

router.post("/logout",(req,res)=>{
    let token = req.body.token
    query1 = `update users set api_key = null where api_key = '${token}'`
    connection.query(query1,(err,recordsArray,fields)=>{
        if(err)
        res.json({"message":"Error"})
        else
        res.json({"status": "success", "messages": "logged out successfully"})
    })
})


module.exports = router