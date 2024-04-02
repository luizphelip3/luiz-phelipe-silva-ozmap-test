import { Request, Response } from 'express';
import UserController from '../user.controller';
import CreateUserUseCase from '../../../application/use-cases/create-user/create-user-use-case';
import FindOneUserUseCase from '../../../application/use-cases/find-one-user/find-one-user-use-case';
import FindUsersUseCase from '../../../application/use-cases/find-users/find-users-use-case';
import UpdateUserUseCase from '../../../application/use-cases/update-user/update-user-use-case';
import DeleteUserUseCase from '../../../application/use-cases/delete-user/delete-user-use-case';

jest.mock('../../../application/use-cases/create-user/create-user-use-case');
jest.mock(
  '../../../application/use-cases/find-one-user/find-one-user-use-case',
);
jest.mock('../../../application/use-cases/find-users/find-users-use-case');
jest.mock('../../../application/use-cases/update-user/update-user-use-case');
jest.mock('../../../application/use-cases/delete-user/delete-user-use-case');

describe('UserController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    next = jest.fn();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const mockRequestData = {
        body: {
          name: 'John Doe',
          email: 'john@example.com',
        },
      };
      const mockResponseData = {
        statusCode: 201,
        data: { message: 'User created successfully' },
      };
      (CreateUserUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await UserController.createUser(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(CreateUserUseCase.execute).toHaveBeenCalledWith(
        mockRequestData.body,
      );
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (CreateUserUseCase.execute as jest.Mock).mockRejectedValue(mockError);

      await UserController.createUser(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('findOneUser', () => {
    it('should find a user', async () => {
      const mockRequestData = {
        query: {
          id: '123',
        },
      };
      const mockResponseData = {
        statusCode: 200,
        data: { id: '123', name: 'John Doe', email: 'john@example.com' },
      };
      (FindOneUserUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await UserController.findOneUser(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(FindOneUserUseCase.execute).toHaveBeenCalledWith({
        _id: '123',
        name: undefined,
        email: undefined,
      });
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (FindOneUserUseCase.execute as jest.Mock).mockRejectedValue(mockError);

      const mockRequestData = {
        query: {},
      };

      await UserController.findOneUser(
        mockRequestData as Request,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('findUsers', () => {
    it('should find users', async () => {
      const mockRequestData = {
        query: {
          page: 1,
          limit: 10,
        },
      };
      const mockResponseData = {
        statusCode: 200,
        data: [
          { id: '1', name: 'John Doe' },
          { id: '2', name: 'Jane Doe' },
        ],
      };
      (FindUsersUseCase.execute as jest.Mock).mockResolvedValue(
        mockResponseData,
      );

      await UserController.findUsers(
        mockRequestData as unknown as Request,
        res as Response,
        next,
      );

      expect(FindUsersUseCase.execute).toHaveBeenCalledWith({
        page: 1,
        limit: 10,
      });
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });

    it('should handle errors', async () => {
        const mockError = new Error('Internal Server Error');
        (FindUsersUseCase.execute as jest.Mock).mockRejectedValue(mockError);
    
        const mockRequestData = {
          query: {},
        };
    
        await UserController.findUsers(mockRequestData as Request, res as Response, next);
    
        expect(next).toHaveBeenCalledWith(mockError);
      });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const mockRequestData = {
        params: {
          id: '123',
        },
        body: {
          name: 'Updated Name',
          email: 'updated@example.com',
        },
      };
      const mockResponseData = {
        statusCode: 200,
        data: { message: 'User updated successfully' },
      };
      (UpdateUserUseCase.execute as jest.Mock).mockResolvedValue(mockResponseData);
  
      await UserController.updateUser(mockRequestData as unknown as Request, res as Response, next);
  
      expect(UpdateUserUseCase.execute).toHaveBeenCalledWith('123', {
        name: 'Updated Name',
        email: 'updated@example.com',
      });
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });
  
    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (UpdateUserUseCase.execute as jest.Mock).mockRejectedValue(mockError);
  
      // Ensure that the req object has necessary properties
      const mockRequestData = {
        params: {}, // Ensure that params object exists, even if empty
        body: {},   // Ensure that body object exists, even if empty
      };
  
      await UserController.updateUser(mockRequestData as Request, res as Response, next);
  
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
  
  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const mockRequestData = {
        params: {
          id: '123',
        },
      };
      const mockResponseData = {
        statusCode: 200,
        data: { message: 'User deleted successfully' },
      };
      (DeleteUserUseCase.execute as jest.Mock).mockResolvedValue(mockResponseData);
  
      await UserController.deleteUser(mockRequestData as unknown as Request, res as Response, next);
  
      expect(DeleteUserUseCase.execute).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(mockResponseData.statusCode);
      expect(res.json).toHaveBeenCalledWith(mockResponseData.data);
    });
  
    it('should handle errors', async () => {
      const mockError = new Error('Internal Server Error');
      (DeleteUserUseCase.execute as jest.Mock).mockRejectedValue(mockError);
  
      // Ensure that the req object has necessary properties
      const mockRequestData = {
        params: {}, // Ensure that params object exists, even if empty
      };
  
      await UserController.deleteUser(mockRequestData as Request, res as Response, next);
  
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});
