import express from 'express';
import {
  createFactureSteg,
  getAllFacturesSteg,
  getFactureStegById,
  updateFactureStegById,
  deleteFactureStegById
} from '../../../controllers/factureController.js';

const router = express.Router();

// Route pour créer une nouvelle facture_steg
router.post('/facturesSteg', createFactureSteg);

// Route pour récupérer toutes les factures_steg
router.get('/facturesSteg', getAllFacturesSteg);

// Route pour récupérer une facture_steg par son ID
router.get('/facturesSteg/:id', getFactureStegById);

// Route pour mettre à jour une facture_steg par son ID
router.put('/facturesSteg/:id', updateFactureStegById);

// Route pour supprimer une facture_steg par son ID
router.delete('/facturesSteg/:id', deleteFactureStegById);

export default router;
