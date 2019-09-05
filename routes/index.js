var express = require('express');
var router = express.Router();
var path = require('path')

router.use(express.static(path.join(__dirname,'../public/build')))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname + "../public/build/index.html"));
});

module.exports = router;
