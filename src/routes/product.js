const express = require('express');
const ApiProoduct = require('../controllers/product');
const authMiddleware = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gestão de produtos
 */

const productRouter = express.Router();

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Listar todos os produtos
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       401:
 *         description: Não autorizado
 *         $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.get('/', authMiddleware(), ApiProoduct.FindAll)

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Obter produto por ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Dados do produto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *         $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.get('/:id', authMiddleware(), ApiProoduct.FindById)

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Criar novo produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Dados inválidos
 *         $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.post('', authMiddleware(), ApiProoduct.Create)

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Atualizar produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Produto atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Produto não encontrado
 *         $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.put('/:id', authMiddleware(), ApiProoduct.Update)

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Excluir produto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do produto
 *     responses:
 *       204:
 *         description: Produto excluído com sucesso
 *       404:
 *         description: Produto não encontrado
 *         $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.delete('/:id', authMiddleware(), ApiProoduct.Delete)

module.exports = productRouter;