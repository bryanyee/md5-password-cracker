const express = require('express');
const path = require('path');
const App = express();

//serving static files
App.use('/', express.static(path.join(__dirname, '../', 'client')));




App.listen(3000, () => {
  console.log("Connected!!!!");
});