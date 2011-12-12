var mongoose = require('mongoose');

var Schema   = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var PostSchema = new Schema({
	authorUserName	: String,
	authorRealName	: String,
	title			: String,
	body			: String,
	categories 		: [String],
	tags			: [String],
	comments		: [String],
	date_created	: { type: Date, default: Date.now() },
	last_modified 	: Date
});

var Post = mongoose.model('posts', PostSchema);

PostDataProvider = function(){};

//Find all Posts
PostDataProvider.prototype.findAll = function(callback) {
	Post.find({}, function(err, posts) {
		if (err) {
			callback(err);
		} else {
			callback(posts);
		}
	});
};

PostDataProvider.prototype.findById = function(id, callback) {
	Post.findOne({'_id': id}, function(err, post) {
		if (err) {
			callback(err);
		} else {
			callback(post);	
		}
	});
};

exports.PostDataProvider = PostDataProvider;