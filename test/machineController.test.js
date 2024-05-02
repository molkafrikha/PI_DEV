// Import the Mongoose model for Machine
import Machine from '../models/machine.js';

// Mocking the Mongoose model
jest.mock('../models/machine.js');

// Mock console.error
console.error = jest.fn();

// Import controller functions
import {
  createMachine,
  getAllMachines,
  getMachineById,
  updateMachineById,
  deleteMachineById,
} from '../controllers/machineController.js';

describe('Machine Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createMachine', () => {
    it('should create a new machine', async () => {
      const req = {
        body: {
          name: 'Test Machine',
          description: 'Test Description',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const savedMachine = {
        _id: '1',
        name: 'Test Machine',
        description: 'Test Description',
      };
      Machine.mockReturnValueOnce({
        save: jest.fn().mockResolvedValueOnce(savedMachine),
      });

      await createMachine(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Machine created successfully',
        machine: savedMachine,
      });
    });

    it('should handle errors during machine creation', async () => {
      const req = {
        body: {
          name: 'Test Machine',
          description: 'Test Description',
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      Machine.mockReturnValueOnce({
        save: jest.fn().mockRejectedValueOnce(error),
      });

      await createMachine(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error creating machine:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to create machine',
      });
    });
  });

  describe('getAllMachines', () => {
    it('should retrieve all machines', async () => {
      const machines = [
        {
          _id: '1',
          name: 'Machine 1',
          description: 'Description 1',
        },
        {
          _id: '2',
          name: 'Machine 2',
          description: 'Description 2',
        },
      ];
      Machine.find = jest.fn().mockResolvedValueOnce(machines);

      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getAllMachines(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(machines);
    });

    it('should handle errors during retrieval of machines', async () => {
      const error = new Error('Test error');
      Machine.find = jest.fn().mockRejectedValueOnce(error);

      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await getAllMachines(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error retrieving machines:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to retrieve machines',
      });
    });
  });

  describe('getMachineById', () => {
    it('should retrieve a machine by its ID', async () => {
      const req = { params: { id: 'validId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const foundMachine = { name: 'Test Machine', description: 'Test Description' };
      Machine.findById = jest.fn().mockResolvedValueOnce(foundMachine);
  
      await getMachineById(req, res);
  
      expect(Machine.findById).toHaveBeenCalledWith('validId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(foundMachine);
    });
  
    it('should handle error when machine is not found', async () => {
      const req = { params: { id: 'invalidId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Machine.findById = jest.fn().mockResolvedValueOnce(null);
  
      await getMachineById(req, res);
  
      expect(Machine.findById).toHaveBeenCalledWith('invalidId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Machine not found' });
    });
  
    it('should handle errors during retrieval of machine by ID', async () => {
      const req = { params: { id: 'validId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error('Test error');
      Machine.findById = jest.fn().mockRejectedValueOnce(error);
  
      await getMachineById(req, res);
  
      expect(Machine.findById).toHaveBeenCalledWith('validId');
      expect(console.error).toHaveBeenCalledWith('Error retrieving machine:', error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to retrieve machine' });
    });
  });
  
  describe('updateMachineById', () => {
    it('should update a machine by its ID', async () => {
      const req = {
        params: { id: 'validId' },
        body: { name: 'Updated Machine', description: 'Updated Description' },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const updatedMachine = { _id: 'validId', name: 'Updated Machine', description: 'Updated Description' };
      Machine.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(updatedMachine);
  
      await updateMachineById(req, res);
  
      expect(Machine.findByIdAndUpdate).toHaveBeenCalledWith('validId', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Machine updated successfully',
        machine: updatedMachine,
      });
    });
  
    it('should handle error when machine is not found for updating', async () => {
      const req = { params: { id: 'invalidId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Machine.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);
  
      await updateMachineById(req, res);
  
      expect(Machine.findByIdAndUpdate).toHaveBeenCalledWith('invalidId', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Machine not found' });
    });
  
    it('should handle errors during updating machine by ID', async () => {
      const req = { params: { id: 'validId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error('Test error');
      Machine.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(error);
  
      await updateMachineById(req, res);
  
      expect(Machine.findByIdAndUpdate).toHaveBeenCalledWith('validId', req.body, { new: true });
      expect(console.error).toHaveBeenCalledWith('Error updating machine:', error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to update machine' });
    });
  });
  
  describe('deleteMachineById', () => {
    it('should delete a machine by its ID', async () => {
      const req = { params: { id: 'validId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const deletedMachine = { _id: 'validId', name: 'Test Machine', description: 'Test Description' };
      Machine.findByIdAndDelete = jest.fn().mockResolvedValueOnce(deletedMachine);
  
      await deleteMachineById(req, res);
  
      expect(Machine.findByIdAndDelete).toHaveBeenCalledWith('validId');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Machine deleted successfully',
        machine: deletedMachine,
      });
    });
  
    it('should handle error when machine is not found for deletion', async () => {
      const req = { params: { id: 'invalidId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      Machine.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);
  
      await deleteMachineById(req, res);
  
      expect(Machine.findByIdAndDelete).toHaveBeenCalledWith('invalidId');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Machine not found' });
    });
  
    it('should handle errors during deletion of machine by ID', async () => {
      const req = { params: { id: 'validId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const error = new Error('Test error');
      Machine.findByIdAndDelete = jest.fn().mockRejectedValueOnce(error);
  
      await deleteMachineById(req, res);
  
      expect(Machine.findByIdAndDelete).toHaveBeenCalledWith('validId');
      expect(console.error).toHaveBeenCalledWith('Error deleting machine:', error);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Failed to delete machine' });
    });
  });
  
 
 
});

