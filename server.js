const mongo = require('mongodb');
const TextDB = mongo.MongoClient;

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
const dbUrl = require('./lib/tokens.js').mongoUrl;

app.use(express.static(__dirname + '/public_html'));
app.use(bodyParser.json());
app.listen(process.env.PORT || 8080);
content = {
	url: 'https://www.google.com',
	title: 'hui-alohaavafvasd',
	text: 'HEHEHEEHEHE'
};
//addUser('unicorn');
//addDocument(content, 'unicorn');
//getDocument(content, 'unicorn');
editDocument(content, 'unicorn');
app.post('/api/newUser', function (req, res) {
	const user = req.body.username;
	console.log(req);
	try {
		addUser(user)
	} catch (e) {
		console.log(e);
	}
});

app.post('/api/createDocument', function (req, res) {
	const user = req.body.username;
	const content = {
		title: req.body.title,
		text: req.body.text
	};
	console.log(req);
	try {
		addDocument(content, user);
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify({
			message: 'Saved new document'
		}));
	} catch (e) {
		console.log(e);
	}
});

function addUser(userName) {
	TextDB.connect(dbUrl, function (err, database) {
		if (err) return console.log(err);
		const db = database.db('heroku_kr6hcn1d');
		db.createCollection(userName, function (err, res) {
			if (err) return console.log(err);
			console.log("Created new collection for user " + userName);
			database.close();
		});
	});
}

function addDocument(content, username) {
	TextDB.connect(dbUrl, function (err, database) {
		if (err) return console.log(err);
		var infoToAdd = {url: content.url, title: content.title, text: content.text};
		const db = database.db('heroku_kr6hcn1d');
		db.collection(username).insertOne(infoToAdd, function (err, res) {
			if (err) return console.log(err);
			console.log("1 document inserted");
			console.log(res);
			database.close();
		});
	});
}


function editDocument(content, username) {
	TextDB.connect(dbUrl, function (err, database) {
		if (err) return console.log(err);
		var infoToAdd = {url: content.url, title: content.title, text: content.text};
		const db = database.db('heroku_kr6hcn1d');
		db.collection(username).updateOne({url: infoToAdd.url}, {
			$set: {
				title: infoToAdd.title,
				text: infoToAdd.text
			}
		}, function (err, res) {
			if (err) return console.log(err);
			console.log(res.modifiedCount + " documents edited of", res.matchedCount);
			database.close();
		});
	});
}

function getDocument(content, username) {
	TextDB.connect(dbUrl, function (err, database) {
		if (err) return console.log(err);
		const db = database.db('heroku_kr6hcn1d');
		db.collection(username).findOne({title: content.title}, function (err, result) {
			if (err) return console.log(err);
			try {
				console.log(result.content);
			} catch (e) {
				console.log(e, result);
			}
			//TODO: some kind of res.end
			database.close();
		})
	});
}
