const express = require('express');

const ApiOrganization = require('../controllers/organization')
const authMiddleware = require('../middleware/auth')

/**
 * @swagger
 * tags:
 *   name: Organizations
 *   description: Gestão de organizações
 */
const organizationRouter = express.Router();

/**
 * @swagger
 * /organization/{id}:
 *   get:
 *     summary: Obter organização por ID
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da organização
 *     responses:
 *       200:
 *         description: Organização encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organização não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
organizationRouter.get('/:id', authMiddleware('admin'), ApiOrganization.FindById);

/**
 * @swagger
 * /organization:
 *   post:
 *     summary: Criar nova organização e usuário administrador
 *     tags: [Organizations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: Organização criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
organizationRouter.post('', ApiOrganization.Create);

/**
 * @swagger
 * /organization/{id}:
 *   put:
 *     summary: Atualizar organização
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da organização
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: Organização atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Organization'
 *       404:
 *         description: Organização não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
organizationRouter.put('/:id', authMiddleware('admin'), ApiOrganization.Update);

/**
 * @swagger
 * /organization/{id}:
 *   delete:
 *     summary: Excluir organização
 *     tags: [Organizations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da organização
 *     responses:
 *       204:
 *         description: Organização excluída com sucesso
 *       404:
 *         description: Organização não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
organizationRouter.delete('/:id', authMiddleware('admin'), ApiOrganization.Delete);

module.exports = organizationRouter;