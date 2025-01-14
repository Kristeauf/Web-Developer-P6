const express = require('express')
const app = express()
const mongoose = require('mongoose');
const saucesRoutes = require('./routes/sauces')
const userRoutes = require('./routes/user');
const path = require('path');
const bodyParser = require('body-Parser');
require('dotenv').config()

let yourUserName = process.env.YOUR_USER_NAME
let yourSecretCode = process.env.USERPASS
let yourCluster = process.env.CLUSTER
mongoose.connect(`mongodb+srv://${yourUserName}:${yourSecretCode}@${yourCluster}.mongodb.net/cluster0?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
   app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', userRoutes);
  app.use(bodyParser.json())
  app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app
