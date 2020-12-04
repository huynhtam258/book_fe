const express = require('express');
const app = express();
const path = require('path');

// app.use(express.static(__dirname + './dist/project'));
app.use(express.static('./dist/project'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '/dist/project/index.html'));
});
app.listen(process.env.PORT || 8080);

console.log('Listening');
