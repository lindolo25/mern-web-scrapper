var express = require('express');
const ArticlesController = require('../Controllers/ArticlesControllers');
var router = express.Router();

/* GET users listing. */
router.get('/', ArticlesController.getScrappedArticles);

module.exports = router;
