var util      = require('util'),
	everyauth = require('everyauth');

// Setup github and twitter authentication
var usersById = {};
var nextUserId = 0;

// Variables
var usersByLogin = {
	'sturoscy@gmail.com': addUser({ login: 'sturoscy@gmail.com', password: 'password'})
};

// This returns a user object from successful login available to views
// e.g. everyauth.github.user.name
function addUser (source, sourceUser) {
	var user;
	if (arguments.length === 1) { // password-based
		user = sourceUser = source;
		user.id = ++nextUserId;
		return usersById[nextUserId] = user;
	} else { // non-password-based
		user = usersById[++nextUserId] = {id: nextUserId};
		user[source] = sourceUser;
	}
	return user;
}

// Available to all modules
everyauth.everymodule
	.findUserById( function (id, callback) {
		callback(null, usersById[id]);
	});

// Username and password module
everyauth
	.password
	.loginWith('email')
	.getLoginPath('/login')
	.postLoginPath('/login')
	.loginView('login.jade')
//    .loginLocals({
//      title: 'Login'
//    })
//    .loginLocals(function (req, res) {
//      return {
//        title: 'Login'
//      }
//    })
	.loginLocals( function (req, res, done) {
		setTimeout( function () {
			done(null, {
				title: 'Async login'
			});
		}, 200);
	})
	.authenticate( function (login, password) {
		var errors = [];
		if (!login) errors.push('Missing login');
		if (!password) errors.push('Missing password');
		if (errors.length) return errors;
		var user = usersByLogin[login];
		if (!user) return ['Login failed'];
		if (user.password !== password) return ['Login failed'];
		return user;
	})

	.getRegisterPath('/register')
	.postRegisterPath('/register')
	.registerView('register.jade')
//    .registerLocals({
//      title: 'Register'
//    })
//    .registerLocals(function (req, res) {
//      return {
//        title: 'Sync Register'
//      }
//    })
	.registerLocals( function (req, res, done) {
		setTimeout( function () {
			done(null, {
				title: 'Async Register'
			});
		}, 200);
	})
	.validateRegistration( function (newUserAttrs, errors) {
		var login = newUserAttrs.login;
		if (usersByLogin[login]) errors.push('Login already taken');
		return errors;
	})
	.registerUser( function (newUserAttrs) {
		var login = newUserAttrs[this.loginKey()];
		return usersByLogin[login] = addUser(newUserAttrs);
	})

	.loginSuccessRedirect('/')
	.registerSuccessRedirect('/');