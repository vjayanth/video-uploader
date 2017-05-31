const express = require('express');
const app = express();
var path = require('path');

// Run the app by serving the static files

app.use('/public', express.static(path.join(__dirname + '/public')));
// Start the app by listening on the default
// Heroku port
app.get('/', function(req, res) {
res.sendFile(path.join(__dirname, '/index.html'));
});
app.listen(process.env.PORT || 8080);