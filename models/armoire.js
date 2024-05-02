import mongoose from 'mongoose';

// Define the schema for the Armoire model
const armoireSchema = new mongoose.Schema({
  tgbt_id: {
    type: Number,
    default: null,
  },
  nom: {
    type: String,
    default: null,
  },
  dossier: {
    type: String,
    default: null,
  },
  isactive: {
    type: String,
    default: null,
  },
  isprod: {
    type: Boolean,
    default: null,
  },
  adressip: {
    type: String,
    default: null,
  },
  objectif_khw_t: {
    type: Number,
    default: null,
  },
  interfaceweb: {
    type: Boolean,
    default: null,
  },
  armoireprec: {
    type: Number,
    default: null,
  },
  zone_id: {
    type: Number,
    default: null,
  },
});

// Create the Armoire model using the schema
const Armoire = mongoose.model('Armoire', armoireSchema);

export default Armoire;
