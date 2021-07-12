var express = require('express');
var router = express.Router();
var Article = require('../model/article');

/* GET users listing. */
router.get('/new', (req, res, next) => {
  res.render('form');
});

router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.split(',').map((ele) => ele.trim());
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});

router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articles', {articles})
  })
})

module.exports = router;
