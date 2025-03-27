const userController = require('../../src/controllers/user');
const serviceUser = require('../../src/services/user');

jest.mock('../../src/services/user');

describe('UserController', () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = { session: {}, params: {}, body: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('deve encontrar todos os usuários', async () => {
    const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
    serviceUser.FindAll.mockResolvedValue(mockUsers);
    mockReq.session.organizationId = 1;

    await userController.FindAll(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(mockUsers);
  });

  it('deve encontrar um usuário por ID', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    serviceUser.FindById.mockResolvedValue(mockUser);
    mockReq.session.organizationId = 1;
    mockReq.session.id = 1;

    await userController.FindById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ user: mockUser });
  });

  it('deve criar um novo usuário', async () => {
    const mockUser = { id: 1, name: 'Test User' };
    serviceUser.Create.mockResolvedValue(mockUser);
    mockReq.session.organizationId = 1;
    mockReq.body = { name: 'Test User', email: 'test@example.com', password: 'password', role: 'admin' };

    await userController.Create(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.send).toHaveBeenCalledWith({ user: mockUser });
  });

  it('deve atualizar um usuário', async () => {
    const mockUser = { id: 1, name: 'Updated User' };
    serviceUser.Update.mockResolvedValue(mockUser);
    mockReq.session.organizationId = 1;
    mockReq.params.id = 1;
    mockReq.body = { name: 'Updated User', email: 'updated@example.com', password: 'newPassword', role: 'employee' };

    await userController.Update(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ user: mockUser });
  });

  it('deve deletar um usuário', async () => {
    serviceUser.Delete.mockResolvedValue(true);
    mockReq.session.organizationId = 1;
    mockReq.params.id = 1;

    await userController.Delete(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(204);
    expect(mockRes.send).toHaveBeenCalledWith({ user: true });
  });

  it('deve fazer login de um usuário', async () => {
    const mockToken = 'mockToken';
    serviceUser.Login.mockResolvedValue(mockToken);
    mockReq.body = { email: 'test@example.com', password: 'password' };

    await userController.Login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith({ token: mockToken });
  });

  it('deve lidar com erros ao encontrar usuários', async () => {
    const mockError = new Error('Users not found');
    serviceUser.FindAll.mockRejectedValue(mockError);
    mockReq.session.organizationId = 1;

    await userController.FindAll(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Users not found' });
  });

  it('deve lidar com erros ao encontrar um usuário por ID', async () => {
    const mockError = new Error('User not found');
    serviceUser.FindById.mockRejectedValue(mockError);
    mockReq.session.organizationId = 1;
    mockReq.session.id = 1;

    await userController.FindById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'User not found' });
  });

  it('deve lidar com erros ao criar um usuário', async () => {
    const mockError = new Error('Email already in use');
    serviceUser.Create.mockRejectedValue(mockError);
    mockReq.session.organizationId = 1;
    mockReq.body = { name: 'Test User', email: 'test@example.com', password: 'password', role: 'admin' };

    await userController.Create(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Email already in use' });
  });

  it('deve lidar com erros ao atualizar um usuário', async () => {
    const mockError = new Error('User not found');
    serviceUser.Update.mockRejectedValue(mockError);
    mockReq.session.organizationId = 1;
    mockReq.params.id = 1;
    mockReq.body = { name: 'Updated User', email: 'updated@example.com', password: 'newPassword', role: 'employee' };

    await userController.Update(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'User not found' });
  });

  it('deve lidar com erros ao deletar um usuário', async () => {
    const mockError = new Error('User not found');
    serviceUser.Delete.mockRejectedValue(mockError);
    mockReq.session.organizationId = 1;
    mockReq.params.id = 1;

    await userController.Delete(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'User not found' });
  });

  it('deve lidar com erros ao fazer login', async () => {
    const mockError = new Error('Invalid credentials');
    serviceUser.Login.mockRejectedValue(mockError);
    mockReq.body = { email: 'test@example.com', password: 'password' };

    await userController.Login(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith({ msg: 'Invalid credentials' });
  });
});