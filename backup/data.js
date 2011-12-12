var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var CommentSchema = new Schema({
	email: String,
	body: String
});

var PostSchema = new Schema({
	title: String,
	body: String,
	date: {type: Date, default: Date.now},
	state: {type: String, enum: ['draft', 'published', 'private'], default: 'draft'},
	author: {
		name: String,
		email: {type: String, validate: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/}
	},
	comments: [CommentSchema]
});

mongoose.connect('mongodb://turoscys:Dsu022508*@dbh83.mongolab.com:27837/blog');
mongoose.model('Post', PostSchema);

var Post = mongoose.model('Post');
var post = new Post();
post.title = 'My first blog post';
post.body  = 'Hello, world!';
post.author.name = 'Steve', 
post.author.email = 'sturoscy@gmail.com';
post.comments.push({email: 's_turoscy@yahoo.com', body: 'My first comment.'});

post.save(function(error) {
	if (error) { throw error; }
	console.log('saved');
});