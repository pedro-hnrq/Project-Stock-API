const serviceOrganization = require("../services/organization")

function handleError(res, error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).send({ msg: error.message });
}

class OrganizationController {
    async FindById (req, res){
        try{
            const {id} =req.params
            const organization =  await serviceOrganization.FindById(id)
            res.status(200).send(organization)
        }
        catch(error){
            handleError(res, error);
        }
    }
    async Create (req, res){
        try{
            const { name, address, phone, email } = req.body
            const organization = await serviceOrganization.Create(name, address, phone, email)

            res.status(200).send({ organization })
        }
        catch(error){
            handleError(res, error);
        }
    }
    async Update (req, res){
        try{
            const { id } = req.params
            const { name, address, phone, email } = req.body
            const organization = await serviceOrganization.Update(id, name, address, phone, email)

            res.status(200).send({ organization })
        }
        catch(error){
            handleError(res, error);
        }        
    }
    async Delete (req, res){
        try{
            
            const {id} = req.params
            const organization = await serviceOrganization.Delete(id)
            res.status(204).send(organization)
        }
        catch(error){
            handleError(res, error);
        }
    }
}
module.exports = new OrganizationController()