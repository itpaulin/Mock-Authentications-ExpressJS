
const jwt = require('jsonwebtoken')
require('dotenv').config();
module.exports = {
  // Dados de teste
   apiKeys: {
    'x-api-key': 'test-api-key-123',
    'authorization-key': 'another-api-key-456'
  },
  bearerTokens: new Set(['test-bearer-token-789', 'another-bearer-token-012']),
  users: [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'password123' }
  ],

  // Validações
  validateApiKey: function(key, value) {
    return this.apiKeys[key] === value;
  },

  validateBearerToken: function(token) {
     try {
        return jwt.verify(
          token, 
          'botafogo_campeao',
          { ignoreExpiration: false } // Garante que verifica a expiração
        );
      } catch (err) {
        console.error('Erro na validação do token:', err.message);
        return false;
      }
  },

  validateBasicAuth: function(username, password) {
    return this.users.some(user => 
      user.username === username && user.password === password
    );
  },

  validateBodyAuth: function(credentials) {
    return this.validateBasicAuth(credentials.username, credentials.password);
  },

  generateBearerToken: function(username) {
    return jwt.sign(
      { username },
      'botafogo_campeao',
      {expiresIn: '1h'}
    )
  },
    validateBearerToken: function(token) {
    try {
      return jwt.verify(token, 'botafogo_campeao');
    } catch (err) {
      return false;
    }
  }
};