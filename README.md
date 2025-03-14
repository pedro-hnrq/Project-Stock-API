# Project Stock API

### 🚀 Como executar 

#### 💻 Pré-requisitos

Antes de começar, verifique se atendeu aos seguintes requisitos:

- Node.JS
- GIT 
- MySQL
- Docker
- Docker Compose
- Postman(opcional)


#### 🛠️ Instalação

🦑 Faça o clone do projeto:

```
git clone git@github.com:pedro-hnrq/Project-Stock-API.git
```  

Após clonar o repositório acesse o diretório
```
cd Project-Car-API
``` 

#### 🎟️ NPM

Instalar as dependências
```javascript
npm install
```

Na primeira vez é necessário entrar no arquivo `index.js` para no database.db de `false` para `true`, assim aplicando as migrações do banco de dados, depois retorne para false.

```javascript
.sync({ force: true })
```
```javascript
.sync({ force: false })
```

Execute o projeto
```javascript
npm run dev
```

#### 🧭 APIs

 🏢 Organization Endpoints
 
 | **Método**   | **Endpoint** | **Descrição** |  **Autenticação** | **Conta**
|------------|-----------|------------------|------------------|-----------------|
|  GET | `/api/v1/organization/:id/`   | Obtenha detalhes individuais da organização   |  SIM | Administrador |
| POST     | `/api/v1/organization/`   | Criar novo organização e usuário administrador |  NÃO | Qualquer usuário | 
|  PUT | `/api/v1/organization/:id/`   | Atualizar registro completo    | SIM  | Administrador |
| DELETE     | `/api/v1/organization/:id/`   | Deleta registro | SIM  | Administrador |

 🚻 User Endpoints
 
 | **Método**   | **Endpoint** | **Descrição** |  **Autenticação** | **Conta**
|------------|-----------|------------------|------------------|-----------------|
| GET       |  `/api/v1/user/` | Lista todos os colaboradores criados    |  SIM  | Administrador
|  GET | `/api/v1/user/:id/`   | Obtenha detalhes individuais   |  SIM | Administrador |
|  GET | `/api/v1/user/info/`   | Obtenha detalhes individuais do Colaborador  |  SIM | Colaborador |
| POST     | `/api/v1/user/`   | Criar novo cadastro calaborador ou administrador |  SIM |  Administador | 
| POST     | `/api/v1/login/`   | Realizar login |  NÃO |  Administador/Colaborador | 
|  PUT | `/api/v1/user/:id/`   | Atualizar registro completo  | SIM  | Administrador |
|  PUT | `/api/v1/user/`   | Atualizar registro completo do colaborador  | SIM  | Colaborador |
| DELETE     | `/api/v1/user/:id/`   | Deleta registro | SIM  | Administrador |
| DELETE     | `/api/v1/user/`   | Deleta registro do colaborador | SIM  | Colaborador |

 🧿 Product Endpoints
 
 | **Método**   | **Endpoint** | **Descrição** |  **Autenticação** | **Conta**
|------------|-----------|------------------|------------------|-----------------|
| GET       |  `/api/v1/product/` | Lista todos os produtos    |  SIM  | Administrador/Colaborador 
|  GET | `/api/v1/product/:id/`   | Obtenha detalhes individuais  |  SIM | Administrador/Colaborador  |
| POST     | `/api/v1/product/`   | Criar novo produto |  NÃO| Administrador/Colaborador  | 
|  PUT | `/api/v1/product/:id/`   | Atualizar registro completo   | SIM  | Administrador/Colaborador  |
| DELETE     | `/api/v1/product/:id/`   | Deleta registro | SIM  | Administrador/Colaborador  |

🕋  Inventory Endpoints
 
 | **Método**   | **Endpoint** | **Descrição** |  **Autenticação** | **Conta**
|------------|-----------|------------------|------------------|-----------------|
| GET       |  `/api/v1/inventory/` | Lista todos os inventário    |  SIM  | Administrador/Colaborador 
|  GET | `/api/v1/inventory/:id/`   | Obtenha detalhes do inventário especidico   |  SIM | Administrador/Colaborador  |
| POST     | `/api/v1/inventory/`   | Criar novo inventário|  SIM | Administrador/Colaborador  | 
|  PUT | `/api/v1/inventory/:id/`   | Atualizar registro completo   | SIM  | Administrador/Colaborador  |
| DELETE     | `/api/v1/inventory/:id/`   | Deleta registro | SIM  | Administrador/Colaborador  |

 🎢 InventoryMovement Endpoints
 
 | **Método**   | **Endpoint** | **Descrição** |  **Autenticação** | **Conta**
|------------|-----------|------------------|------------------|-----------------|
| GET       |  `/api/v1/inventoryMovement/` | Lista todos as movimentações do inventário    |  SIM  | Administrador/Colaborador
|  GET | `/api/v1/inventoryMovement/:id/`   | Obtenha detalhes individuais da movimentação do inventário  |  SIM | Administrador/Colaborador |
| POST     | `/api/v1/inventoryMovement/`   | Adicionar o tipo e quantidade |  SIM | Administrador/Colaborador  | 
|  PUT | `/api/v1/inventoryMovement/:id/`   | Atualizar registro completo   | SIM  | Administrador/Colaborador |
| DELETE     | `/api/v1/inventoryMovement/:id/`   | Deleta registro | SIM  | Administrador/Colaborador |


👨🏻‍🚀 Postman

Navegue até o diretório `Postman` para obter a coleção Postman, dentro do Postman no Import adicione a coleção `Estoque.postman_collection.json`. 

Estrutura da coleção:
```
Estoque
├── Organizetion
│   ├── findById
│   ├── Create
│   ├── Update
│   └── Delete
├── User
│   ├── findAll
│   ├── finById
│   ├── Create
│   ├── Login
│   ├── Update
│   ├── UpdateMyself
│   ├── Delete
│   ├── DeleteMyself
├── Product
│   ├── findAll
│   ├── finById
│   ├── Create
│   ├── Update
│   ├── Delete
├── Invetory
│   ├── findAll
│   ├── finById
│   ├── Create
│   ├── Update
│   ├── Delete
└── InvetoryMovement
    ├── findAll
    ├── finById
    ├── Create
    ├── Update
    └── Delete

```