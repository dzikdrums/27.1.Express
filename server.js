const express = require('express');
const multer  = require('multer')
const path = require('path');
const hbs = require('express-handlebars');
const app = express();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.engine('hbs', hbs());
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '/public')));
app.use(express.urlencoded({ extended: false }));

app.post('/contact/send-message', upload.single('file'), (req, res) => {
  
  const { author, sender, title, message} = req.body;
  const { originalname } = req.file;

  if(author && sender && title && message && originalname) {
    res.render('contact', { isSent: true, filename: originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});