const serviceInventoryMovement = require("../services/inventoryMovement")

class InventoryMovementController {
    async FindAll (req, res){
        try{
            const {inventoryId} = req.params
            const inventoryMovements = await serviceInventoryMovement.FindAll(inventoryId)
            res.status(200).send(inventoryMovements)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async FindById (req, res){
        try{
            const {id, inventoryId} =req.params
            const invetoryMovement = await serviceInventoryMovement.FindById(id, inventoryId)
            res.status(200).send(invetoryMovement)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async Create (req, res){
        try{
            const {inventoryId} = req.params
            const {type, amount, productId} = req.body
            const userId = req.session.id
            const invetoryMovement = await serviceInventoryMovement.Create(
                userId, inventoryId, type, amount, productId)
            res.status(200).send(invetoryMovement)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
    async Update (req, res){
        try{
            const {id, inventoryId} = req.params
            const {type, amount} = req.body
            const userId = req.session.id
            const invetoryMovement = await serviceInventoryMovement.Update(
                inventoryId, id, type, amount)
            res.status(200).send(invetoryMovement)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }        
    }
    async Delete (req, res){
        try{
            const {id, inventoryId} = req.params
            const invetoryMovement = await serviceInventoryMovement.Delete(id, inventoryId)
            res.status(204).send(invetoryMovement)
        }
        catch(error){
            res.status(500).send({msg: error.message})
        }
    }
}
module.exports = new InventoryMovementController()