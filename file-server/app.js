'use strict';

const express = require('express');
var fs = require('fs');

let app = express();

app.get('/', (req, res) => {
  const files = fs.readdirSync('../src/components/');
  let mappedFiles = '';

  files.map((file) => {
    mappedFiles += `<li><a href="files/${file}">${file}</a></li>`;
  });

  res.set('Content-Type', 'text/html');
  res.send(mappedFiles);
});

app.use('/files', express.static('../src/components/'));

app.listen(3030, () => {
  console.log('Am\'e app files listening on port 3030!')
});
