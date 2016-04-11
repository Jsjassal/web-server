var PORT = 3000;

var express = require('express');
var app = express();

var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('Private route hit');
		next();
	},
	logger: function (req, res, next) {
		console.log('Request on ' + new Date().toString() + ' : ' + req.method + ' ' + req.originalUrl);
		next();
	}
}

app.use(middleware.logger);

app.get('/', middleware.requireAuthentication, function (req, res) {
	res.send('Hello Express');
});

app.get('/about', function (req, res) {
	res.send('This is new website page');
});

app.use(express.static(__dirname + '/public'));

app.listen(PORT, function () {
	console.log('Express server started at Port: ' + PORT);
});