const modelInventoryMovement = require("../model/inventoryMovement")
const product = require("../model/product")

const movementType = ['out', 'in'] 

class serviceInventoryMovement{
    async FindAll(inventoryId, transaction) {
        return modelInventoryMovement.findAll(
            {where: {inventoryId}, include: { model: product },
            transaction})
    }

    async FindById(id, inventoryId, transaction){
            return modelInventoryMovement.findOne(
                { where: { id, inventoryId }},
                { transaction }
            )
    }

    async Create(userId, inventoryId, type, amount, productId, transaction){
        
        if (!inventoryId) {
            throw new Error("InventoryId is required")
        } else if (!type || !movementType.includes(type)){
            throw new Error("Type is required")
        } else if (!amount ) {
            throw new Error("Amount is required")
        } else if(!productId) {
            throw new Error("product is required")
        } else if (!userId){
            throw new Error("UserId is required")
        }
        
        
        return modelInventoryMovement.create(
            { userId, inventoryId, type, amount, productId},
            { transaction }
        )
    }

    async Update(inventoryId, id, type, amount, transaction){
        const oldInventoryMovement = await this.FindById(id, inventoryId, transaction)
        
        if (!oldInventoryMovement){
            throw new Error("Inventory not found")
        } 
        if (type && !movementType.includes(type)){
            throw new Error("Type is invalid")
        }

        oldInventoryMovement.type = type || oldInventoryMovement.type
        oldInventoryMovement.amount = amount || oldInventoryMovement.amount

        return oldInventoryMovement.save({ transaction })
    }

    async Delete(id, inventoryId, transaction){
        const oldInventoryMovement = await this.FindById(id, inventoryId, transaction)

        if (!oldInventoryMovement){
            throw new Error("Inventory not found")
        } 

        await oldInventoryMovement.destroy({ transaction })
    }
}

module.exports = new serviceInventoryMovement()