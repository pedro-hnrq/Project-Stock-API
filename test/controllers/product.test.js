const productController = require('../../src/controllers/product');
const serviceProduct = require('../../src/services/product');

jest.mock('../../src/services/product');

describe('ProductController', () => {
    let mockReq, mockRes;

    beforeEach(() => {
        mockReq = { session: {}, params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        jest.clearAllMocks();
    });

    it('deve encontrar todos os produtos', async () => {
        const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
        serviceProduct.FindAll.mockResolvedValue(mockProducts);
        mockReq.session.organizationId = 1;

        await productController.FindAll(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({ products: mockProducts });
    });

    it('deve encontrar um produto por ID', async () => {
        const mockProduct = { id: 1, name: 'Test Product' };
        serviceProduct.FindById.mockResolvedValue(mockProduct);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await productController.FindById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith(mockProduct);
    });

    it('deve criar um novo produto', async () => {
        const mockProduct = { id: 1, name: 'Test Product' };
        serviceProduct.Create.mockResolvedValue(mockProduct);
        mockReq.session.organizationId = 1;
        mockReq.body = { name: 'Test Product', description: 'Test Description' };

        await productController.Create(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.send).toHaveBeenCalledWith({ product: mockProduct });
    });

    it('deve atualizar um produto', async () => {
        const mockProduct = { id: 1, name: 'Updated Product' };
        serviceProduct.Update.mockResolvedValue(mockProduct);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;
        mockReq.body = { name: 'Updated Product', description: 'Updated Description' };

        await productController.Update(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({ product: mockProduct });
    });

    it('deve deletar um produto', async () => {
        serviceProduct.Delete.mockResolvedValue(true);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await productController.Delete(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.send).toHaveBeenCalledWith({ product: true });
    });

    it('deve lidar com erros ao encontrar produtos', async () => {
        const mockError = new Error('Products not found');
        serviceProduct.FindAll.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;

        await productController.FindAll(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Products not found' });
    });

    it('deve lidar com erros ao encontrar um produto por ID', async () => {
        const mockError = new Error('Product not found');
        serviceProduct.FindById.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await productController.FindById(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Product not found' });
    });

    it('deve lidar com erros ao criar um produto', async () => {
        const mockError = new Error('Product creation failed');
        serviceProduct.Create.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.body = { name: 'Test Product', description: 'Test Description' };

        await productController.Create(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Product creation failed' });
    });

    it('deve lidar com erros ao atualizar um produto', async () => {
        const mockError = new Error('Product update failed');
        serviceProduct.Update.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;
        mockReq.body = { name: 'Updated Product', description: 'Updated Description' };

        await productController.Update(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Product update failed' });
    });

    it('deve lidar com erros ao deletar um produto', async () => {
        const mockError = new Error('Product deletion failed');
        serviceProduct.Delete.mockRejectedValue(mockError);
        mockReq.session.organizationId = 1;
        mockReq.params.id = 1;

        await productController.Delete(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Product deletion failed' });
    });
});