var express = require('express');
var router = express.Router();
var Comment = require('../model/comment');
var Article = require('../model/article');

// post comments 
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  req.body.articleId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    Article.findByIdAndUpdate(
      id,
      { $push: { comments: comment._id } },
      (err, article) => {
        if (err) return next(err);
        res.redirect('/articles/' + id);
      }
    );
  });
});

// edit 
router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Comment.findById(id, (err, comment) => {
        if (err) return next(err);
        res.render('editcomment', {comment})
    })
})

// update 
router.post('/:id/update', (req, res, next) => {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, comment)=>{
        if (err) return next(err);
        res.redirect('/articles/'+comment.articleId)
    })
})

// delete 
router.get('/:id/delete', (req, res, next) => {
  let id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) return next(err);
    let articleId = comment.articleId;
    console.log(articleId);
    Article.findByIdAndUpdate(articleId,{$pull:{comments:id}}, (err, article) => {
      if (err) return next(err);
      res.redirect('/articles/'+ articleId)
    });
  });
});

// likes 
router.get('/:id/likes', (req, res, next) => {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id, {$inc: {likes:1}}, (err, comment) =>{
        res.redirect('/articles/'+comment.articleId)
    })
})

// dislikes 
router.get('/:id/dislikes', (req, res, next) => {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id, {$inc: {dislikes:1}}, (err, comment) =>{
        res.redirect('/articles/'+comment.articleId)
    })
})


module.exports = router;
