
// For example - test function.:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
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


Parse.Cloud.beforeSave("StreetDetailImageBeta", function(request, response) {
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


