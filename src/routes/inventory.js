const express = require('express');
const ApiInventory = require('../controllers/inventory');
const authMiddleware = require('../middleware/auth')

const InventoryRouter = express.Router();


InventoryRouter.get('/', authMiddleware(), ApiInventory.FindAll)
InventoryRouter.get('/:id', authMiddleware(), ApiInventory.FindById)
InventoryRouter.post('', authMiddleware(), ApiInventory.Create)
InventoryRouter.put('/:id', authMiddleware(), ApiInventory.Update)
InventoryRouter.delete('/:id', authMiddleware(), ApiInventory.Delete)

module.exports = InventoryRouter;