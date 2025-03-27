const serviceProduct = require('../../src/services/product');
const modelProduct = require('../../src/model/product');

jest.mock('../../src/model/product');

describe('ServiceProduct', () => {
  const mockTransaction = {};
  const organizationId = 1;
  const productId = 1;
  const productData = {
    name: 'Test Product',
    description: 'Test Description',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve encontrar todos os produtos de uma organização', async () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    modelProduct.findAll.mockResolvedValue(mockProducts);

    const products = await serviceProduct.FindAll(organizationId, mockTransaction);

    expect(products).toEqual(mockProducts);
    expect(modelProduct.findAll).toHaveBeenCalledWith({ where: { organizationId } }, { transaction: mockTransaction });
  });

  it('deve encontrar um produto por ID e organização', async () => {
    const mockProduct = { id: 1, ...productData };
    modelProduct.findOne.mockResolvedValue(mockProduct);

    const product = await serviceProduct.FindById(organizationId, productId, mockTransaction);

    expect(product).toEqual(mockProduct);
    expect(modelProduct.findOne).toHaveBeenCalledWith({ where: { organizationId, id: productId } }, { transaction: mockTransaction });
  });

  it('deve criar um novo produto', async () => {
    const mockProduct = { id: 1, ...productData };
    modelProduct.create.mockResolvedValue(mockProduct);

    const product = await serviceProduct.Create(organizationId, productData.name, productData.description, mockTransaction);

    expect(product).toEqual(mockProduct);
    expect(modelProduct.create).toHaveBeenCalledWith({ organizationId, name: productData.name, description: productData.description }, { transaction: mockTransaction });
  });

  it('deve atualizar um produto', async () => {
    const mockProduct = {
      id: 1,
      ...productData,
      save: jest.fn().mockResolvedValue({ id: 1, ...productData, name: 'Updated Name' }),
    };
    modelProduct.findOne.mockResolvedValue(mockProduct);

    const updatedProduct = await serviceProduct.Update(organizationId, productId, 'Updated Name', productData.description, mockTransaction);

    expect(updatedProduct).toEqual({ id: 1, ...productData, name: 'Updated Name' });
    expect(mockProduct.save).toHaveBeenCalled();
    expect(modelProduct.findOne).toHaveBeenCalled();
  });

  it('deve deletar um produto', async () => {
    const mockProduct = { destroy: jest.fn().mockResolvedValue(true) };
    modelProduct.findOne.mockResolvedValue(mockProduct);

    await serviceProduct.Delete(organizationId, productId, mockTransaction);

    expect(mockProduct.destroy).toHaveBeenCalled();
    expect(modelProduct.findOne).toHaveBeenCalled();
  });
});