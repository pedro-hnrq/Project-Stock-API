const inventoryController = require('../../src/controllers/inventory');
const serviceInventory = require('../../src/services/inventory');

jest.mock('../../src/services/inventory');

describe('InventoryController', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { session: {}, params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('deve encontrar todos os inventários', async () => {
        const mockInventories = [{ id: 1, name: 'Inventory 1' }, { id: 2, name: 'Inventory 2' }];
        serviceInventory.FindAll.mockResolvedValue(mockInventories);
        mockReq.session.organizationId = 1;

        await inventoryController.FindAll(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(mockInventories);
    });

    it('deve encontrar um inventário por ID', async () => {
        const mockInventory = { id: 1, name: 'Test Inventory' };
        serviceInventory.FindById.mockResolvedValue(mockInventory);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await inventoryController.FindById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(mockInventory);
    });

    it('deve criar um novo inventário', async () => {
        const mockInventory = { id: 1, name: 'Test Inventory' };
        serviceInventory.Create.mockResolvedValue(mockInventory);
        mockReq.session.organizationId = 1;
        mockReq.body = { name: 'Test Inventory' };

        await inventoryController.Create(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.send).toHaveBeenCalledWith(mockInventory);
    });

    it('deve atualizar um inventário', async () => {
        const mockInventory = { id: 1, name: 'Updated Inventory' };
        serviceInventory.Update.mockResolvedValue(mockInventory);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;
        mockReq.body = { name: 'Updated Inventory' };

        await inventoryController.Update(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(mockInventory);
    });

    it('deve deletar um inventário', async () => {
        serviceInventory.Delete.mockResolvedValue(true);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await inventoryController.Delete(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.send).toHaveBeenCalledWith(true);
    });

    it('deve lidar com erros ao encontrar inventários', async () => {
        const mockError = new Error('Inventories not found');
        serviceInventory.FindAll.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;

        await inventoryController.FindAll(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Inventories not found' });
    });

    it('deve lidar com erros ao encontrar um inventário por ID', async () => {
        const mockError = new Error('Inventory not found');
        serviceInventory.FindById.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await inventoryController.FindById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Inventory not found' });
    });

    it('deve lidar com erros ao criar um inventário', async () => {
        const mockError = new Error('Inventory creation failed');
        serviceInventory.Create.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.body = { name: 'Test Inventory' };

        await inventoryController.Create(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Inventory creation failed' });
    });

    it('deve lidar com erros ao atualizar um inventário', async () => {
        const mockError = new Error('Inventory update failed');
        serviceInventory.Update.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;
        mockReq.body = { name: 'Updated Inventory' };

        await inventoryController.Update(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Inventory update failed' });
    });

    it('deve lidar com erros ao deletar um inventário', async () => {
        const mockError = new Error('Inventory deletion failed');
        serviceInventory.Delete.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await inventoryController.Delete(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Inventory deletion failed' });
    });
});