
const express = require('express');
const app = express();
const path = require('path');

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.port || 9000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});