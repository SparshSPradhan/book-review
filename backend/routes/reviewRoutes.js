const express = require('express');
// const Review = require('../models/review');
const router = express.Router();

// Get reviews for a book
router.get('/:bookId', async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

// Submit a review
router.post('/', async (req, res) => {
  const { bookId, userId, content, rating } = req.body;
  try {
    const newReview = new Review({ bookId, userId, content, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: 'Error submitting review' });
  }
});

module.exports = router;
