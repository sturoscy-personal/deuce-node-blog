// Module dependencies.
var express      = require('express'),
    mongooseAuth = require('mongoose-auth'),
    moment       = require('moment');

var app = module.exports = express.createServer();

// Port info
var port = (process.env.PORT || 3000);

// Host info (not needed for heroku)
// var host = (process.env.HOST || 'local.host:3000');

// Connect to mongodb
var mongoConn = require('./models/mongo-conn.js');

// Debug mode
// mongooseAuth.debug = true;

// Data providers
var PostDataProvider = require('./models/posts').PostDataProvider;
    PostDataProvider = new PostDataProvider();

// Authentication Providers
var authDataProvider = require('./models/auth-users.js').authDataProvider,
    authDataProvider = new authDataProvider();

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: "dragon" }));
  app.use(express.errorHandler());
  app.use(express.methodOverride());
  app.use(mongooseAuth.middleware());
});

// Keeping this in for using moment plugin
var now       = moment(Date.now()),
    formatNow = now.format('dddd, MMMM Do YYYY, h:mm:ss a');

// Routes (RESTful configurations)
// All Posts
app.get('/', function(req, res) {
  PostDataProvider.findAll(function(posts) {
    authDataProvider.findLoggedIn(function(loggedInUsers) {
      var numUsers;
          numUsers = loggedInUsers.length;
      res.render('index', {
        title: 'Home',
        posts: posts,
        numUsers: numUsers,
        users: loggedInUsers
      });
    });
  });
});

// About Page
app.get('/about', function(req, res) {
  res.render('about', {
    title: 'About'
  });
});

// Posts by ID (used for post page)
app.get('/post/:id', function(req, res) {
  PostDataProvider.findById(req.params.id, function(postWithId) {
    authDataProvider.findLoggedIn(function(loggedInUsers) {
      var numUsers;
          numUsers = loggedInUsers.length;
      res.render('post', {
        title: 'Post',
        postWithId: postWithId,
        numUsers: numUsers,
        users: loggedInUsers
      });
    });
  });
});

// All of an Individual User's Posts
app.get('/user/:userId/posts', function(req, res) {
  PostDataProvider.findByUserId(req.params.userId, function(userPosts) {
    authDataProvider.findLoggedIn(function(loggedInUsers) {
      var numUsers;
          numUsers = loggedInUsers.length;
      res.render('user/posts', {
        title: 'User Posts',
        userPosts: userPosts,
        numUsers: numUsers,
        users: loggedInUsers
      });
    });
  });
});

// GET the add post page
app.get('/add-post', function(req, res) {
  res.render('add-post', {
    title: 'Add a Post'
  });
});

// Add (POST) a comment
app.post('/post/:id', function(req, res) {
  var commentObject = req.body.comment,
      email         = commentObject.email,
      comment       = commentObject.comment;
  var postID        = req.params.id;
  PostDataProvider.addComment(commentObject, postID, function(){});
  res.redirect('/post/' + req.params.id);
});

mongooseAuth.helpExpress(app);

app.listen(port);