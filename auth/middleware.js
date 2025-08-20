const strategies = require('./strategies');

module.exports = {

  // Middleware para API Key
   apiKey: (req, res, next) => {
    // Verifica todos os headers por chaves de API conhecidas
    for (const [key, value] of Object.entries(strategies.apiKeys)) {
      if (req.headers[key.toLowerCase()] === value) {
        return next();
      }
    }
    return res.status(401).json({ error: 'API Key inválida ou não fornecida' });
  },
  // Middleware para Basic Auth
basicAuth: (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.set('WWW-Authenticate', 'Basic realm="Área Restrita"');
    return res.status(401).json({ error: 'Autenticação necessária' });
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (!strategies.validateBasicAuth(username, password)) {
    res.set('WWW-Authenticate', 'Basic realm="Área Restrita"');
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Adicione esta linha para passar o usuário autenticado
  req.user = { username };
  next();
},

  // Middleware para Auth no Body
  bodyAuth: (req, res, next) => {
    const { username, password } = req.body;
    
    if (!username || !password || !strategies.validateBodyAuth({ username, password })) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    
    next();
  },

  bearerToken: (req, res, next) => {
  let token;
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Extrai o token do header (Bearer <token>)
  const parts = authHeader.split(' ');
  
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato do token inválido' });
  }

  token = parts[1];

  // Valida o token
  const decoded = strategies.validateBearerToken(token);
  if (!decoded) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }

  req.user = decoded;
  next();
},
};