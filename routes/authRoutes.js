const express = require('express');
const authMiddleware = require('../auth/middleware');
const strategies = require('../auth/strategies')

const router = express.Router();

// Dados mockados
const mockUsersData = [
  {
    personalInfo: {
      id: "5f8d04b3ab35b3b3a8f7e3c1",
      cpf: "123.456.789-00",
      nome: "João da Silva",
      idade: 35,
      dataNascimento: "1988-05-15",
      possuiCarro: true,
      veiculos: [
        {
          modelo: "Fiat Uno",
          ano: 2015,
          placa: "ABC1D23",
          seguro: {
            seguradora: "Porto Seguro",
            vigencia: "2023-12-31",
            coberturas: ["colisão", "roubo", "terceiros"]
          }
        }
      ],
      filhos: [
        { nome: "Maria", idade: 8, escolaridade: "Fundamental I" },
        { nome: "Pedro", idade: 5, escolaridade: "Educação Infantil" }
      ],
      endereco: {
        logradouro: "Rua das Flores",
        numero: 123,
        complemento: "Apto 101",
        cep: "12345-678",
        cidade: "São Paulo",
        estado: "SP",
        coordenadas: {
          lat: -23.5505,
          lng: -46.6333
        }
      },
      contatos: {
        telefones: [
          { tipo: "celular", numero: "(11) 98765-4321", whatsapp: true },
          { tipo: "residencial", numero: "(11) 1234-5678", whatsapp: false }
        ],
        emails: [
          "joao.silva@example.com",
          "joao.silva.trabalho@example.com"
        ]
      },
      historico: {
        empregos: [
          {
            empresa: "Tech Solutions",
            cargo: "Desenvolvedor",
            periodo: "2015-2020",
            tecnologias: ["Java", "Spring Boot", "Angular"]
          }
        ]
      }
    },
    metadata: {
      dataCriacao: "2020-10-20T14:30:00Z",
      ultimoAcesso: "2023-06-15T09:15:33Z"
    }
  },
  {
    personalInfo: {
      id: "6g9e15c4bc46c4c4b9g8f4d2",
      cpf: "987.654.321-00",
      nome: "Maria Oliveira",
      idade: 28,
      dataNascimento: "1995-11-22",
      possuiCarro: false,
      filhos: [],
      endereco: {
        logradouro: "Avenida Brasil",
        numero: 1500,
        cep: "54321-876",
        cidade: "Rio de Janeiro",
        estado: "RJ"
      },
      contatos: {
        telefones: [
          { tipo: "celular", numero: "(21) 99876-5432", whatsapp: true }
        ],
        emails: [
          "maria.oliveira@example.com"
        ]
      },
      historico: {
        empregos: [
          {
            empresa: "Data Analytics Co",
            cargo: "Cientista de Dados",
            periodo: "2020-presente",
            tecnologias: ["Python", "SQL", "Machine Learning"]
          }
        ]
      }
    },
    metadata: {
      dataCriacao: "2021-03-15T10:20:00Z",
      ultimoAcesso: "2023-06-14T16:45:12Z"
    }
  },
  {
    personalInfo: {
      id: "7h0f26d5cd57d5d5c0h9g5e3",
      cpf: "456.789.123-00",
      nome: "Carlos Souza",
      idade: 42,
      dataNascimento: "1981-03-30",
      possuiCarro: true,
      veiculos: [
        {
          modelo: "Volkswagen Golf",
          ano: 2019,
          placa: "DEF4G56"
        },
        {
          modelo: "Toyota Corolla",
          ano: 2022,
          placa: "GHI7J89"
        }
      ],
      filhos: [
        { nome: "Luiza", idade: 12 },
        { nome: "Felipe", idade: 10 },
        { nome: "Ana", idade: 6 }
      ],
      endereco: {
        logradouro: "Rua das Palmeiras",
        numero: 55,
        cep: "98765-432",
        cidade: "Belo Horizonte",
        estado: "MG"
      }
    },
    metadata: {
      dataCriacao: "2019-07-10T08:45:00Z",
      ultimoAcesso: "2023-06-13T11:30:45Z"
    }
  },
  {
    personalInfo: {
      id: "8i1g37e6de68e6e6d1i0h6f4",
      cpf: "789.123.456-00",
      nome: "Ana Santos",
      idade: 31,
      dataNascimento: "1992-08-17",
      possuiCarro: false,
      filhos: [
        { nome: "Rafael", idade: 3 }
      ],
      endereco: {
        logradouro: "Rua dos Pinheiros",
        numero: 33,
        complemento: "Bloco B, Apto 302",
        cep: "45678-901",
        cidade: "Curitiba",
        estado: "PR"
      },
      contatos: {
        telefones: [
          { tipo: "celular", numero: "(41) 98765-1234", whatsapp: true },
          { tipo: "comercial", numero: "(41) 3333-4444", whatsapp: false }
        ]
      }
    },
    metadata: {
      dataCriacao: "2022-01-05T13:15:00Z",
      ultimoAcesso: "2023-06-15T14:20:30Z"
    }
  }
];
const mockDataEasy = 
  {
    name: "Paulo Ricardo",
    age: 22,
    address: {
      street: "Capão redondo",
      number: 11
    },
    single: true,
    salary: 1652.23
  }


