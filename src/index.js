const express = require('express');
const cors = require('cors');
const otpRoutes = require('./routes/otpRoutes');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser');



// Middleware to parse cookies
app.use(cookieParser());

// Your routes here

app.use(cors());
app.use(express.json());
app.use('/otp', otpRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


