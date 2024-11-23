






// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBooks } from '../redux/bookSlice';

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const { books, loading, error } = useSelector((state) => state.books);

//   useEffect(() => {
//     dispatch(fetchBooks());
//   }, [dispatch]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Featured Books</h1>
//       <div className="book-list">
//         {books.map((book) => (
//           <div key={book._id} className="book-item">
//             <h3>{book.title}</h3>
//             <p>{book.author}</p>
//             <p>{book.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './HomePage.css'; 
// import { Link } from 'react-router-dom'; // Import Link for navigation


// const HomePage = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/books');
//         setBooks(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching books');
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>Featured Books</h1>
//       {/* Link to navigate to the Book Listing page */}
//       <Link to="/books">
//         <button className="browse-books-button">Browse All Books</button>
//       </Link>
//       <div className="book-list">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book._id} className="book-item">
//               {/* <h3>{book.title}</h3> */}
//               <p><strong>Book Title:</strong> {book.title}</p>
//               <p><strong>Author:</strong> {book.author}</p>
//               <p><strong>Description:</strong> {book.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No books available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './HomePage.css'; 
// import { Link } from 'react-router-dom'; // Import Link for navigation

// const HomePage = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(''); // Initialize userId

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/books');
//         setBooks(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching books');
//         setLoading(false);
//       }
//     };

//     fetchBooks();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>Featured Books</h1>
//       {/* Link to navigate to the Book Listing page */}
//       <Link to="/books">
//         <button className="browse-books-button">Browse All Books</button>
//       </Link>
//       <Link to={`/user/${userId}`}>
//   <button className="user-profile-button">View User Profile</button>
// </Link>

//       <div className="book-list">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book._id} className="book-item">
//               <p><strong>Book Title:</strong> {book.title}</p>
//               <p><strong>Author:</strong> {book.author}</p>
//               <p><strong>Description:</strong> {book.description}</p>
//               {/* Button to navigate to the individual book detail page */}
//               <Link to={`/book/${book._id}`}>
//                 <button className="view-details-button">View Details</button>
//               </Link>
//             </div>
//           ))
//         ) : (
//           <p>No books available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;








import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css'; 
import { Link } from 'react-router-dom'; // Import Link for navigation

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(''); // Initialize userId
  const [selectedBookId, setSelectedBookId] = useState(null); // Store selected book ID for reviews
  const [reviews, setReviews] = useState([]); // Store reviews of the selected book
  const [reviewContent, setReviewContent] = useState(''); // Store review content
  const [reviewRating, setReviewRating] = useState(0); // Store review rating

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/books');
        setBooks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Fetch reviews when a book is selected
  const fetchReviews = async (bookId) => {
    try {
      const response = await axios.get('http://localhost:5002/api/reviews', {
        params: { bookId },
      });
      setReviews(response.data);
      setSelectedBookId(bookId); // Set the current book for which reviews are fetched
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  // Handle review submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewContent || !reviewRating || !selectedBookId) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5002/api/reviews', {
        bookId: selectedBookId,
        userId, // Use the actual user ID here
        rating: reviewRating,
        content: reviewContent,
      });

      // Update reviews locally after successful submission
      setReviews((prevReviews) => [...prevReviews, response.data]);
      setReviewContent('');
      setReviewRating(0);
      alert('Review submitted successfully!');
    } catch (err) {
      console.error('Error submitting review:', err);
      alert('Failed to submit review.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Featured Books</h1>
      {/* Link to navigate to the Book Listing page */}
      <Link to="/books">
        <button className="browse-books-button">Browse All Books</button>
      </Link>
      <Link to={`/user/${userId}`}>
        <button className="user-profile-button">View User Profile</button>
      </Link>

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-item">
              <p><strong>Book Title:</strong> {book.title}</p>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Description:</strong> {book.description}</p>
              {/* Button to navigate to the individual book detail page */}
              <Link to={`/book/${book._id}`}>
                <button className="view-details-button">View Details</button>
              </Link>
              {/* Button to view and submit reviews for the book */}
              <button
                onClick={() => fetchReviews(book._id)}
                className="view-reviews-button"
              >
                View Reviews
              </button>
            </div>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>

      {/* Display reviews for the selected book */}
      {selectedBookId && (
        <div className="reviews-section">
          <h2>Reviews for Selected Book</h2>
          <div className="review-list">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="review-item">
                  <p><strong>User:</strong> {review.user?.name || 'Anonymous'}</p>
                  <p><strong>Rating:</strong> {review.rating}/5</p>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>No reviews available.</p>
            )}
          </div>

          {/* Review submission form */}
          <h3>Submit a Review</h3>
          <form onSubmit={handleReviewSubmit}>
            <textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="Write your review here"
              rows="5"
              cols="50"
              required
            />
            <br />
            <label>
              Rating:
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                required
              >
                <option value="" disabled>Select Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;




