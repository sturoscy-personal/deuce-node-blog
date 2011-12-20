// Module dependencies.
var express      = require('express'),
    mongooseAuth = require('mongoose-auth');
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
var authProvider = require('./models/auth-users.js');

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

// Routes (RESTful configurations)
app.get('/', function(req, res) {
  PostDataProvider.findAll(function(posts) {
    res.render('index', {
      title: 'Home',
      posts: posts
    });
  });
});

app.get('/post/:id', function(req, res) {
  PostDataProvider.findById(req.params.id, function(postWithId) {
    res.render('post', {
      title: 'Post',
      postWithId: postWithId
    });
  });
});

app.get('/userposts/:userId', function(req, res) {
  PostDataProvider.findByUserId(req.params.userId, function(userPosts) {
    res.render('userposts', {
      title: 'User Posts',
      userPosts: userPosts
    });
  });
});

mongooseAuth.helpExpress(app);

app.listen(port);