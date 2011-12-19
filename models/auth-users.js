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
      myHostname: 'http://deuce.herokuapp.com',
      consumerKey: 'nRXegDklkkbY5OOFnmThag',
      consumerSecret: '4Ndh9WosIwKN6glDWLMUwBdsFyy3E4kZp6THrPurg',
      redirectPath: '/login'
    }
  },

  github: {
    everyauth: {
      myHostname: 'http://deuce.herokuapp.com',
      appId: '057051d9a1afc75fba6d',
      appSecret: 'ab560e867fa23c0b408ba7fdfc9bed77a9596c6c',
      redirectPath: '/login'
    }
  },

  password: {
    loginWith: 'email',
      extraParams: {
        name: {
          first: String,
          last: String
        }
      },
      
    everyauth: {
      getLoginPath: '/login',
      postLoginPath: '/login',
      loginView: 'login.jade',
      getRegisterPath: '/register',
      postRegisterPath: '/register',
      registerView: 'register.jade',
      loginSuccessRedirect: '/',
      registerSuccessRedirect: '/',
      loginLocals: {
        title: 'Login'
      },
      registerLocals: {
        title: 'Register'
      }
    }
  }
})

// Create the user
User = mongoose.model('auth-users', UserSchema);