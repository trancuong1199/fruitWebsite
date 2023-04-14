var express = require('express');
var router = express.Router();
var db=require('../models/database');

router.get('/getAll', function(req, res, next) {
    let sql = "SELECT * FROM orders";  
    db.query(sql, function(err, result) {
       if (result) {
           return res.status(200).json({ orders: result });
         } else {
           console.log(err);
         }
    });   
});

router.post('/add', function(req, res, next) { 
    let name = req.body.name; 
    let phone = req.body.phone; 
    let email = req.body.email; 
    let address = req.body.address; 
    let status = req.body.status; 
    let userId = req.body.userId;
    let shopping_cart = JSON.parse(req.body.shopping_cart);

    let sql = "INSERT INTO orders (name, phone, email, address, user_id, status) values (?, ?, ?, ?, ?, ?)";  
    db.query(sql, [name, phone, email, address, userId, 'Đang vận chuyển'], function(err, result) {
        if (result) {
          let order_id = result.insertId;
          shopping_cart.forEach((item) => {
            let sql_details = "INSERT INTO order_detail (order_id, product_id, name, image, price, quantity) values (?, ?, ?, ?, ?, ?)";  
            db.query(sql_details, [order_id, item.id, item.name, item.image, item.price, item.quantity], function(err, result) {
                // if (result) {
                  // } else {
                    //     console.log(err);
                    // }
              // return res.status(200).json({ message: "Thêm thành công" });
            });   
          })
        } else {
            console.log(err);
        }
    });   

});

router.put('/updateStatus/:id', function(req, res, next) {
  var id = req.params.id;
  var status = req.body.status;
  let sql = "UPDATE orders SET status = ? WHERE id = ?";  

     db.query(sql,[status,id],function(err, result) {
        if (result) {
            return res.status(200).json({ message: "Cap nhat thành công" });
          } else {
            console.log(err);
          }
     });   
});

router.delete('/delete/:id', function(req, res) {
    var id = req.params.id;
    let sql = "DELETE FROM orders WHERE id = ?";  
       db.query(sql, id,function(err, result) {
          if (result) {
              return res.status(200).json({ message: "Xoa danh mục thành công" });
            } else {
              console.log(err);
            }
       });   
  });

module.exports = router;
