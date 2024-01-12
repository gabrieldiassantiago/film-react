const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  console.log('Incoming Request Headers:', req.headers);
  console.log('Token:', token);

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      console.error('Erro ao verificar o token:', err.message);
      return res.status(401).json({ error: 'Token de autenticação inválido' });
    }

    req.user = decoded;
    console.log('Decoded Token:', decoded); // Log the decoded token

    next();
  });
};
