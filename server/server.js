const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db');
const apiRouter = require('./routes/api.router');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, '..', '/dist/personal-blog')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/dist/personal-blog/index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error occurred: ${err.message}`)
});

app.listen(port, () => console.log(`App running on: http://localhost:${port}`));

db.setupConnection();
