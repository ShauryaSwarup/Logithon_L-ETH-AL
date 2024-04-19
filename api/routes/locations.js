const express = require('express');
const router = express.Router();
const Location = require('../models/location');

// POST /locations - Update location
router.post('/', async (req, res) => {
  const { product_id, lat, lng } = req.body;
  if (!product_id || !lat || !lng) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newLocation = new Location({ product_id, lat, lng });
    await newLocation.save();
    res.json({ message: 'Location updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /locations?product_id=PRODUCT_ID - Query tracking information
router.get('/', async (req, res) => {
  const productId = req.query.product_id;
  if (!productId) {
    return res.status(400).json({ message: 'Missing product_id parameter' });
  }

  try {
    const locations = await Location.find({ product_id: productId }).sort({ timestamp: -1 });
    if (!locations.length) {
      return res.status(404).json({ message: 'No location found for product ID' });
    }

    res.json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
