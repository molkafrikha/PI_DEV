import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import config from './config/config.js'; 

import machineRoutes from './server/routes/api/machineRoutes.js';
import armoireRoutes from './server/routes/api/armoireRoutes.js'; 
import factureRoutes from './server/routes/api/factureRoutes.js';
import airConsomGlobalRoutes from './server/routes/api/airConsomglobalRoutes.js';
import airLocalCompresseurRoutes from './server/routes/api/airLocalCompresseurRoutes.js'; // Import the air local compresseur routes

dotenv.config();

const app = express();

const { PORT = 5000 } = process.env;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('./dist/'));
app.use('/api', machineRoutes);
app.use('/api', armoireRoutes);
app.use('/api',factureRoutes);
app.use('/api', airConsomGlobalRoutes);
app.use('/api', airLocalCompresseurRoutes);

//app.use('/api/air_consomglobal', airConsomGlobalRoutes);


app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

const { uri, username, password, dbName } = config.mongo;

mongoose.connect(`mongodb+srv://${username}:${password}@${uri}/${dbName}`)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to log outgoing responses
app.use((req, res, next) => {
  res.on('finish', () => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode}`);
  });
  next();
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));