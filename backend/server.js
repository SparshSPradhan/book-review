// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const bookRoutes = require("./routes/bookRoutes");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// app.use("/api/books", bookRoutes);

// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', bookRoutes);
app.use('/api/reviews', reviewRoutes);
// app.use('/api', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});
