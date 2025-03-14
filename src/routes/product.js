const express = require('express');
const ApiProoduct = require('../controllers/product');
const authMiddleware = require('../middleware/auth')

const productRouter = express.Router();

productRouter.get('/', authMiddleware(), ApiProoduct.FindAll)
productRouter.get('/:id', authMiddleware(), ApiProoduct.FindById)
productRouter.post('', authMiddleware(), ApiProoduct.Create)
productRouter.put('/:id', authMiddleware(), ApiProoduct.Update)
productRouter.delete('/:id', authMiddleware(), ApiProoduct.Delete)

module.exports = productRouter;