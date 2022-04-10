const path = require('path')
const express = require('express');
const app = express();

const PORT = 3000;
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, 'index.html')

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('test', (req, res) => {
  console.log(1);
  return 'qweqweqwe';
})

// app.use(express.static(DIST_DIR))
//
// app.get('*', (req, res) => {
//   res.sendFile(HTML_FILE)
// })




app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
