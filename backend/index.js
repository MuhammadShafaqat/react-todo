const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const crudRoutes = require('./routes/crud')
const PORT = 3000;

const app = express();
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use('/', crudRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
