const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Token não fornecido ou formato inválido' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário ao objeto `req`
    next(); // Continua para o próximo middleware ou rota
  } catch (err) {
    console.error('Erro ao verificar token:', err.message);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = authenticateJWT;