const serviceInventoryMovement = require('../../src/services/inventoryMovement');
const modelInventoryMovement = require('../../src/model/inventoryMovement');
const modelProduct = require('../../src/model/product');

jest.mock('../../src/model/inventoryMovement');

describe('ServiceInventoryMovement', () => {
    const mockTransaction = {};
    const inventoryId = 1;
    const movementId = 1;
    const movementData = {
        userId: 1,
        type: 'in',
        amount: 10,
        productId: 1,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve encontrar todos os movimentos de inventário de um inventário', async () => {
        const mockMovements = [{ id: 1, ...movementData, product: { name: 'Product 1' } }, { id: 2, ...movementData, product: { name: 'Product 2' } }];
        modelInventoryMovement.findAll.mockResolvedValue(mockMovements);

        const movements = await serviceInventoryMovement.FindAll(inventoryId, mockTransaction);

        expect(movements).toEqual(mockMovements);
        expect(modelInventoryMovement.findAll).toHaveBeenCalledWith({ where: { inventoryId }, include: { model: modelProduct }, transaction: mockTransaction });
    });

    it('deve encontrar um movimento de inventário por ID e inventário', async () => {
        const mockMovement = { id: 1, ...movementData };
        modelInventoryMovement.findOne.mockResolvedValue(mockMovement);

        const movement = await serviceInventoryMovement.FindById(movementId, inventoryId, mockTransaction);

        expect(movement).toEqual(mockMovement);
        expect(modelInventoryMovement.findOne).toHaveBeenCalledWith({ where: { id: movementId, inventoryId } }, { transaction: mockTransaction });
    });

    it('deve criar um novo movimento de inventário', async () => {
        const mockMovement = { id: 1, ...movementData };
        modelInventoryMovement.create.mockResolvedValue(mockMovement);

        const movement = await serviceInventoryMovement.Create(movementData.userId, inventoryId, movementData.type, movementData.amount, movementData.productId, mockTransaction);

        expect(movement).toEqual(mockMovement);
        expect(modelInventoryMovement.create).toHaveBeenCalledWith({ ...movementData, inventoryId }, { transaction: mockTransaction });
    });

    it('deve atualizar um movimento de inventário', async () => {
        const mockMovement = {
            id: 1,
            ...movementData,
            save: jest.fn().mockResolvedValue({ id: 1, ...movementData, type: 'out', amount: 5 }),
        };
        modelInventoryMovement.findOne.mockResolvedValue(mockMovement);

        const updatedMovement = await serviceInventoryMovement.Update(inventoryId, movementId, 'out', 5, mockTransaction);

        expect(updatedMovement).toEqual({ id: 1, ...movementData, type: 'out', amount: 5 });
        expect(mockMovement.save).toHaveBeenCalled();
        expect(modelInventoryMovement.findOne).toHaveBeenCalled();
    });

    it('deve deletar um movimento de inventário', async () => {
        const mockMovement = { destroy: jest.fn().mockResolvedValue(true) };
        modelInventoryMovement.findOne.mockResolvedValue(mockMovement);

        await serviceInventoryMovement.Delete(movementId, inventoryId, mockTransaction);

        expect(mockMovement.destroy).toHaveBeenCalled();
        expect(modelInventoryMovement.findOne).toHaveBeenCalled();
    });
});