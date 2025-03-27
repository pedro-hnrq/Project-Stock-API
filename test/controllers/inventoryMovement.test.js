const inventoryMovementController = require('../../src/controllers/inventoryMovement');
const serviceInventoryMovement = require('../../src/services/inventoryMovement');

jest.mock('../../src/services/inventoryMovement');

describe('InventoryMovementController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            params: {},
            body: {},
            session: { id: 1 },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        jest.clearAllMocks();
    });

    describe('FindAll', () => {
        it('deve retornar todos os movimentos de inventário', async () => {
            const mockMovements = [{ id: 1, type: 'in', amount: 10 }, { id: 2, type: 'out', amount: 5 }];
            serviceInventoryMovement.FindAll.mockResolvedValue(mockMovements);
            req.params.inventoryId = 1;

            await inventoryMovementController.FindAll(req, res);

            expect(serviceInventoryMovement.FindAll).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockMovements);
        });

        it('deve lidar com erros e retornar status 500', async () => {
            const errorMessage = 'Erro de banco de dados';
            serviceInventoryMovement.FindAll.mockRejectedValue(new Error(errorMessage));
            req.params.inventoryId = 1;

            await inventoryMovementController.FindAll(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ msg: errorMessage });
        });
    });

    describe('FindById', () => {
        it('deve retornar um movimento de inventário específico', async () => {
            const mockMovement = { id: 1, type: 'in', amount: 10 };
            serviceInventoryMovement.FindById.mockResolvedValue(mockMovement);
            req.params.id = 1;
            req.params.inventoryId = 1;

            await inventoryMovementController.FindById(req, res);

            expect(serviceInventoryMovement.FindById).toHaveBeenCalledWith(1, 1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockMovement);
        });

        it('deve lidar com erros e retornar status 500', async () => {
            const errorMessage = 'Movimento de inventário não encontrado';
            serviceInventoryMovement.FindById.mockRejectedValue(new Error(errorMessage));
            req.params.id = 1;
            req.params.inventoryId = 1;

            await inventoryMovementController.FindById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ msg: errorMessage });
        });
    });

    describe('Create', () => {
        it('deve criar um novo movimento de inventário', async () => {
            const mockMovement = { id: 1, type: 'in', amount: 10, userId: 1, productId: 1 };
            serviceInventoryMovement.Create.mockResolvedValue(mockMovement);
            req.params.inventoryId = 1;
            req.body = { type: 'in', amount: 10, productId: 1 };

            await inventoryMovementController.Create(req, res);

            expect(serviceInventoryMovement.Create).toHaveBeenCalledWith(1, 1, 'in', 10, 1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockMovement);
        });

        it('deve lidar com erros e retornar status 500', async () => {
            const errorMessage = 'Entrada inválida';
            serviceInventoryMovement.Create.mockRejectedValue(new Error(errorMessage));
            req.params.inventoryId = 1;
            req.body = { type: 'in', amount: 10, productId: 1 };

            await inventoryMovementController.Create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ msg: errorMessage });
        });
    });

    describe('Update', () => {
        it('deve atualizar um movimento de inventário', async () => {
            const mockUpdatedMovement = { id: 1, type: 'out', amount: 5 };
            serviceInventoryMovement.Update.mockResolvedValue(mockUpdatedMovement);
            req.params.id = 1;
            req.params.inventoryId = 1;
            req.body = { type: 'out', amount: 5 };

            await inventoryMovementController.Update(req, res);

            expect(serviceInventoryMovement.Update).toHaveBeenCalledWith(1, 1, 'out', 5);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith(mockUpdatedMovement);
        });

        it('deve lidar com erros e retornar status 500', async () => {
            const errorMessage = 'Falha na atualização';
            serviceInventoryMovement.Update.mockRejectedValue(new Error(errorMessage));
            req.params.id = 1;
            req.params.inventoryId = 1;
            req.body = { type: 'out', amount: 5 };

            await inventoryMovementController.Update(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ msg: errorMessage });
        });
    });

    describe('Delete', () => {
        it('deve deletar um movimento de inventário', async () => {
            serviceInventoryMovement.Delete.mockResolvedValue();
            req.params.id = 1;
            req.params.inventoryId = 1;

            await inventoryMovementController.Delete(req, res);

            expect(serviceInventoryMovement.Delete).toHaveBeenCalledWith(1, 1);
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalledWith(undefined);
        });

        it('deve lidar com erros e retornar status 500', async () => {
            const errorMessage = 'Falha na exclusão';
            serviceInventoryMovement.Delete.mockRejectedValue(new Error(errorMessage));
            req.params.id = 1;
            req.params.inventoryId = 1;

            await inventoryMovementController.Delete(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ msg: errorMessage });
        });
    });
});