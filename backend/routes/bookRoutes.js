

// const express = require('express');
// const Book = require('../models/book');
// const router = express.Router();

// // Get all books
// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// });



// router.get('/api/books', async (req, res) => {
//   const { search, author, genre } = req.query; // Extract query parameters

//   let filters = {}; // Initialize empty filters object

//   // Dynamically add filters only if the parameter exists
//   if (search) filters.title = { $regex: search, $options: 'i' }; // Case-insensitive search
//   if (author) filters.author = { $regex: author, $options: 'i' }; // Case-insensitive search
//   if (genre) filters.genre = genre; // Exact match for genre
//   if (!search && !author && !genre) {
//     return res.status(400).json({ error: 'At least one filter must be provided' });
//   }
  
//   try {
//     // Fetch filtered books from the database
//     const books = await Book.find(filters); 
//     res.json(books); // Return filtered books
//   } catch (error) {
//     console.error('Error fetching books:', error); // Log errors
//     res.status(500).json({ error: 'Error fetching books' });
//   }
// });




// // Get book by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     res.json(book);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching book details' });
//   }
// });

// // Add new book (admin only)
// router.post('/', async (req, res) => {
//   const { title, author, description, genre } = req.body;
//   try {
//     const newBook = new Book({ title, author, description, genre });
//     await newBook.save();
//     res.status(201).json(newBook);
//   } catch (err) {
//     res.status(400).json({ message: 'Error adding book', err });
//   }
// });

// // In bookRoutes.js
// router.get('/', async (req, res) => {
//   try {
//     const { search, author, genre } = req.query;
//     const query = {};

//     if (search) {
//       query.title = { $regex: search, $options: 'i' }; // Case-insensitive search in the title
//     }
//     if (author) {
//       query.author = { $regex: author, $options: 'i' }; // Case-insensitive search for author
//     }
//     if (genre) {
//       query.genre = genre; // Exact match for genre
//     }

//     const books = await Book.find(query);
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// });



// // DELETE /api/books/:id
// router.delete('/api/books/:id', async (req, res) => {
//   try {
//     const book = await Book.findByIdAndDelete(req.params.id);
//     if (!book) {
//       return res.status(404).json({ error: "Book not found" });
//     }
//     res.status(200).json({ message: "Book deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error deleting the book" });
//   }
// });




// module.exports = router;

// const express = require('express');
// const Book = require('../models/book');
// const router = express.Router();

// // Get all books
// router.get('/', async (req, res) => {
//   try {
//     const books = await Book.find();
//     res.json(books);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// });

// // Get books with filters
// router.get('/search', async (req, res) => {
//   const { search, author, genre } = req.query;

//   const filters = {};
//   if (search) filters.title = { $regex: search, $options: 'i' };
//   if (author) filters.author = { $regex: author, $options: 'i' };
//   if (genre) filters.genre = genre;

//   try {
//     const books = await Book.find(filters);
//     res.json(books);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching books' });
//   }
// });

// // Get book by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id);
//     if (!book) return res.status(404).json({ message: 'Book not found' });
//     res.json(book);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching book details' });
//   }
// });

// // Add a new book
// router.post('/', async (req, res) => {
//   const { title, author, description, genre } = req.body;
//   try {
//     const newBook = new Book({ title, author, description, genre });
//     await newBook.save();
//     res.status(201).json(newBook);
//   } catch (err) {
//     res.status(400).json({ message: 'Error adding book' });
//   }
// });

// // Delete a book
// router.delete('/:id', async (req, res) => {
//   try {
//     const book = await Book.findByIdAndDelete(req.params.id);
//     if (!book) return res.status(404).json({ message: 'Book not found' });
//     res.json({ message: 'Book deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting book' });
//   }
// });

// module.exports = router;






const express = require('express');
const Book = require('../models/Book');
const router = express.Router();
const Review = require('../models/Review');


router.get('/books', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching books' });
  }
});



router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('reviews');
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching book' });
  }
});




// const isAdmin = (req, res, next) => {
//   // Replace this with actual admin check (e.g., JWT verification)
//   if (req.user && req.user.role === 'admin') {
//     return next();
//   }
//   return res.status(403).json({ error: 'Admin access required' });
// };

router.post('/books',  async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Error adding book' });
  }
});



router.get('/reviews', async (req, res) => {
  const { bookId } = req.query;
  try {
    const reviews = await Review.find({ book: bookId }).populate('user');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reviews' });
  }
});



// router.post('/reviews', async (req, res) => {
//   const { bookId, userId, rating, comment } = req.body;
//   try {
//     const newReview = new Review({ book: bookId, user: userId, rating, comment });
//     await newReview.save();

//     // Optionally, update the book with the new review
//     const book = await Book.findById(bookId);
//     book.reviews.push(newReview._id);
//     await book.save();

//     res.status(201).json(newReview);
//   } catch (error) {
//     res.status(400).json({ error: 'Error submitting review' });
//   }
// });




router.post('/reviews', async (req, res) => {
  const { bookId, userId, rating, content } = req.body;

  try {
    const newReview = new Review({ bookId, userId, rating, content });
    await newReview.save();

    // Optionally update the book with the new review
    const book = await Book.findById(bookId);
    if (book) {
      book.reviews.push(newReview._id);
      await book.save();
    }

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(400).json({ error: 'Error submitting review', details: error.message });
  }
});




router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching book details' });
  }
});





router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});









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



module.exports = router;


router.get('/user', async (req, res) => {
  try {
    // Replace with logic to fetch a default user or the currently logged-in user
    const user = await User.findOne(); // Fetch any user as an example
    if (!user) {
      return res.status(404).json({ error: 'No users found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user profile' });
  }
});
