const express = require('express');

const http = require('http');
const path = require('path');

const apiRouter = require('./routes/api.router');

const app = express();
const port = process.env.PORT || 3001;

app.use('/api', apiRouter);

app.use(express.static(path.join(__dirname, 'dist/personal-blog')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/personal-blog/index.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send(`Error occurred: ${err.message}`)
});

const server = http.createServer(app);

server.listen(port, () => console.log(`App running on: http://localhost:${port}`));
