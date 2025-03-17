// Middleware/auth.js
const jwt = require('jsonwebtoken')
const user = require('../services/user')

const secretKey = "MyStrongSecret"

function authMiddleware(role) {
    return (req, res, next) => {
        const token = req.headers['authorization']

        if(!token) {
           res.status(400).json({ msg: 'Token inválido ou não fornecido' })
           return
        }

        jwt.verify(token.split(' ')[1], secretKey, async (err, decoded) => {
            if(err) {
                res.status(400).json({ msg: 'Token inválido ou não fornecido' })
                return
            }

            // console.log("Token decodificado:", decoded);

            const verify = await user.Verify(decoded.id, decoded.role)
            if(!verify || (role && !role.includes(decoded.role))){
                res.status(401).json({ msg: 'Permissão negada - Sem permissão' })
                return
            }

            req.session = decoded
            next()
        })
    }
}

module.exports = authMiddleware