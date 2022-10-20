const { dbConnection } = require('../config/db');
const MY_Configuration = require('../constante/constante');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
class MainUser {
    async Login(req , res){     
        let Login = req.body.Login;
        let Password = req.body.Password;
        let UserPassword = "";
        let validPassword;
        if (Login && Password) {        
            dbConnection.query('SELECT Id_usuario,Nombres,Apellidos,Edad,Login,Password,Email FROM User WHERE Login = ?', [Login], async function(error, results, fields){            
                if (error) throw error; 
                if (results.length > 0) { 
                    let Nombres=results[0].Nombres;
                    let Apellidos=results[0].Apellidos;
                    let UserPassword=results[0].Password;
                    let ID_Cliente=results[0].Id_usuario;
                    console.log(UserPassword);
                    validPassword = await bcrypt.compare(Password, UserPassword);
                    if (validPassword) {
                        res.json({
                            success: true,
                            message: 'Bienvenido a Sistema de Registro de Libro',
                            NombresUsuarios: Nombres,
                            ApellidosUsuarios: Apellidos,
                            ID_Cliente: ID_Cliente,                    
                            token: jwt.sign({
                                   usuario: Login
                                }, MY_Configuration.secret, {
                                    expiresIn: MY_Configuration.expiresIn
                                } 
                            )
                        });
                    }else{    
                        res.status(200).json({
                            message: "Password Incorrecto"
                        });
                    }    
                }else{
                    res.json({
                        status: 200,              
                        message:"El Usuario no Existe en la Base de Datos"
                      }) 
                }    
            });
        }else{    
        res.json({
            status: 500,              
            message:"Debe Ingresar Usuarios y Password por favor"
          }) 
        }    
    }
    async RegistrarUsuario(req , res){
        let Nombres = req.body.Nombres;
        let Apellidos = req.body.Apellidos;
        let Edad = req.body.Edad;
        let Login = req.body.Login;
        let Password = req.body.Password;
        let Email = req.body.Email;
        if (Login && Email) {
            dbConnection.query('SELECT Email FROM User WHERE Login = ? AND Email = ?', [Login, Email], async function(error, results, fields){            
            if (error) throw error;            
                if (results.length > 0) {                 
                        res.json({
                            status: 200,              
                            message:"Ya existe un Usuario con ese Email y Login en la base de datos"
                        })    
                    }else{
                        const salt = await bcrypt.genSalt(MY_Configuration.genSalt);
                        const hash = await bcrypt.hash(Password, salt);                                        
                        let sql = "INSERT INTO User (Nombres, Apellidos, Edad,Login,Password,Email) VALUES ('"+Nombres+"','"+Apellidos+"',"+Edad+",'"+Login+"','"+hash+"','"+Email+"')";
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
                                message:"Se creo el usuario correctamente"
                            })    
                            }
                        })
                    }			
                });
        }else{    
            res.json({
                status: 500,              
                message:"Debe Ingresar todos los datos del Usuario"
              })    
        }    
    }    
  } 
const ControllerUser = new MainUser()
module.exports = ControllerUser;