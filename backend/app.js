const path = require ('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const clienteRoutes = require ('./rotas/clientes');
app.use(bodyParser.json());
app.use('/image', express.static(path.join("backend/image")));

mongoose.connect('mongodb+srv://ricardo:141626@cluster0.ka2ga.mongodb.net/app-cliente?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conexão OK")
    }).catch((e) => {
        console.log(e)
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');

    next();
});

app.use ('/api/clientes', clienteRoutes);

module.exports = app;