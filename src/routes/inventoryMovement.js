const express = require('express');
const ApiInventoryMovement = require('../controllers/inventoryMovement');
const authMiddleware = require('../middleware/auth');

const InventoryMovementRouter = express.Router();

InventoryMovementRouter.get('/:inventoryId/', authMiddleware(), ApiInventoryMovement.FindAll)
InventoryMovementRouter.get('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.FindById)
InventoryMovementRouter.post('/:inventoryId/', authMiddleware(), ApiInventoryMovement.Create)
InventoryMovementRouter.put('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.Update)
InventoryMovementRouter.delete('/:inventoryId/:id', authMiddleware(), ApiInventoryMovement.Delete)

module.exports = InventoryMovementRouter;