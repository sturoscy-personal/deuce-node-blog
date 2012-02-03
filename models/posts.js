var mongoose = require('mongoose');

var Schema   = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Comments = new Schema({
	authorUserName	: String,
	body			: String,
	date 			: { type: Date, default: Date.now() }
});
	
var PostSchema = new Schema({
	authorUserName	: String,
	authorRealName	: String,
	title			: String,
	body			: String,
	categories 		: [String],
	tags			: [String],
	comments		: [Comments],
	date_created	: { type: Date, default: Date.now() },
	last_modified 	: Date
});

var Post = mongoose.model('posts', PostSchema);

var PostDataProvider = function(){};

//Find all Posts
PostDataProvider.prototype = {
	findAll: function(callback) {
		Post.find({}, function(err, posts) {
			if (err) {
				callback(err);
			} else {
				callback(posts);
			}
		});
	},
	findById: function(id, callback) {
		Post.findOne({'_id': id}, function(err, post) {
			if (err) {
				callback(err);
			} else {
				callback(post);	
			}
		});
	},
	findByUserId: function(userId, callback) {
		Post.find({'authorUserName': userId}, function(err, posts) {
			if (err) {
				callback(err);
			} else {
				callback(posts);
			}
		});
	},
	// Comments
	addComment: function(commentObject, postID) {
		var commentAuthorEmail 	= commentObject.email
			commentComment 		= commentObject.comment;

		Post.findById(postID, function(err, post) {
			if (!err) { 
				post.comments.push({ authorUserName: commentAuthorEmail, body: commentComment });
				post.save(function (err) {
					if (err) { 
						console.log(err); 
					} else {
						console.log("Saved!");
					}
				});
			} else {
				console.log(err);
			}
		});
	}
};

exports.PostDataProvider = PostDataProvider;