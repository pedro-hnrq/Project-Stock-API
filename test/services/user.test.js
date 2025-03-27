const serviceUser = require('../../src/services/user');
const modelUser = require('../../src/model/user');
const checkEmail = require('../../src/utils/checkEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../../src/model/user');
jest.mock('../../src/utils/checkEmail');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('ServiceUser', () => {
    const mockTransaction = {};
    const organizationId = 1;
    const userId = 1;
    const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
        role: 'admin',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve encontrar todos os usuários de uma organização', async () => {
        const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
        modelUser.findAll.mockResolvedValue(mockUsers);

        const users = await serviceUser.FindAll(organizationId, mockTransaction);

        expect(users).toEqual(mockUsers);
        expect(modelUser.findAll).toHaveBeenCalledWith({ where: { organizationId }, transaction: mockTransaction });
    });

    it('deve encontrar um usuário por ID e organização', async () => {
        const mockUser = { id: 1, name: 'Test User' };
        modelUser.findOne.mockResolvedValue(mockUser);

        const user = await serviceUser.FindById(organizationId, userId, mockTransaction);

        expect(user).toEqual(mockUser);
        expect(modelUser.findOne).toHaveBeenCalledWith({ where: { organizationId, id: userId } }, { transaction: mockTransaction });
    });

    it('deve criar um novo usuário', async () => {
        const mockUser = { id: 1, ...userData };
        modelUser.create.mockResolvedValue(mockUser);
        checkEmail.userEmail.mockResolvedValue();
        bcrypt.hash.mockResolvedValue('hashedPassword');

        const user = await serviceUser.Create(organizationId, userData.name, userData.email, userData.password, userData.role, mockTransaction);

        expect(user).toEqual(mockUser);
        expect(modelUser.create).toHaveBeenCalled();
        expect(checkEmail.userEmail).toHaveBeenCalled();
        expect(bcrypt.hash).toHaveBeenCalled();
    });

    it('deve atualizar um usuário', async () => {
        const mockUser = {
            id: 1,
            ...userData,
            save: jest.fn().mockResolvedValue({
                id: 1,
                ...userData,
                name: 'Updated Name',
                password: 'hashedPassword',
            }),
        };

        modelUser.findOne.mockResolvedValue(mockUser);
        bcrypt.hash.mockResolvedValue('hashedPassword');

        const updatedUser = await serviceUser.Update(organizationId, userId, 'Updated Name', userData.email, userData.password, userData.role, mockTransaction);

        expect(updatedUser).toEqual({
            id: 1,
            ...userData,
            name: 'Updated Name',
            password: 'hashedPassword',
        });
        expect(modelUser.findOne).toHaveBeenCalled();
    });
    
    it('deve deletar um usuário', async () => {
        const mockUser = { destroy: jest.fn().mockResolvedValue(true) };
        modelUser.findOne.mockResolvedValue(mockUser);

        await serviceUser.Delete(organizationId, userId, mockTransaction);

        expect(mockUser.destroy).toHaveBeenCalled();
        expect(modelUser.findOne).toHaveBeenCalled();
    });

    it('deve fazer login de um usuário', async () => {
        const mockUser = { id: 1, email: userData.email, password: 'hashedPassword', role: userData.role, organizationId };
        modelUser.findOne.mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('mockToken');

        const token = await serviceUser.Login(userData.email, userData.password, mockTransaction);

        expect(token).toEqual('mockToken');
        expect(jwt.sign).toHaveBeenCalled();
        expect(bcrypt.compare).toHaveBeenCalled();
    });

    it('deve verificar um usuário por ID e role', async () => {
        const mockUser = { id: 1, role: userData.role };
        modelUser.findOne.mockResolvedValue(mockUser);

        const user = await serviceUser.Verify(userId, userData.role, mockTransaction);

        expect(user).toEqual(mockUser);
        expect(modelUser.findOne).toHaveBeenCalled();
    });
    });