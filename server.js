// Server for Heroku

//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/jauc-admin'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/jauc-admin/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
