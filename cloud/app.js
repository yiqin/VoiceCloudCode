var express = require('express');
var formatDate = require('cloud/util/format-date.js');

var app = express();
var Article = Parse.Object.extend('Article');

app.set('views', 'cloud/views');
app.set('view engine', 'ejs');
app.use(express.bodyParser());

app.get('/preview/article/:articleId', function(req, res) {
  var query = new Parse.Query(Article);
  query.equalTo('objectId', req.params.articleId);
  query.first({
    success: function(article) {
      var coverImage = article.get('briefImage');
      if (coverImage)
        coverImage = coverImage.url();
      else
        coverImage = '';
      res.render('article', {
        title: article.get('title'),
        content: article.get('content'),
        author: article.get('writerName'),
        coverImage: coverImage,
        createdAt: formatDate(article.createdAt, 'yyyy-mm-dd')
      });
    },
    error: function(error) {
      res.send(error);
    }
  });
});

app.listen();
