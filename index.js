var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/src/assets'));

// views is directory for all template files
app.set('views', __dirname + '/src');
//app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('src/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
