
var express = require('express');
var router = express.Router();
var db=require('../models/database');

router.post('/authen', async function(req, res) {
    let u = req.body.name;
    let p = req.body.password;
    let sql = 'SELECT * FROM users WHERE name = ?';
    db.query(sql, [u] , (err, rows) => {   
        let user = rows[0];       
        if (rows.length <= 0) { 
            return res.status(200).json({ users: undefined });  
        } else {
            let pass_fromdb = user.password;    
            const bcrypt = require("bcrypt");        
            var kq = bcrypt.compareSync(p, pass_fromdb);
            
            if (kq){ 
              var sess = req.session; 
              sess.daDangNhap = true;
              sess.user = user;
              return res.status(200).json({ users: user.name, id: user.id });                 
            } else {
              return res.status(200).json({ users: null });  
            }
        }
    });     
  });

module.exports = router;
