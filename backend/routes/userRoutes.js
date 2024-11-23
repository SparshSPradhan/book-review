// In userRoutes.js
const express = require('express');
const router = express.Router();

router.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: 'Error updating user profile' });
    }
  });
  
router.get('/user', (req, res) => {
  // Simulate user data; replace with database query
  try{const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    favoriteBooks: ['Book 1', 'Book 2', 'Book 3']
  };

  res.json(user);
} catch (error) {
    console.error('Error handling /api/user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
