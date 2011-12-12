var mongoose = require('mongoose');

var Schema   = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var UserSchema = new Schema({
	userName: 		 { type: String, index: { unique: true } },
	password: 		 String,
	salted_password: String, 
	firstName: 		 String,
	lastName: 		 String,
	email: 			 { type: String, validate: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/},
	date_created: 	 { type: Date, default: Date.now() },
	date_modified: 	 Date
});

var User = mongoose.model('users', UserSchema);

UserDataProvider = function(){};

//Find all Posts
UserDataProvider.prototype.findAll = function(callback) {
	User.find({}, function(err, users) {
		if (err) {
			callback(err);
		} else {
			callback(users);
		}
	});
};

exports.UserDataProvider = UserDataProvider;