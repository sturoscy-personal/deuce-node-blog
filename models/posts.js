var mongoose = require('mongoose'),
	moment 	 = require('moment');

var Schema   = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var Comments = new Schema({
	authorUserName	: String,
	body			: String,
	date 			: { type: Date, default: Date.now() },
	formattedDate	: String
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
	formatted_date	: String,
	last_modified 	: Date
});

var Post = mongoose.model('posts', PostSchema);

var PostDataProvider = function(){};

//Post Objects
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
		Post.findById(id, function(err, post) {
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
	// Post
	addPost: function(postObject) {
		console.log(postObject);
	},
	// Comments
	addComment: function(commentObject, postID) {
		var commentAuthorEmail 	= commentObject.email,
			commentComment 		= commentObject.comment;

		Post.findById(postID, function(err, post) {
			if (!err) {
				var now       = moment(Date.now()),
					formatNow = now.format('dddd, MMMM Do YYYY, h:mm:ss a');

				post.comments.push({ authorUserName: commentAuthorEmail, body: commentComment, formattedDate: formatNow });
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