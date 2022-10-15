const { dbConnection } = require('../config/db')
const { body, validationResult } = require('express-validator');
class MainBook {
    async ListarLibros(req , res){
        let sql = "SELECT ISBN,BookTitle,BookAuthor,YearOfPublication,Publisher,ImageURLS,ImageURLM,ImageURLL,if(Ind_Activo=1,'Activo', 'Inactivo') as Estatus FROM books where Ind_Activo=1";
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
    async BuscarLibro(req , res){
      let sql = "SELECT ISBN,BookTitle,BookAuthor,YearOfPublication,Publisher,ImageURLS,ImageURLM,ImageURLL,if(Ind_Activo=1,'Activo', 'Inactivo') as Estatus FROM books where Ind_Activo=1 and Id_book="+req.params.idLibro+"";
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
    async BuscarLibroISBN(req , res){
      let sql = "SELECT ISBN,BookTitle,BookAuthor,YearOfPublication,Publisher,ImageURLS,ImageURLM,ImageURLL,if(Ind_Activo=1,'Activo', 'Inactivo') as Estatus FROM books where Ind_Activo=1 and ISBN="+req.params.ISBN+"";
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
    async AddNewBook(req , res){      
      const Isbn  = req.body.ISBN;
      const Title  = req.body.Title;
      const Author  = req.body.Author;
      const Publication  = req.body.Publication;
      const Publisher  = req.body.Publisher;
      const ImageURLS  = req.body.ImageURLS;
      const ImageURLM = req.body.ImageURLM;
      const ImageURLL= req.body.ImageURLL;
      if (Isbn && Title && Author && Publication && Publisher && ImageURLS && ImageURLM && ImageURLL) {
        let sql = "INSERT INTO books (ISBN, BookTitle, BookAuthor,YearOfPublication,Publisher,ImageURLS,ImageURLM,ImageURLL,Ind_Activo) VALUES ('"+Isbn+"','"+Title+"','"+Author+"','"+Publication+"','"+Publisher+"','"+ImageURLS+"','"+ImageURLM+"','"+ImageURLL+"',True)";
        console.log(sql);
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
              message:"Se agrego el libro correctamente"
            })    
          }
        })
      }
      else  
      {
        res.json({
          status: 500,              
          message:"Debe Ingresar todas la información del libro por favor"
        }) 
      }  
    } 
    async UpdateBook(req , res){  
      const Id_Book  = req.body.Id_Book;  
      const Isbn  = req.body.ISBN;
      const Title  = req.body.Title;
      const Author  = req.body.Author;
      const Publication  = req.body.Publication;
      const Publisher  = req.body.Publisher;
      const ImageURLS  = req.body.ImageURLS;
      const ImageURLM = req.body.ImageURLM;
      const ImageURLL= req.body.ImageURLL;
      let sql = "UPDATE books SET ISBN='"+Isbn+"',BookTitle='"+Title+"',BookAuthor='"+Author+"',YearOfPublication='"+Publication+"',Publisher='"+Publisher+"',ImageURLS='"+ImageURLS+"',ImageURLM='"+ImageURLM+"',ImageURLL='"+ImageURLL+"' WHERE Id_book="+Id_Book+"";
      console.log(sql);
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
            message:"Se Actualizo el libro correctamente"
          })    
        }
      })
    }  
    async InactivarBook(req , res){
      const Id_Book  = req.body.Id_Book;  
      let sql = "UPDATE books SET Ind_Activo=0 WHERE Id_book="+req.params.idLibro+"";
      console.log(sql);
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
            message:"Se elimino el libro correctamente"
          })    
        }
      })
    }   
  } 
const ControllerBook = new MainBook()
module.exports = ControllerBook;