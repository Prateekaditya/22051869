const express = require('express');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();

app.use(express.json());

app.use('/api', calculatorRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Average Calculator API',
    endpoints: {
      calculateAverage: '/api/average'
    }
  });
});

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

module.exports = app;
