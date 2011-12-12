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

	github: {
		everyauth: {
			myHostname: 'http://local.host:3000',
			appId: '057051d9a1afc75fba6d',
			appSecret: 'ab560e867fa23c0b408ba7fdfc9bed77a9596c6c',
			redirectPath: '/login'
		}
	}
})

// Connect to mongodb
// mongoose.connect('mongodb://turoscys:Dsu022508*@dbh83.mongolab.com:27837/blog');

// Local dev
mongoose.connect('mongodb://localhost/deuce');
exports.User = mongoose.model('github-users', UserSchema);