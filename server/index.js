import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import pickingRoutes from './routes/pickingRoutes.js';
import userRoutes from './routes/userRoutes.js';
import auth from './middleware/auth.js';
import { logger } from './middleware/logEvents.js';

dotenv.config();
const app = express();

app.use(cors());

app.use( logger );

app.use(express.json({ limit: '30mb', extended: true}));

app.use('/api/user', userRoutes);
app.use('/api/rcd', auth, pickingRoutes);

app.get('/', (req,res)=> {
    res.send(`Careful, 250,000/day viruses detected`);
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DATABASE_CONNECTION_URL,{ useUnifiedTopology: true, useNewUrlParser: true}).then(() => app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}/api/rcd`))).catch((e) => console.log(e));