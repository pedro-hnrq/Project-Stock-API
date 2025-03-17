const serviceUser = require("../services/user")

class UserController {
    async FindAll (req, res){
        try{
            const organizationId = req.session.organizationId
            const users = await serviceUser.FindAll(organizationId)
            res.status(200).send(users)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async FindById (req, res){
        try {
            const {id, organizationId} = req.session
            const user = await serviceUser.FindById(organizationId, id)

            res.status(200).send({ user })
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async Create (req, res){
        try{
            const organizationId = req.session.organizationId
            const { name, email, password, role } = req.body
            const user = await serviceUser.Create(organizationId, name, email, password, role)

            res.status(201).send({ user })
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async Update (req, res){
        try{
            const organizationId = req.session.organizationId
            const id = req.params.id || req.session.id
            const { name, email, password, role } = req.body
            const user = await serviceUser.Update(organizationId, id, name, email, password, role)

            res.status(200).send({ user })
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }        
    }

    async Delete (req, res){
        try{
            const organizationId = req.session.organizationId
            const id = req.params.id || req.session.id
            const user = await serviceUser.Delete(organizationId, id)

            res.status(204).send({ user })
        } catch (error) {
            res.status(500).send({msg: error.message})
        }
    }

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Autenticação de usuário (Administrador ou Colaborador)
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Credenciais inválidas
 */
    async Login (req, res){
        try{
            const { email, password } = req.body
            const token = await serviceUser.Login(email, password)
            res.status(200).send({ token })
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
}
module.exports = new UserController()