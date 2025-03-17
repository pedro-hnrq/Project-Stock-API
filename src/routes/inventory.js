const express = require('express');
const ApiInventory = require('../controllers/inventory');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Inventories
 *   description: Gestão de estoques
 */

const InventoryRouter = express.Router();

/**
 * @swagger
 * /inventory:
 *   get:
 *     summary: Listar todos os estoques
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estoques
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventory'
 */
InventoryRouter.get('/', authMiddleware(), ApiInventory.FindAll)

/**
 * @swagger
 * /inventory/{id}:
 *   get:
 *     summary: Obter estoque por ID
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Dados do estoque
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
InventoryRouter.get('/:id', authMiddleware(), ApiInventory.FindById)

/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Criar novo estoque
 *     tags: [Inventories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       201:
 *         description: Estoque criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventory'
 */
InventoryRouter.post('', authMiddleware(), ApiInventory.Create)

/**
 * @swagger
 * /inventory/{id}:
 *   put:
 *     summary: Atualizar estoque
 *     tags: [Inventories]
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
 *             $ref: '#/components/schemas/Inventory'
 *     responses:
 *       200:
 *         description: Estoque atualizado
 */
InventoryRouter.put('/:id', authMiddleware(), ApiInventory.Update)

/**
 * @swagger
 * /inventory/{id}:
 *   delete:
 *     summary: Excluir estoque
 *     tags: [Inventories]
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
 *         description: Estoque excluído
 */
InventoryRouter.delete('/:id', authMiddleware(), ApiInventory.Delete)

module.exports = InventoryRouter;