const express = require('express');
const app = express();
const port = 3000;
const locationsRouter = require('./routes/locations');
const connectToDatabase = require('./utils/database');

(async () => {
  await connectToDatabase(); // Connect to database before starting server
  app.use('/locations', locationsRouter);

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
})();
