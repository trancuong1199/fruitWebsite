var express = require('express');
var router = express.Router();
var db=require('../models/database');
var multer = require('multer');
const path = require('path');
const { log } = require('console');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images')
  },
  filename:(req, file, cb) => {
    return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({dest: 'uploads/'})

router.get('/getAll', function(req, res, next) {
  let sql = "SELECT * FROM products";  
  db.query(sql, function(err, result) {
     if (result) {
         return res.status(200).json({ products: result });
       } else {
         console.log(err);
       }
  });   
});

router.post('/add', upload.single('image'), function(req, res, next) { 
     let name = req.body.name; 
     let detail = req.body.detail; 
     let price = req.body.price; 
     let category_id = req.body.category_id;
     let image = req.file.path


      let sql = "INSERT INTO products (name, detail, price, category_id, image) values (?, ?, ?, ?, ?)";  
      db.query(sql, [name, detail, price, category_id, image], function(err, result) {
          if (result) {
            return res.status(200).json({ message: "Thêm san pham thành công" });
          } else {
            console.log(err);
          }
      });   
     
     
});

router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  let sql = "SELECT * FROM products WHERE id = ?";  
  db.query(sql,[id],function(err, result) {
     if (result) {
         return res.status(200).json({ product: result[0] });
       } else {
         console.log(err);
       }
  });   
});

router.put('/update/:id',upload.single('image'), function(req, res, next) {
  var id = req.params.id;
  var name = req.body.name;
  let detail = req.body.detail; 
  let price = req.body.price; 
  let category_id = req.body.category_id; 
  let image = req.file.path;
  

  
  let sql = "UPDATE products SET name = ?, detail = ?, price = ?, category_id = ?, image = ? WHERE id = ?";
    db.query(sql,[name, detail, price, category_id, image, id],function(err, result) {
      if (result) {
          return res.status(200).json({ message: "Cap nhat san pham thành công" });
        } else {
          console.log(err);
        }
    });   
  

 
});

router.delete('/delete/:id', function(req, res) {
  var id = req.params.id;
  let sql = "DELETE FROM products WHERE id = ?";  
     db.query(sql, id,function(err, result) {
        if (result) {
            return res.status(200).json({ message: "Xoa san pham thành công" });
          } else {
            console.log(err);
          }
     });   
});

module.exports = router;