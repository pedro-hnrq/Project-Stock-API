const express = require('express');
const ApiInventoryMovement = require('../controllers/inventoryMovement');
const authMiddleware = require('../middleware/auth');

/**
 * @swagger
 * tags:
 *   name: Inventory Movements
 *   description: Gestão de movimentações de estoque
 */

const InventoryMovementRouter = express.Router();

/**
 * @swagger
 * /inventory/{inventoryId}/movement:
 *   get:
 *     summary: Listar movimentações do estoque
 *     tags: [Inventory Movements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Lista de movimentações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryMovement'
 */
InventoryMovementRouter.get('/:inventoryId/', authMiddleware(), ApiInventoryMovement.FindAll)

/**
 * @swagger
 * /inventory/{inventoryId}/movement/{id}:
 *   get:
 *     summary: Obter movimentação específica
 *     tags: [Inventory Movements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Dados da movimentação
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryMovement'
 */
InventoryMovementRouter.get('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.FindById)

/**
 * @swagger
 * /inventory/{inventoryId}/movement:
 *   post:
 *     summary: Registrar nova movimentação
 *     tags: [Inventory Movements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InventoryMovement'
 *     responses:
 *       201:
 *         description: Movimentação registrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryMovement'
 */
InventoryMovementRouter.post('/:inventoryId/', authMiddleware(), ApiInventoryMovement.Create)

/**
 * @swagger
 * /inventory/{inventoryId}/movement/{id}:
 *   put:
 *     summary: Atualizar movimentação
 *     tags: [Inventory Movements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: integer
 *         required: true
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
 *             $ref: '#/components/schemas/InventoryMovement'
 *     responses:
 *       200:
 *         description: Movimentação atualizada
 */
InventoryMovementRouter.put('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.Update)

/**
 * @swagger
 * /inventory/{inventoryId}/movement/{id}:
 *   delete:
 *     summary: Excluir movimentação
 *     tags: [Inventory Movements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: inventoryId
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Movimentação excluída
 */
InventoryMovementRouter.delete('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.Delete)

module.exports = InventoryMovementRouter;