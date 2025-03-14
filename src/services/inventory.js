const modelInventory = require("../model/inventory")
const inventoryMovement = require("./inventoryMovement")
const getProductMovements = require("../fns/get-product-movements")

class serviceInventory{
    async FindAll(organizationId, transaction) {
        return modelInventory.findAll({where: {organizationId}, transaction})
    }

    async FindById(organizationId, id, transaction){
        const inventory = await modelInventory.findOne(
            { where: { organizationId, id }},
            { transaction }
        )

        if (!inventory){
            throw new Error("Inventory stock not found")
        }
        
        const movements = await inventoryMovement.FindAll(inventory.id)

        const result = getProductMovements(movements)

        return { ...inventory.dataValues, ...result }
    }

    async Create(organizationId, name, transaction){
        if (!organizationId){
            throw new Error("OrganizationId is required")
        } else if (!name){
            throw new Error("Name is required")
        }

        return modelInventory.create(
            { organizationId, name },
            { transaction }
        )
    }

    async Update(organizationId, id, name, transaction){
        const oldInventory = await modelInventory.findOne(
            { where: { organizationId, id }},
            { transaction }
        )
        
        if (!oldInventory){
            throw new Error("Inventory not found")
        } 

        oldInventory.name = name || oldInventory.name

        return oldInventory.save({ transaction })
    }

    async Delete(organizationId, id, transaction){
        const oldInventory = await modelInventory.findOne(
            { where: { organizationId, id }},
            { transaction }
        )

        if (!oldInventory){
            throw new Error("Inventory not found")
        } 

        await oldInventory.destroy({ transaction })
    }
}

module.exports = new serviceInventory()