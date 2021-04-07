var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to Api Flower');
  
});

router.use('/usuarios', require('./usuarios'));

module.exports = router;