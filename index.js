var express = require('express'),
  app = express();

// index
app.use(express.static('./public'));
app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: '.'
  });
});

var server = app.listen(9090, function () {
  var host = server.address().address,
      port = server.address().port;

  console.log('App is up and running on http://%s:%s', host, port);
});
