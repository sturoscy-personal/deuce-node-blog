var mongoose     = require('mongoose'),
    mongooseAuth = require('mongoose-auth');

// Github user schema
var Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var UserSchema = new Schema({}),
    User;

UserSchema.plugin(mongooseAuth, {
  everymodule: {
    everyauth: {
      User: function() {
        return User;
      }
    }
  },

  twitter: {
    everyauth: {
      myHostname: 'http://local.host:3000',
      consumerKey: 'nRXegDklkkbY5OOFnmThag',
      consumerSecret: '4Ndh9WosIwKN6glDWLMUwBdsFyy3E4kZp6THrPurg',
      redirectPath: '/login'
    }
  }
})

// Connect to mongodb
// mongoose.connect('mongodb://turoscys:Dsu022508*@dbh83.mongolab.com:27837/blog');

// Local dev
mongoose.connect('mongodb://localhost/deuce');
exports.User = mongoose.model('twitter-users', UserSchema);