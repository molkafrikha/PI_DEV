import {
  createArmoire,
  getAllArmoires,
  getArmoireById,
  updateArmoire,
  deleteArmoire,
} from '../controllers/armoireController';
import Armoire from '../models/armoire';

// Mocking the Mongoose model
jest.mock('../models/armoire');

// Mock console.error
console.error = jest.fn();

describe('Armoire Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createArmoire', () => {
    it('should create a new armoire', async () => {
      const req = {
        body: {
          /* mock body data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const savedArmoire = {
        /* mock saved armoire data */
      };
      Armoire.mockReturnValueOnce({
        save: jest.fn().mockResolvedValueOnce(savedArmoire),
      });

      await createArmoire(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Armoire created successfully',
        armoire: savedArmoire,
      });
    });

    it('should handle errors during armoire creation', async () => {
      const req = {
        body: {
          /* mock body data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      Armoire.mockReturnValueOnce({
        save: jest.fn().mockRejectedValueOnce(error),
      });

      await createArmoire(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error creating armoire:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to create armoire',
      });
    });
  });

  describe('getAllArmoires', () => {
    it('should retrieve all armories', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const armories = [
        /* mock array of armories */
      ];
      Armoire.find.mockResolvedValueOnce(armories);

      await getAllArmoires(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(armories);
    });

    it('should handle errors during retrieval of armories', async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      Armoire.find.mockRejectedValueOnce(error);

      await getAllArmoires(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error retrieving armoires:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to retrieve armoires',
      });
    });
  });

  describe('getArmoireById', () => {
    it('should retrieve an armoire by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const armoire = {
        /* mock armoire data */
      };
      Armoire.findById.mockResolvedValueOnce(armoire);

      await getArmoireById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(armoire);
    });

    it('should handle errors during retrieval of an armoire by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      Armoire.findById.mockRejectedValueOnce(error);

      await getArmoireById(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error retrieving armoire:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to retrieve armoire',
      });
    });

    it('should return 404 if armoire is not found by its ID', async () => {
      const req = { params: { id: 'nonExistentId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Armoire.findById.mockResolvedValueOnce(null);

      await getArmoireById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Armoire not found' });
    });
  });

  describe('updateArmoire', () => {
    it('should update an armoire by its ID', async () => {
      const req = {
        params: { id: 'mockId' },
        body: {
          /* mock updated armoire data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const updatedArmoire = {
        /* mock updated armoire data */
      };
      Armoire.findByIdAndUpdate.mockResolvedValueOnce(updatedArmoire);

      await updateArmoire(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Armoire updated successfully',
        armoire: updatedArmoire,
      });
    });

    it('should handle errors during update of an armoire by its ID', async () => {
      const req = {
        params: { id: 'mockId' },
        body: {
          /* mock updated armoire data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      Armoire.findByIdAndUpdate.mockRejectedValueOnce(error);

      await updateArmoire(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error updating armoire:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to update armoire',
      });
    });

    it('should return 404 if armoire is not found for update by its ID', async () => {
      const req = {
        params: { id: 'nonExistentId' },
        body: {
          /* mock updated armoire data */
        },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Armoire.findByIdAndUpdate.mockResolvedValueOnce(null);

      await updateArmoire(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Armoire not found' });
    });
  });

  describe('deleteArmoire', () => {
    it('should delete an armoire by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const deletedArmoire = {
        /* mock deleted armoire data */
      };
      Armoire.findByIdAndDelete.mockResolvedValueOnce(deletedArmoire);

      await deleteArmoire(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Armoire deleted successfully',
        armoire: deletedArmoire,
      });
    });

    it('should handle errors during deletion of an armoire by its ID', async () => {
      const req = { params: { id: 'mockId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      const error = new Error('Test error');
      Armoire.findByIdAndDelete.mockRejectedValueOnce(error);

      await deleteArmoire(req, res);

      expect(console.error).toHaveBeenCalledWith(
        'Error deleting armoire:',
        error
      );
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Failed to delete armoire',
      });
    });

    it('should return 404 if armoire is not found for deletion by its ID', async () => {
      const req = { params: { id: 'nonExistentId' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      Armoire.findByIdAndDelete.mockResolvedValueOnce(null);

      await deleteArmoire(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Armoire not found' });
    });
  });
});
