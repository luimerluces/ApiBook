const { dbConnection } = require('../config/db')
class MainHelloWorld {
    async HelloWorld(req , res){
        res.status(200);
        res.send('Hello World!');
    }
    async ListarLibros(req , res){
        let sql = "SELECT * FROM books";
        dbConnection.query(sql, function(err, data, fields) {
          if (err) {            
            console.log(err.message);
            res.json({
              status: 500,              
              message: err.message
            })    
          } else {
            res.json({
              status: 200,
              data
            })    
          }
      })      
    }
  } 
const ControllerHelloWorld = new MainHelloWorld()
module.exports = ControllerHelloWorld;