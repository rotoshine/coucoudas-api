const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const PORT = process.env.PORT || 8888;
const startup = async () => {
  const connect = async function(){
    return mongoose.connect('mongodb://localhost/coucoudas', {
      useMongoClient: true
    });
  };

  await connect(); 
  require('./models/Cou');
  console.log('model loading complete.');

  
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  require('./api/cou')(app);
  console.log('api loading complete.');
  
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
  });

  app.listen(PORT);
  
  console.log(`server ${PORT} port listening.`);
};


startup();