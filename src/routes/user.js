const express = require('express');

const ApiUser = require('../controllers/user')

const authMiddleware = require('../middleware/auth')
const userRouter = express.Router();

// usuário normal
userRouter.get('/:info',authMiddleware(),ApiUser.FindById)
userRouter.put('/', authMiddleware(),ApiUser.Update)
userRouter.delete('/', authMiddleware(),ApiUser.Delete)

// usuário admin
userRouter.post('/', authMiddleware('admin'),ApiUser.Create)
userRouter.get('/',authMiddleware('admin'),ApiUser.FindAll)
userRouter.get('/:id',authMiddleware('admin'),ApiUser.FindById)
userRouter.put('/:id',authMiddleware('admin'),ApiUser.Update)
userRouter.delete('/:id',authMiddleware('admin'),ApiUser.Delete)


module.exports = userRouter;