// Rota sem autenticação
// router.get('/no-auth', (req, res) => {
//   setTimeout(() => {
// res.json({
//     status: "success",
//     message: "Dados públicos",
//     data: {
//         users: mockUsersData,
//       pagination: {
//         total: mockUsersData.length,
//         limit: 10,
//         offset: 0
//       },
//       info: "Esta é uma resposta pública sem autenticação",
//       exemploSimples: {
//         valor: 42,
//         descricao: "Resposta de exemplo"
//       }
//     }
//   });
//   },10902192)
// });

router.get('/no-auth', (req, res) => {
res.json({
    data: mockDataEasy
  });
});

// Rota com Bearer Token
router.get('/bearer-token', authMiddleware.bearerToken, (req, res) => {
  res.json({
    status: "success",
    message: "Dados protegidos por Bearer Token",
    data: {
      users: mockUsersData,
      pagination: {
        total: mockUsersData.length,
        limit: 10,
        offset: 0
      },
      authInfo: {
        tipo: "Bearer Token",
        scope: ["leitura", "perfil"]
      }
    }
  });
});

// Rota com API Key
router.get('/api-key', authMiddleware.apiKey, (req, res) => {
  res.json({
    status: "success",
    message: "Dados protegidos por API Key",
    data: {
      users: mockUsersData,
      pagination: {
        total: mockUsersData.length,
        limit: 10,
        offset: 0
      },
 
      authInfo: {
        tipo: "API Key",
        permissoes: ["consulta", "relatorios"]
      },
      adicional: {
        assinatura: "Premium",
        validade: "2023-12-31"
      }
    }
  });
});

// Rota com Basic Auth
router.get('/basic-auth', authMiddleware.basicAuth, (req, res) => {
  res.json({
    status: "success",
    message: "Dados protegidos por Basic Auth",
    data: {
     users: mockUsersData,
      pagination: {
        total: mockUsersData.length,
        limit: 10,
        offset: 0
      },
      authInfo: {
        tipo: "Basic Auth",
        usuario: req.auth.user, // Adicionado pelo middleware
        roles: ["user", "admin"]
      },
      configuracoes: {
        tema: "escuro",
        notificacoes: true
      }
    }
  });
});

// Rota com Auth Body
router.post('/auth-body', authMiddleware.bodyAuth, (req, res) => {
  res.json({
    status: "success",
    message: "Dados protegidos por autenticação via Body",
    data: {
      users: mockUsersData,
      pagination: {
        total: mockUsersData.length,
        limit: 10,
        offset: 0
      },
      authInfo: {
        tipo: "Body Auth",
        metodo: "POST",
        camposRequeridos: ["username", "password"]
      },
      transacoes: [
        {
          id: "txn_123",
          valor: 150.75,
          data: "2023-06-10",
          descricao: "Compra Supermercado"
        },
        {
          id: "txn_456",
          valor: 89.90,
          data: "2023-06-12",
          descricao: "Assinatura Streaming"
        }
      ]
    }
  });
});

// Novo endpoint para gerar token
router.post('/generate-token', authMiddleware.basicAuth, (req, res) => {
  // Agora usando req.user em vez de req.auth.user
  const token = strategies.generateBearerToken(req.user.username);
  
  res.json({
    status: "success",
    message: "Token gerado com sucesso",
    data: {
      token,
      token_type: "Bearer",
      expires_in: "3600",
      scope: "profile data"
    }
  });
});

// Modifique o endpoint existente para exigir Bearer Token
router.get('/protected-data', authMiddleware.bearerToken, (req, res) => {
  res.json({
    status: "success",
    message: "Dados protegidos acessados com sucesso",
    data: {
      ...mockDataEasy,
      user: req.user,
      sensitiveData: {
        accountNumber: "123456789",
        balance: 12500.75,
        lastLogin: "2023-06-15T14:25:00Z"
      }
    }
  });
});

module.exports = router;
