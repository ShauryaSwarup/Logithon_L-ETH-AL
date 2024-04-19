const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const uri = 'mongodb://localhost:27017/your_database_name'; // Replace with your MongoDB connection string
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectToDatabase;
