const  modelUser = require("../model/user")
const checkEmail = require('../utils/checkEmail')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const roles = ['admin', 'employee']
const salt = 12
const secretKey = "MyStrongSecret"

class serviceUser{
    async FindAll(organizationId, transaction) {
        return modelUser.findAll({where: {organizationId}, transaction})
    }

    async FindById(organizationId, id, transaction){
            return modelUser.findOne(
                { where: { organizationId, id }},
                { transaction }
            )
    }

    async Create(organizationId, name, email, password, role, transaction) {
        if(!organizationId) {
            throw new Error("OrganizationId is required")
        }else if (!name){
            throw new Error("Name is required")
        }else if (!email){
            throw new Error("Email is required")
        }else if (!password){
            throw new Error("Password is required")
        }else if(!role || !roles.includes(role)) {
            throw new Error("Role is required")
        }

        // Verificar se o e-mail já existe
        await checkEmail.userEmail(email, organizationId, transaction);

        const hashPass = await bcrypt.hash(password, salt)

        return modelUser.create(
            { organizationId, name, email, password: hashPass, role },
            { transaction }
        )

        
    }   

    async Update(organizationId, id, name, email, password, role, transaction) {
        const oldUser = await this.FindById(organizationId, id, transaction)
        if(!oldUser) {
            throw new Error("Usuário não encontrado")
        }

        if (email && email !== oldUser.email) {
            await checkEmail(email, organizationId, transaction)
        }
        
        if(role && !roles.includes(role)) {
            throw new Error("Favor informar a permissão corretamente")
        }

        if(role && oldUser.role === "admin") {
            oldUser.role = role
        }
        
        oldUser.name = name || oldUser.name
        oldUser.email = email || oldUser.email
        oldUser.password = password ? await bcrypt.hash(password, salt) : oldUser.password

        await oldUser.save({ transaction })

        return oldUser
    }

    async Delete(organizationId, id, transaction) {
        const oldUser = await this.FindById(organizationId, id, transaction)

        if(!oldUser) {
            throw new Error("Usuário não encontrado")
        }

        oldUser.destroy({ transaction })
    }

    async Login(email, password, transaction) {
        if (!email || !password) {
            throw new Error("Email and Password are required")
        }
        const user = await modelUser.findOne(
            { where: { email } },
            { transaction }
        )
        if (!user) {
            throw new Error("Invalid email and password")
        }

        const verify = await bcrypt.compare(password, user.password)

        if(verify) {
            return jwt.sign({
                id: user.id,
                role: user.role,
                organizationId: user.organizationId
            }, secretKey, { expiresIn: 60 * 60 } )
        }

        throw new Error("Invalid email and password")
    }

    async Verify(id, role, transaction) {
        return modelUser.findOne(
            { where: { id, role }, transaction }
        )
    }
}
module.exports = new serviceUser()
