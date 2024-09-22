const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Prodotto = require('../models/prodotto'); // Importa o modelo de Produto
require('dotenv').config(); // Para carregar variáveis de ambiente

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json()); // Para parsear JSON

// Rota POST para adicionar um novo produto
app.post('/prodotti', async (req, res) => {
  const prodotto = new Prodotto({
    nome: req.body.nome,
    categoria: req.body.categoria,
    prezzo: req.body.prezzo,
    taglie_disponibili: req.body.taglie_disponibili,
    colori_disponibili: req.body.colori_disponibili,
    descrizione: req.body.descrizione,
    immagine: req.body.immagine,
    nuovo_arrivi: req.body.nuovo_arrivi,
    best_seller: req.body.best_seller
  });

  try {
    const nuovoProdotto = await prodotto.save(); // Salvar no MongoDB
    res.status(201).json(nuovoProdotto); // Retornar o novo produto
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota PUT para atualizar um produto por ID
app.put('/prodotti/:id', async (req, res) => {
  try {
    const prodottoAggiornato = await Prodotto.findByIdAndUpdate(
      req.params.id,
      {
        nome: req.body.nome,
        categoria: req.body.categoria,
        prezzo: req.body.prezzo,
        taglie_disponibili: req.body.taglie_disponibili,
        colori_disponibili: req.body.colori_disponibili,
        descrizione: req.body.descrizione,
        immagine: req.body.immagine,
        nuovo_arrivi: req.body.nuovo_arrivi,
        best_seller: req.body.best_seller
      },
      { new: true } // Retornar o produto atualizado
    );
    if (prodottoAggiornato) {
      res.status(200).json(prodottoAggiornato); // Produto atualizado
    } else {
      res.status(404).json({ message: 'Prodotto non trovato' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
