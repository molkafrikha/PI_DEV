import {
    createFactureSteg,
    getAllFacturesSteg,
    getFactureStegById,
    updateFactureStegById,
    deleteFactureStegById,
} from '../controllers/factureController';
import FactureSteg from '../models/facture'; 

// Mocking the Mongoose model
jest.mock('../models/facture');

// Mock console.error
console.error = jest.fn();

describe('Facture Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createFactureSteg', () => {
        it('should create a new facture_steg', async () => {
            const req = { body: { /* mock body data */ } };
            const res = createMockResponse();
            const savedFactureSteg = { /* mock saved facture_steg data */ };
            FactureSteg.create.mockResolvedValueOnce(savedFactureSteg);

            await createFactureSteg(req, res);

            expect(FactureSteg.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: 'FactureSteg créée avec succès',
                factureSteg: savedFactureSteg,
            });
        });

        it('should handle errors during facture_steg creation', async () => {
            const req = { body: { /* mock body data */ } };
            const res = createMockResponse();
            const error = new Error('Test error');
            FactureSteg.create.mockRejectedValueOnce(error);

            await createFactureSteg(req, res);

            expect(console.error).toHaveBeenCalledWith('Erreur lors de la création de la factureSteg :', error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Échec de la création de la factureSteg' });
        });
    });

    describe('getAllFacturesSteg', () => {
        it('should retrieve all factures_steg', async () => {
            const req = {};
            const res = createMockResponse();
            const facturesSteg = [{ /* mock facture_steg data */ }];
            FactureSteg.find.mockResolvedValueOnce(facturesSteg);

            await getAllFacturesSteg(req, res);

            expect(FactureSteg.find).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(facturesSteg);
        });

        it('should handle errors during retrieval of all factures_steg', async () => {
            const req = {};
            const res = createMockResponse();
            const error = new Error('Test error');
            FactureSteg.find.mockRejectedValueOnce(error);

            await getAllFacturesSteg(req, res);

            expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération des facturesSteg :', error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Échec de la récupération des facturesSteg' });
        });
    });
    describe('getFactureStegById', () => {
        it('should retrieve a facture_steg by ID', async () => {
            const req = { params: { id: 'mockId' } };
            const res = createMockResponse();
            const factureSteg = { /* mock facture_steg data */ };
            FactureSteg.findById.mockResolvedValueOnce(factureSteg);

            await getFactureStegById(req, res);

            expect(FactureSteg.findById).toHaveBeenCalledWith('mockId');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(factureSteg);
        });

        it('should handle errors during retrieval of a facture_steg by ID', async () => {
            const req = { params: { id: 'mockId' } };
            const res = createMockResponse();
            const error = new Error('Test error');
            FactureSteg.findById.mockRejectedValueOnce(error);

            await getFactureStegById(req, res);

            expect(console.error).toHaveBeenCalledWith('Erreur lors de la récupération de la factureSteg :', error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Échec de la récupération de la factureSteg' });
        });

        it('should return 404 if facture_steg is not found by ID', async () => {
            const req = { params: { id: 'nonExistentId' } };
            const res = createMockResponse();
            FactureSteg.findById.mockResolvedValueOnce(null);

            await getFactureStegById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'FactureSteg non trouvée' });
        });
    });

    describe('updateFactureStegById', () => {
        it('should update a facture_steg by ID', async () => {
            const req = { params: { id: 'mockId' }, body: { /* mock updated data */ } };
            const res = createMockResponse();
            const updatedFactureSteg = { /* mock updated facture_steg data */ };
            FactureSteg.findByIdAndUpdate.mockResolvedValueOnce(updatedFactureSteg);

            await updateFactureStegById(req, res);

            expect(FactureSteg.findByIdAndUpdate).toHaveBeenCalledWith('mockId', req.body, { new: true });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'FactureSteg mise à jour avec succès',
                factureSteg: updatedFactureSteg,
            });
        });

        it('should handle errors during update of a facture_steg by ID', async () => {
            const req = { params: { id: 'mockId' }, body: { /* mock updated data */ } };
            const res = createMockResponse();
            const error = new Error('Test error');
            FactureSteg.findByIdAndUpdate.mockRejectedValueOnce(error);

            await updateFactureStegById(req, res);

            expect(console.error).toHaveBeenCalledWith('Erreur lors de la mise à jour de la factureSteg :', error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Échec de la mise à jour de la factureSteg' });
        });

        it('should return 404 if facture_steg is not found by ID during update', async () => {
            const req = { params: { id: 'nonExistentId' }, body: { /* mock updated data */ } };
            const res = createMockResponse();
            FactureSteg.findByIdAndUpdate.mockResolvedValueOnce(null);

            await updateFactureStegById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'FactureSteg non trouvée' });
        });
    });

    describe('deleteFactureStegById', () => {
        it('should delete a facture_steg by ID', async () => {
            const req = { params: { id: 'mockId' } };
            const res = createMockResponse();
            const deletedFactureSteg = { /* mock deleted facture_steg data */ };
            FactureSteg.findByIdAndDelete.mockResolvedValueOnce(deletedFactureSteg);

            await deleteFactureStegById(req, res);

            expect(FactureSteg.findByIdAndDelete).toHaveBeenCalledWith('mockId');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'FactureSteg supprimée avec succès',
                factureSteg: deletedFactureSteg,
            });
        });

        it('should handle errors during deletion of a facture_steg by ID', async () => {
            const req = { params: { id: 'mockId' } };
            const res = createMockResponse();
            const error = new Error('Test error');
            FactureSteg.findByIdAndDelete.mockRejectedValueOnce(error);

            await deleteFactureStegById(req, res);

            expect(console.error).toHaveBeenCalledWith('Erreur lors de la suppression de la factureSteg :', error);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Échec de la suppression de la factureSteg' });
        });

        it('should return 404 if facture_steg is not found by ID during deletion', async () => {
            const req = { params: { id: 'nonExistentId' } };
            const res = createMockResponse();
            FactureSteg.findByIdAndDelete.mockResolvedValueOnce(null);

            await deleteFactureStegById(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'FactureSteg non trouvée' });
        });
    });
});


// Helper function to create mock response object
function createMockResponse() {
    return {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
}
