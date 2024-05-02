// eslint-disable-next-line import/extensions
import FactureSteg from '../models/facture.js';

// Créer une nouvelle facture_steg
export const createFactureSteg = async (req, res) => {
  try {
    const factureSteg = await FactureSteg.create(req.body);
    res
      .status(201)
      .json({ message: 'FactureSteg créée avec succès', factureSteg });
  } catch (error) {
    console.error('Erreur lors de la création de la factureSteg :', error);
    res.status(500).json({ error: 'Échec de la création de la factureSteg' });
  }
};

// Récupérer toutes les factures_steg
export const getAllFacturesSteg = async (req, res) => {
  try {
    const facturesSteg = await FactureSteg.find();
    res.status(200).json(facturesSteg);
  } catch (error) {
    console.error('Erreur lors de la récupération des facturesSteg :', error);
    res
      .status(500)
      .json({ error: 'Échec de la récupération des facturesSteg' });
  }
};

// Récupérer une facture_steg par son ID
// eslint-disable-next-line consistent-return
export const getFactureStegById = async (req, res) => {
  const { id } = req.params;
  try {
    const factureSteg = await FactureSteg.findById(id);
    if (!factureSteg) {
      return res.status(404).json({ error: 'FactureSteg non trouvée' });
    }
    res.status(200).json(factureSteg);
  } catch (error) {
    console.error('Erreur lors de la récupération de la factureSteg :', error);
    res
      .status(500)
      .json({ error: 'Échec de la récupération de la factureSteg' });
  }
};

// Mettre à jour une facture_steg par son ID
// eslint-disable-next-line consistent-return
export const updateFactureStegById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFactureSteg = await FactureSteg.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedFactureSteg) {
      return res.status(404).json({ error: 'FactureSteg non trouvée' });
    }
    res.status(200).json({
      message: 'FactureSteg mise à jour avec succès',
      factureSteg: updatedFactureSteg,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la factureSteg :', error);
    res
      .status(500)
      .json({ error: 'Échec de la mise à jour de la factureSteg' });
  }
};

// Supprimer une facture_steg par son ID
// eslint-disable-next-line consistent-return
export const deleteFactureStegById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFactureSteg = await FactureSteg.findByIdAndDelete(id);
    if (!deletedFactureSteg) {
      return res.status(404).json({ error: 'FactureSteg non trouvée' });
    }
    res.status(200).json({
      message: 'FactureSteg supprimée avec succès',
      factureSteg: deletedFactureSteg,
    });
  } catch (error) {
    console.error('Erreur lors de la suppression de la factureSteg :', error);
    res
      .status(500)
      .json({ error: 'Échec de la suppression de la factureSteg' });
  }
};
