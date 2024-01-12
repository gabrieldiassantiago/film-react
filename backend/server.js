// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const config = require('./config/config');
const authRoutes = require('./routes/authroutes');
const cors = require('cors')

dotenv.config();

const app = express();
const PORT = 3001;

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

  app.use(bodyParser.json());

  app.use(cors());


app.use('/api/', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
