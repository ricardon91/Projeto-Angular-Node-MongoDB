const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cliente = require('./models/cliente');
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ricardo:141626@cluster0.ka2ga.mongodb.net/app-cliente?retryWrites=true&w=majority')
    .then(() => {
        console.log("Conexão OK")
    }).catch((e) => {
        console.log(e)
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');

    next();
});

app.post('/api/clientes', (req, res, next) => {
    const cliente = new Cliente({
        nome: req.body.nome,
        fone: req.body.fone,
        email: req.body.email
    });
    cliente.save();
    console.log(cliente);
    res.status(201).json({ mensagem: 'Cliente inserido' })
});

app.get('/api/clientes', (req, res, next) => {
    Cliente.find().then(documents => {
        res.status(200).json({
            mensagem: "Tudo OK",
            clientes: documents
        });
    })
});

module.exports = app;