const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const vendorRoutes = require('./routes/vendorRoutes');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');


const app = express()
const PORT = process.env.PORT || 4000;

dotEnv.config();

//Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://yummy-food-app-frontend.vercel.app'
  ],
  credentials: true
}));


//mongo DB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((error) => console.log(error))

// API Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes)
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));


// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server started and running at ${PORT}`);
});
