# Project Stock API

### 🚀 Como executar 

#### 💻 Pré-requisitos

Antes de começar, verifique se atendeu aos seguintes requisitos:

- JavaScript
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
cd Project-Stock-API
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


🧩 Swagger

O swagger oferece documentação interativa através:

- Swagger: `http://localhost:3000/api/swagger`

_Dica_: No Swagger, você pode simplesmente colar o token no campo "Authorize" sem precisar adicionar "Bearer" antes.

👨🏻‍🚀 Postman

Navegue até o diretório `Postman` para obter a coleção Postman, dentro do Postman no Import adicione a coleção `Estoque.postman_collection.json`. 

Quando gerar o Token recomenda-se colocar na pasta (Organizetion, User, Product, Inventory e InventoryMovement) na parte do Authorization na parte Auth Type = Bearer Token no campo Token.

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

#### 🐋 DOCKER

Configurando o .env:
1. Configurar, no diretório `src/db/database.js`para rodar o banco de dados MySQL integrado com o Projeto:
   - Altere a variável `host` de localhost para `db_stock`.
   
2. Iniciando os Contêineres:
    ```bash
    docker compose up --build
    ```
    - Já está executando o projeto. Poderá rodar o projeto em: http://localhost:3000/api/swagger

3. Parando os Contêineres:
    ```bash
    docker compose down
    ```

4. Iniciando o contêiner do banco de dados:
    ```bash
    docker compose up -d db_stock
    ```

5. Inciando o contêiner do projeto:
    ```bash
    docker compose up -d project_stock
    ```
    O contêiner do projeto só executar se o contêiner do banco de dados estiver em execução.

6. Logs no contreiner do projeto:
    ```bash
    docker compose logs project_stock
    ```
    
7. Outros comandos opcionais:
    - Se necessário realizar o Build novamente, para criação do banco de dados no index.js, alterando de false para true:
    ```
    .sync({ force: true })
    ```
    ```bash
    docker compose up -d --build
    ```