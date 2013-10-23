/**
 * Created by luoxinfang on 13-10-18.
 */
require('./radish/core/date');
var mongodb = require('./db');

function Post(author, title, content) {
  this.author = author;
  this.title = title;
  this.content = content;
}

module.exports = Post;

//save
Post.prototype.save = function (callback) {
  var date = new Date();
  var post = {
    author: this.author,
    title: this.title,
    content: this.content,
    time: date.format("YYYY-mm-dd")
  };

  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //insert post
      collection.insert(post, {safe: true}, function (err, post) {
        mongodb.close();
        callback(null);
      });
    });
  });
};
//get
Post.get = function (key, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('posts', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      var mongo = require('mongodb');
      var BSON=mongo.BSONPure;
      var condition=key? {'_id':new  BSON.ObjectID(key)}:null;
      collection.find(condition).sort({time: -1}).toArray(function (err, post) {
        mongodb.close();
        if (err) {
          return callback(err);
        }
        console.log('post.js->get post:\n', post);
        callback(null, post);
      });


    });
  });

};