
// For example - test function.:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// Trigger on LikeArticle
Parse.Cloud.afterSave("LikeArticle", function(request) {
  query = new Parse.Query("Article");
  query.get(request.object.get("article").id, {
    success: function(article) {
      article.increment("likeCount");
      article.increment("likeToday");
      Parse.Cloud.useMasterKey()
      article.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
});

Parse.Cloud.afterDelete("LikeArticle", function(request) {
  query = new Parse.Query("Article");
  query.get(request.object.get("article").id, {
    success: function(article) {
      article.increment("likeCount", -1);
      article.increment("likeToday", -1);
      Parse.Cloud.useMasterKey()
      article.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
});

// Trigger on Article
Parse.Cloud.afterDelete("Article", function(request) {
  query = new Parse.Query("LikeArticle");
  query.equalTo("article", request.object);
  query.find({
    success: function(likes) {
      Parse.Cloud.useMasterKey()
      Parse.Object.destroyAll(likes, {
        success: function() {},
        error: function(error) {
          console.error("Error deleting related likes " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related likes " + error.code + ": " + error.message);
    }
  });
});

// Trigger on LikeStreetImage
Parse.Cloud.afterSave("LikeStreetImage", function(request) {
  query = new Parse.Query("StreetImage");
  query.get(request.object.get("streetImage").id, {
    success: function(streetImage) {
      streetImage.increment("likeCount");
      streetImage.increment("likeToday");
      Parse.Cloud.useMasterKey()
      streetImage.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
});

Parse.Cloud.afterDelete("LikeStreetImage", function(request) {
  query = new Parse.Query("StreetImage");
  query.get(request.object.get("streetImage").id, {
    success: function(streetImage) {
      streetImage.increment("likeCount", -1);
      streetImage.increment("likeToday", -1);
      Parse.Cloud.useMasterKey()
      streetImage.save();
    },
    error: function(error) {
      console.error("Got an error " + error.code + " : " + error.message);
    }
  });
});

// Trigger on StreetImage
Parse.Cloud.afterDelete("StreetImage", function(request) {
  query = new Parse.Query("LikeStreetImage");
  query.equalTo("streetImage", request.object);
  query.find({
    success: function(likes) {
      Parse.Cloud.useMasterKey()
      Parse.Object.destroyAll(likes, {
        success: function() {},
        error: function(error) {
          console.error("Error deleting related likes " + error.code + ": " + error.message);
        }
      });
    },
    error: function(error) {
      console.error("Error finding related likes " + error.code + ": " + error.message);
    }
  });
});


// Process image size....
var Image = require("parse-image");
 
Parse.Cloud.beforeSave("StreetDetailImage", function(request, response) {
  var streetDetailImage = request.object;
 
  Parse.Cloud.httpRequest({
    url: streetDetailImage.get("image").url()
 
  }).then(function(response) {
    var image = new Image();
    return image.setData(response.buffer);
 
  }).then(function(image) {
    
    var ratio = image.width()/image.height();
    streetDetailImage.set("ratio", ratio);
    streetDetailImage.set("imageHeight", 100);

  }).then(function(result) {
    response.success();
  }, function(error) {
    response.error(error);
  });
});

