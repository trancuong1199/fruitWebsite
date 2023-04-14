var express = require('express');
var router = express.Router();
var db=require('../models/database');

router.get('/getAll', function(req, res, next) {
    let sql = "SELECT * FROM order_detail";  
    db.query(sql, function(err, result) {
       if (result) {
           return res.status(200).json({ orderDetail: result });
         } else {
           console.log(err);
         }
    });   
});

module.exports = router;
