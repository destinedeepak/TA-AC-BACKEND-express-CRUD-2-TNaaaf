var express = require('express');
var router = express.Router();
var Article = require('../model/article');

/* GET users listing. */
// send form
router.get('/new', (req, res, next) => {
  res.render('form');
});
// create new form
router.post('/', (req, res, next) => {
  req.body.tags = req.body.tags.split(',').map((ele) => ele.trim());
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles');
  });
});
// get all articles
router.get('/', (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render('articles', { articles });
  });
});
// get article details
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render('articleDetails', { article });
  });
});
// likes
router.get('/:id/like', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

// dislikes
router.get('/:id/dislike', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { dislikes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/' + id);
  });
});

// edit
router.get('/:id/edit', (req, res, next) => {
  let id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    article.tags = article.tags.reduce((acc, ele, i, arr) => {
      acc += ele;
      if (i !== arr.length - 1) {
        acc += ',';
      }
      return acc; 
    }, '');
    res.render('editarticle', { article });
  });
});

// update 
router.post('/:id/update', (req, res, next) => {
  let id = req.params.id;
  req.body.tags = req.body.tags.split(',').map((ele) => ele.trim());
  Article.findByIdAndUpdate(id, req.body, (err, article) => {
    if (err) return next(err);
    res.redirect('/articles/'+article._id);
  });
})

//delete
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) =>{
    res.redirect('/articles');
  })
})
module.exports = router;
