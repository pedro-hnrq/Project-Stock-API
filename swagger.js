const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project Stock API',
      version: '1.0.0',
      description: 'Documentação da API de gerenciamento de estoque.',
    //   contact: {
    //     name: "Suporte",
    //     email: "suporte@stockapi.com"
    //   }
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Servidor Local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        Organization: {
          type: 'object',
          required: ['name', 'email'],
          properties: {
            id: {
              type: 'integer',
              readOnly: true
            },
            name: {
              type: 'string',
              example: 'Empresa XYZ'
            },
            address: {
              type: 'string',
              example: 'Rua Principal, 123'
            },
            phone: {
              type: 'string',
              example: '5575-1234'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'contato@empresa.com'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              readOnly: true
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              readOnly: true
            }
          }
        },
        User: {
            type: 'object',
            required: ['name', 'email', 'password'],
            properties: {
              id: {
                type: 'integer',
                readOnly: true
              },
              name: {
                type: 'string',
                example: 'João Silva'
              },
              email: {
                type: 'string',
                format: 'email',
                example: 'joao@empresa.com'
              },
              password: {
                type: 'string',
                format: 'password',
                example: 'senhaSegura123'
              },
              role: {
                type: 'string',
                enum: ['admin', 'employee'],
                default: 'employee'
              },
              organizationId: {
                type: 'integer',
                readOnly: true
              }
            }
          },
        Login: {
            type: 'object',
            required: ['email', 'password'],
            properties: {
                email: {
                type: 'string',
                format: 'email'
                },
                password: {
                type: 'string',
                format: 'password'
                }
            }
        },
        Product: {
            type: 'object',
            required: ['name'],
            properties: {
              id: {
                type: 'integer',
                readOnly: true
              },
              name: {
                type: 'string',
                example: 'Notebook Dell'
              },
              description: {
                type: 'string',
                example: '15 polegadas, 8GB RAM, SSD 256GB'
              },
              organizationId: {
                type: 'integer',
                readOnly: true
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                readOnly: true
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                readOnly: true
              }
            }
        },
        Inventory: {
            type: 'object',
            required: ['name'],
            properties: {
              id: {
                type: 'integer',
                readOnly: true
              },
              name: {
                type: 'string',
                example: 'Estoque Principal'
              },
              organizationId: {
                type: 'integer',
                readOnly: true
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                readOnly: true
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                readOnly: true
              }
            }
          },
          InventoryMovement: {
            type: 'object',
            required: ['type', 'amount', 'productId'],
            properties: {
              id: {
                type: 'integer',
                readOnly: true
              },
              type: {
                type: 'string',
                enum: ['entry', 'exit'],
                example: 'entry'
              },
              amount: {
                type: 'integer',
                example: 100
              },
              productId: {
                type: 'integer',
                example: 1
              },
              inventoryId: {
                type: 'integer',
                readOnly: true
              },
              userId: {
                type: 'integer',
                readOnly: true
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                readOnly: true
              }
            }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: 'Mensagem de erro detalhada'
            }
          }
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(specs, {
    customSiteTitle: "Stock API Docs",
    customCss: '.swagger-ui .topbar { display: none }'
  }));
};