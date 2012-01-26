Deuce's Blog
============

This is a blogging and user management application written in [node.js](http://www.nodejs.org).  Please feel free to download and use the code as you see fit.  This is still a work in progress and is not completely finished.  I am working on the coding as I have the time.

User Management
---------------

The code uses mongo-auth for user registration/login/logout.  User data is saved to a remote mongoDB (NoSQL) database.  I did not include the connection information for the database (for obvious reasons), so you will have to add a mongoDB connection to the `models` folder called `mongo-conn.js`.  Currently, this application supports login with github, twitter, and username/password (upon registration).

Usage
-----

* Clone the repo
* Install dependencies with `npm install -d`
* Run the app using `node app.js`

The above is assuming you have node.js and npm installed.  Good luck and have fun!