const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS — allow your frontend (GitHub Pages) to call this backend
app.use(cors({
    origin: '*',methods: ['GET','POST'], allowedHeaders: ['Content-Type'] // update this to your actual domain after deployment
}));

app.use(express.json());

// Routes
const careerRoute = require('./routes/career');
const contactRoute = require('./routes/contact');
app.use('/api', careerRoute);
app.use('/api', contactRoute);

// Health check
app.get('/', (req, res) => {
    res.send('Sahyadhri Backend Initialized sucessfully');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});