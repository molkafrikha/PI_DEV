// eslint-disable-next-line import/extensions
import Machine from '../models/machine.js'; // Import the Mongoose model for Machine

// Function to create a new machine document
export const createMachine = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newMachine = new Machine({ name, description });
    const savedMachine = await newMachine.save();
    res
      .status(201)
      .json({ message: 'Machine created successfully', machine: savedMachine });
  } catch (error) {
    console.error('Error creating machine:', error);
    res.status(500).json({ error: 'Failed to create machine' });
  }
};

// Function to retrieve all machines
export const getAllMachines = async (req, res) => {
  try {
    const machines = await Machine.find();
    res.status(200).json(machines);
  } catch (error) {
    console.error('Error retrieving machines:', error);
    res.status(500).json({ error: 'Failed to retrieve machines' });
  }
};

// Function to retrieve a machine by its ID
export const getMachineById = async (req, res) => {
  const { id } = req.params;
  try {
    const machine = await Machine.findById(id);
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    res.status(200).json(machine);
  } catch (error) {
    console.error('Error retrieving machine:', error);
    res.status(500).json({ error: 'Failed to retrieve machine' });
  }
};

// Function to update a machine by its ID
export const updateMachineById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedMachine = await Machine.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedMachine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    res.status(200).json({
      message: 'Machine updated successfully',
      machine: updatedMachine,
    });
  } catch (error) {
    console.error('Error updating machine:', error);
    res.status(500).json({ error: 'Failed to update machine' });
  }
};

// Function to delete a machine by its ID
export const deleteMachineById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMachine = await Machine.findByIdAndDelete(id);
    if (!deletedMachine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    res.status(200).json({
      message: 'Machine deleted successfully',
      machine: deletedMachine,
    });
  } catch (error) {
    console.error('Error deleting machine:', error);
    res.status(500).json({ error: 'Failed to delete machine' });
  }
};
