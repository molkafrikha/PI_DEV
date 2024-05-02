import express from 'express';
import { createMachine, getAllMachines, getMachineById, updateMachineById, deleteMachineById } from '../../../controllers/machineController.js'; // Import the controller functions

const router = express.Router();

// Create a new machine
router.post('/machines', (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
    createMachine(req, res); // Call the controller function
});

// Get all machines
router.get('/machines', getAllMachines);

// Get a machine by ID
router.get('/machines/:id', getMachineById);

// Update a machine by ID
router.put('/machines/:id', updateMachineById);

// Delete a machine by ID
router.delete('/machines/:id', deleteMachineById);

export default router;
