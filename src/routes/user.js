const express = require('express');

const ApiUser = require('../controllers/user')

const authMiddleware = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestão de usuários
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Autenticação de usuários
 */

const userRouter = express.Router();

// Rotas Employee
/**
 * @swagger
 * /user/{info}:
 *   get:
 *     summary: Obter informações do usuário logado (Colaborador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: info
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário ou 'me' para informações do próprio usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
userRouter.get('/:info', authMiddleware(), ApiUser.FindById)

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Atualizar dados do próprio usuário (Colaborador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
userRouter.put('/', authMiddleware(), ApiUser.Update)

/**
 * @swagger
 * /user:
 *   delete:
 *     summary: Excluir conta do próprio usuário (Colaborador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Usuário excluído
 */
userRouter.delete('/', authMiddleware(), ApiUser.Delete)

// Rotas Admin
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Criar novo usuário (Administrador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
userRouter.post('/', authMiddleware('admin'), ApiUser.Create)

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Listar todos os usuários (Administrador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get('/', authMiddleware('admin'), ApiUser.FindAll)

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obter usuário por ID (Administrador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Dados do usuário
 */
userRouter.get('/:id', authMiddleware('admin'), ApiUser.FindById)

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Atualizar usuário específico (Administrador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
userRouter.put('/:id', authMiddleware('admin'), ApiUser.Update)

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Excluir usuário específico (Administrador)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Usuário excluído
 */
userRouter.delete('/:id', authMiddleware('admin'), ApiUser.Delete)

module.exports = userRouter;