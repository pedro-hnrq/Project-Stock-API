const organizationController = require('../../src/controllers/organization');
const serviceOrganization = require('../../src/services/organization');

jest.mock('../../src/services/organization');

describe('OrganizationController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('deve encontrar uma organização por ID', async () => {
    const mockOrganization = { id: 1, name: 'Test Org' };
    serviceOrganization.FindById.mockResolvedValue(mockOrganization);
    mockReq.params.id = 1;

    await organizationController.FindById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockOrganization);
  });

  it('deve criar uma nova organização', async () => {
    const mockOrganization = { id: 1, name: 'Test Org' };
    serviceOrganization.Create.mockResolvedValue(mockOrganization);
    mockReq.body = { name: 'Test Org', address: 'Test Address', phone: '123456789', email: 'test@example.com' };

    await organizationController.Create(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ organization: mockOrganization });
  });

  it('deve atualizar uma organização', async () => {
    const mockOrganization = { id: 1, name: 'Updated Org' };
    serviceOrganization.Update.mockResolvedValue(mockOrganization);
    mockReq.params.id = 1;
    mockReq.body = { name: 'Updated Org', address: 'Updated Address', phone: '987654321', email: 'updated@example.com' };

    await organizationController.Update(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ organization: mockOrganization });
  });

  it('deve deletar uma organização', async () => {
    serviceOrganization.Delete.mockResolvedValue(true);
    mockReq.params.id = 1;

    await organizationController.Delete(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.send).toHaveBeenCalled();
  });

  it('deve lidar com erros ao encontrar uma organização', async () => {
    const mockError = new Error('Organization not found');
    serviceOrganization.FindById.mockRejectedValue(mockError);
    mockReq.params.id = 1;

    await organizationController.FindById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Organization not found' });
  });

  it('deve lidar com erros ao criar uma organização', async () => {
    const mockError = new Error('Email already in use');
    serviceOrganization.Create.mockRejectedValue(mockError);
    mockReq.body = { name: 'Test Org', address: 'Test Address', phone: '123456789', email: 'test@example.com' };

    await organizationController.Create(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Email already in use' });
  });

  it('deve lidar com erros ao atualizar uma organização', async () => {
    const mockError = new Error('Organization not found');
    serviceOrganization.Update.mockRejectedValue(mockError);
    mockReq.params.id = 1;
    mockReq.body = { name: 'Updated Org', address: 'Updated Address', phone: '987654321', email: 'updated@example.com' };

    await organizationController.Update(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Organization not found' });
  });

  it('deve lidar com erros ao deletar uma organização', async () => {
    const mockError = new Error('Organization not found');
    serviceOrganization.Delete.mockRejectedValue(mockError);
    mockReq.params.id = 1;

    await organizationController.Delete(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Organization not found' });
  });
});