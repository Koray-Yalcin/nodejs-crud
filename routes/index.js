var express = require('express');
var router = express.Router();

var mysql= require('mysql');
var db=mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'user',
  debug: false

});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/testconnect', function(req,res, next){
  if(db!=null){
    res.send('Baglanti basarili');
  }else{
    res.send('error');
  }
});

router.get('/select', function(req,res,next){
db.query('SELECT * FROM user', function (err,rs) {
res.render('select',{users:rs});
});
});

router.get('/insert',function(req,res,next){
  res.render('insert', {user:{} });
});

router.post('/insert',function(req,res,next){
  db.query('INSERT INTO user SET ?', req.body, function(err, rs){
  res.send('Ekleme Basarili');
  });
});

router.get('/delete',function(req,res,next){
  db.query('DELETE FROM user WHERE ID = ?', req.query.ID,function(err,rs){
 res.redirect('/select');
  });
});

router.get('/update',function(req,res,next){
  db.query('SELECT * FROM user WHERE ID = ?', req.query.ID,function(err,rs){
 res.render('insert', { user: rs[0]});
  });
});

router.post('/update',function(req,res,next){
var param= [
  req.body,
  req.query.ID
]
db.query('UPDATE user SET ? WHERE ID = ?', param, function(err,rs){
  res.redirect('/select');
});
});

module.exports = router;
