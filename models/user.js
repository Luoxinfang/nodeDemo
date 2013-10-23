/**
 * Created with JetBrains WebStorm.
 * User: luoxinfang
 * Date: 13-10-16
 * Time: 下午12:07
 * To change this template use File | Settings | File Templates.
 */

var mongodb = require('./db');

function User(user) {
  this.name = user.name;
  this.password = user.password;
  this.email = user.email;
}

module.exports = User;

//save user
User.prototype.save = function (callback) {

  var user = {
    name: this.name,
    password: this.password,
    email: this.email
  };
  mongodb.open(function (err, db) {
    if (err) {
      return callback(err);
    }
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      collection.insert(user, {safe: true}, function (err, user) {
        mongodb.close();
        callback(null);//null is success
      });
    });
  });
};

//get user
User.get = function (name, callback) {
  mongodb.open(function (err, db) {
    if (err) {
      mongodb.close();
      return callback(err);
    }
    //read user collection
    db.collection('users', function (err, collection) {
      if (err) {
        mongodb.close();
        return callback(err);
      }
      //find user
      collection.findOne({
        name: name
      }, function (err, user) {
        mongodb.close();
        if (user) {
          return callback(null, user);
        } else {
          callback(err);
        }
      });
    });
  });
};
User.checkLogin = function (req, res, next) {
  var user = req.session.user;
  if ('/logout' == req.route.path) {
    if (!user) {
      req.flash('error', 'no login');
      res.redirect('/login');
    }
  } else if ('/login' == req.route.path) {
    if(user){
      req.flash('error', "don't login again!");
      res.redirect('back');
    }
  }else if (!user) {
    req.flash('error', 'no login');
    res.redirect('/login');
  } else {
    req.flash('error', "don't login again!");
    res.redirect('back');
  }
  next();
};