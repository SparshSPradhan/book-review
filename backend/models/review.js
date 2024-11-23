// const mongoose = require("mongoose");

// const reviewSchema = new mongoose.Schema({
//   book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   rating: { type: Number, required: true },
//   comment: { type: String },
// });

// module.exports = mongoose.model("Review", reviewSchema);




// const mongoose = require('mongoose');

// const reviewSchema = new mongoose.Schema({
//   bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
//   userId: { type: String, required: true },
//   content: { type: String, required: true },
//   rating: { type: Number, required: true }
// });

// module.exports = mongoose.model('Review', reviewSchema);





const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  content: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
