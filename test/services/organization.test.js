const serviceOrganization = require('../../src/services/organization');
const modelOrganization = require('../../src/model/organization');
const serviceUser = require('../../src/services/user');
const checkEmail = require('../../src/utils/checkEmail');
const generatePassword = require('../../src/fns/generate-password');

jest.mock('../../src/services/user');
jest.mock('../../src/utils/checkEmail');
jest.mock('../../src/fns/generate-password');

describe('ServiceOrganization', () => {
    const mockTransaction = {};

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve encontrar uma organização por ID', async () => {
        const mockOrganization = { id: 1, name: 'Test Org' };
        jest.spyOn(modelOrganization, 'findByPk').mockResolvedValue(mockOrganization);

        const organization = await serviceOrganization.FindById(1, mockTransaction);

        expect(organization).toEqual(mockOrganization);
        expect(modelOrganization.findByPk).toHaveBeenCalledWith(1, { transaction: mockTransaction });
    });

    it('deve criar uma nova organização', async () => {
        const mockOrganization = { id: 1, name: 'Test Org', address: 'Test Address', phone: '123456789', email: 'test@example.com' };
        const mockUser = { dataValues: { id: 1, password: 'testPassword' } };
        jest.spyOn(modelOrganization, 'create').mockResolvedValue(mockOrganization);
        serviceUser.Create.mockResolvedValue(mockUser);
        generatePassword.mockReturnValue('testPassword');
        checkEmail.organizationEmail.mockResolvedValue(true);

        const result = await serviceOrganization.Create('Test Org', 'Test Address', '123456789', 'test@example.com', mockTransaction);

        expect(result).toEqual({ organization: mockOrganization, user: mockUser.dataValues });
        expect(modelOrganization.create).toHaveBeenCalled();
        expect(serviceUser.Create).toHaveBeenCalled();
        expect(generatePassword).toHaveBeenCalled();
        expect(checkEmail.organizationEmail).toHaveBeenCalled();
    });

    it('deve atualizar uma organização', async () => {
        const mockOrganization = { id: 1, name: 'Old Name', address: 'Old Address', phone: 'Old Phone', email: 'old@example.com', save: jest.fn().mockResolvedValue({ id: 1, name: 'New Name' }) };
        jest.spyOn(modelOrganization, 'findByPk').mockResolvedValue(mockOrganization);

        const updatedOrganization = await serviceOrganization.Update(1, 'New Name', null, null, null, mockTransaction);

        expect(updatedOrganization).toEqual({ id: 1, name: 'New Name' });
        expect(mockOrganization.save).toHaveBeenCalled();
    });

    it('deve deletar uma organização', async () => {
        const mockOrganization = { destroy: jest.fn().mockResolvedValue(true) };
        jest.spyOn(modelOrganization, 'findByPk').mockResolvedValue(mockOrganization);

        const result = await serviceOrganization.Delete(1, mockTransaction);

        expect(mockOrganization.destroy).toHaveBeenCalled();
        expect(result).toEqual(true);
    });
});