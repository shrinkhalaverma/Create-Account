var mysql = require("mysql")
var prop = require("./db_properties")
module.exports = {
    getConnection : function(){
        return mysql.createConnection(prop)
    }
}