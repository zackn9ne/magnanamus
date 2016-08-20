const express = require('express');
const app = express();

app.listen(3000, function() {
  console.log('listening on 3000')
})

app.get('/', function (req, res) {
  // do something here
  res.send('Hello World')
  res.sendFile(__dirname + '/index.html', { title: 'Magness Design' });

})