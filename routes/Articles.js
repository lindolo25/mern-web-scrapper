var express = require('express');
const ArticlesController = require('../Controllers/ArticlesController');
var router = express.Router();

/* GET users listing. */
router.get('/', ArticlesController.getScrappedArticles);

module.exports = router;
