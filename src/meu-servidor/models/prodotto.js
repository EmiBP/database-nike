const mongoose = require('mongoose');

// Definir o esquema (schema) do produto com os campos adicionais
const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  categoria: { type: String, required: true },
  prezzo: { type: Number, required: true },
  taglie_disponibili: [{ type: String, required: true }],
  colori_disponibili: [{ type: String, required: true }],
  descrizione: { type: String, required: true },
  immagine: { type: String, required: true },
  nuovo_arrivi: { type: Boolean, required: true },
  best_seller: { type: Number, default: 0 }
});

const Prodotto = mongoose.model('Prodotto', produtoSchema);

module.exports = Prodotto;
