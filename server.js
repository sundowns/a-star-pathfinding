var path = require('path');
var express = require('express');

var app = express();

const port = 3000;

var staticPath = path.join(__dirname, '/app');
app.use(express.static(staticPath));

app.listen(port, function() {
  console.log(`listening on ${port}`);
});