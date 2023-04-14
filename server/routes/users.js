var express = require('express');
var router = express.Router();
var db=require('../models/database');

router.get('/getAll', function(req, res, next) {
  let sql = "SELECT * FROM users";
  db.query(sql, function(err, result) {
     if (result) {
         return res.status(200).json({ users: result });
       } else {
         console.log(err);
       }
  });   
});


router.post('/add', function(req, res, next) {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";  

  const bcrypt = require("bcrypt");        
  var salt = bcrypt.genSaltSync(10);
  var pass_mahoa = bcrypt.hashSync(password, salt);
  
  db.query(sql, [name, email, pass_mahoa], function(err, result) {
    if (result) {
        return res.status(200).json({ message: "Thêm thành công" });
      } else {
        console.log(err);
      }
  })
}); 

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  let sql = "SELECT * FROM users WHERE id = ?";  
  db.query(sql,[id],function(err, result) {
     if (result) {
         return res.status(200).json({ users: result[0] });
       } else {
         console.log(err);
       }
  });   
});


router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  let sql = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";  

     db.query(sql,[name, email, password, id],function(err, result) {
        if (result) {
            return res.status(200).json({ message: "Cap nhat thành công" });
          } else {
            console.log(err);
          }
     });   
}); 


router.delete('/delete/:id', function(req, res) {
  var id = req.params.id;
  let sql = "DELETE FROM users WHERE id = ?";  
     db.query(sql, id,function(err, result) {
        if (result) {
            return res.status(200).json({ message: "Xoa thành công" });
          } else {
            console.log(err);
          }
     });   
});


module.exports = router;
