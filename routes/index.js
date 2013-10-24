/*
 * GET home page.
 */
//var User = require('../models/impl/user');

var crypto = require('crypto'),
  User = require('../models/user'),
  Post = require('../models/post');

module.exports = function (app) {
  app.get('/', function (req, res) {
    Post.get(null, function (err, posts) {
      if (err) {
        posts = [];
      }
      if (req.xhr) {
        res.json({
          posts: posts
        });
      } else {
        res.render('index', {
          title: 'Home',
          user: req.session.user,
          posts: posts,
          success: req.flash('success').toString(),
          error: req.flash('error').toString()
        });
      }
    });
  });

  app.get('/login', User.checkLogin);
  app.get('/login', function (req, res) {
    res.render('login', {
      title: 'Login',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/login', function (req, res) {
    //generate password's md5
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
    //find user
    User.get(req.body.name, function (err, user) {
      if (!user) {
        req.flash('error', 'no such user');
        return res.redirect('/login');
      }
      console.log(user.password, password)
      if (user.password != password) {
        req.flash('error', 'password error');
        return res.redirect('/login')
      }
      req.session.user = user;
      req.flash('success', 'welcome you ' + user.name);
      res.redirect('/');
    });
  });
  app.get('/logout', User.checkLogin);
  app.get('/logout', function (req, res) {
    req.session.user = null;
    req.flash('success', 'logout');
    res.redirect('/');
  });

  app.get('/reg', function (req, res) {
    res.render('register', {
      title: 'register',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/reg', function (req, res) {
    var name = req.body.name,
      email = req.body.email;
    var md5 = crypto.createHash('md5'),
      password = md5.update(req.body.password).digest('hex');
    console.log(name, password, email);
    var user = new User({
      name: name,
      password: password,
      email: email
    });
    user.save(function (err) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        return res.redirect('/reg');
      } else {
        req.session.user = user;
        req.flash('success', 'register success');
        res.redirect('/');
      }
    });
  });
  app.get('/posting', function (req, res) {
    res.render('posting', {
      title: 'posting',
      user: req.session.user,
      success: req.flash('success').toString(),
      error: req.flash('error').toString()
    });
  });
  app.post('/posting', function (req, res) {
    var user = req.session.user,
      title = req.body.title,
      content = req.body.content,
      post = new Post(user.name, title, content);
    post.save(function (err) {
      if (err) {
        req.flash('error', err);
      } else {
        req.flash('success', 'post success');
      }
      return res.redirect('/');
    });
  });

  app.post('/getPost/:_id', function (req, res) {
    var _id = req.params._id;
    Post.get(_id, function (err, posts) {
      if (!err) {
        var post = posts[0];
        res.json(post);
        console.log(posts.constructor, 'index.js->post:', post);
      }
    });
  });


  //chat
  //app.get('/chat', User.checkLogin);
  app.get('/chat', function (req, res) {
    res.render('chat', {
      title: 'chat',
      user: req.session.user,
      success: '',
      error: ''
    });
    //write cookie when login
    res.cookie('user', JSON.stringify(req.session.user), {maxAge: 1000 * 60 * 60 * 24 * 30});
  });

  app.use(function (req, res) {
    res.render('404');
  });
};