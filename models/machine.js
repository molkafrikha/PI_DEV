import mongoose from 'mongoose';

// Define the schema for the Machine model
const machineSchema = new mongoose.Schema(
  {
    armoire_id: Number,
    usage_id: Number,
    zone_id: Number,
    production: Boolean,
    interfaceweb: Boolean,
    saisie_prodautomatique: Boolean,
    objectif_khw_t: Number,
    energie_nominal: {
      type: Number,
      default: 5,
    },
    indicateur_cible_kwh_t: Number,
    indicateur_cible_kwh_km: Number,
    adressip: String,
    nom: String,
    isactive: String,
    dossier: String,
    dossierprod: String,
    tgbt_id: Number,
  },
  { collection: 'machine' }
); // Specify the collection name here

// Create the Machine model using the schema
const Machine = mongoose.model('Machine', machineSchema);

export default Machine;
