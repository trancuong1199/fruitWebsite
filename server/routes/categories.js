var express = require('express');
var router = express.Router();
var db=require('../models/database');

router.get('/getAll', function(req, res, next) {
  let sql = "SELECT * FROM categories";
  db.query(sql, function(err, result) {
     if (result) {
         return res.status(200).json({ categories: result });
       } else {
         console.log(err);
       }
  });   
});

router.post('/add', function(req, res, next) {
    let name = req.body.name;
    let sql = "INSERT INTO categories (name) VALUES (?)";  

    
    db.query(sql, name, function(err, result) {
      if (result) {
          return res.status(200).json({ message: "Thêm danh mục thành công" });
        } else {
          console.log(err);
        }
    });  
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  let sql = "SELECT * FROM categories WHERE id = ?";  
  db.query(sql,[id],function(err, result) {
     if (result) {
         return res.status(200).json({ category: result[0] });
       } else {
         console.log(err);
       }
  });   
});

router.put('/update/:id', function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  let sql = "UPDATE categories SET name = ? WHERE id = ?";  

     db.query(sql,[name,id],function(err, result) {
        if (result) {
            return res.status(200).json({ message: "Cap nhat danh mục thành công" });
          } else {
            console.log(err);
          }
     });   
});

router.delete('/delete/:id', function(req, res) {
  var id = req.params.id;
  let sql = "DELETE FROM categories WHERE id = ?";  
     db.query(sql, id,function(err, result) {
        if (result) {
            return res.status(200).json({ message: "Xoa danh mục thành công" });
          } else {
            console.log(err);
          }
     });   
});

module.exports = router;  