const mongo = require('mongodb');
const TextDB = mongo.MongoClient;

const express = require('express');
const app = express();

var bodyParser = require('body-parser');
const dbUrl = require('./lib/tokens.js').mongoUrl;

app.use(express.static(__dirname + '/public_html'));
app.use(bodyParser.json());
app.listen(process.env.PORT || 8081);


app.post('/api/newUser', function (req, res) {
	const user = req.body.username;
	console.log(req);
	try {
		addUser(user)
	} catch (e) {
		console.log(e);
	}
});


content = {
	title: "Test Document",
	text: "Bacon ipsum dolor amet bresaola pancetta jerky tongue, ham prosciutto flank landjaeger swine pig chuck venison alcatra. Fatback kielbasa pastrami biltong, landjaeger corned beef jerky ham frankfurter meatloaf tail. Corned beef ham hock alcatra, jerky chicken spare ribs beef ribs brisket tenderloin. Doner shoulder frankfurter prosciutto porchetta pork belly. Sirloin beef spare ribs capicola, short ribs tail cupim.\n" +
	"\n" +
	"Frankfurter sirloin filet mignon doner t-bone ham hock. Bresaola andouille pork belly, frankfurter brisket shankle short loin porchetta doner turducken salami cupim spare ribs. Pork chop pig ball tip, tri-tip ham sirloin fatback salami frankfurter shoulder sausage burgdoggen. Sirloin salami ham hock t-bone. Filet mignon salami porchetta bresaola short ribs. Cupim ham hock pork loin, chuck filet mignon jerky strip steak tenderloin ribeye.\n" +
	"\n" +
	"Hamburger drumstick pork loin ground round buffalo cupim burgdoggen shankle frankfurter. Meatball tenderloin biltong buffalo ham hock rump. Capicola tenderloin shoulder burgdoggen t-bone meatball landjaeger. Leberkas shoulder andouille strip steak. Capicola pork loin filet mignon rump kevin pork chop pancetta burgdoggen cow pig swine. Jerky kielbasa spare ribs pork loin."
};

function addUser(userName) {
	TextDB.connect(dbUrl, function (err, database) {
		if (err) return console.log(err);
		const db = database.db('heroku_kr6hcn1d');
		db.createCollection(userName, function (err, res) {
			if (err) return console.log(err);;
			console.log("Created new collection for user " + userName);
			database.close();
		});
	});
}

function addDocument(content, username) {
	TextDB.connect(dbUrl, function (err, database) {
		if (err) return console.log(err);
		var infoToAdd = {title: content.title, content: content.text};
		const db = database.db('heroku_kr6hcn1d');
		db.collection(username).insertOne(infoToAdd, function (err, res) {
			if (err) return console.log(err);
			console.log("1 document inserted");
			database.close();
		});
	});
}

function getDocument(contentTitle, username) {
	TextDB.connect(dbUrl, function (err, database) {
		if (err) return console.log(err);
		const db = database.db('heroku_kr6hcn1d');
		db.collection(username).findOne({title: contentTitle}, function (err, result) {
			if (err) return console.log(err);
			console.log(result.content);
			//TODO: some kind of res.end
			database.close();
		})
	});
}
