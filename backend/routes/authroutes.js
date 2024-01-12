const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');
const authMiddleware = require('../middleware/authMiddleware'); // Importe seu middleware de autenticação

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ password, email });

    if (user) {
      const token = jwt.sign({ 
        username: user.username,
        email: user.email,
      }, config.jwtSecret, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/user-data', authMiddleware, async (req, res) => {
  try {
    const userData = { username: req.user.username, 
      email: req.user.email };
    res.json(userData);
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já registrado.' });
    }

    const newUser = new User({ username, password, email });

    await newUser.save();

    const token = jwt.sign({ username: newUser.username }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;
