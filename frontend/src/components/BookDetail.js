



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const BookDetail = () => {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     // Fetch book details
//     fetch(`/api/books/${id}`)
//       .then((response) => response.json())
//       .then((data) => setBook(data))
//       .catch((error) => console.error('Error fetching book:', error));

//     // Fetch book reviews
//     fetch(`/api/reviews?bookId=${id}`)
//       .then((response) => response.json())
//       .then((data) => setReviews(data))
//       .catch((error) => console.error('Error fetching reviews:', error));
//   }, [id]);

//   if (!book) return <p>Loading book details...</p>;

//   return (
//     <div>
//       <h1>{book.title}</h1>
//       <p><strong>Author:</strong> {book.author}</p>
//       <p><strong>Description:</strong> {book.description}</p>
//       <p><strong>Genre:</strong> {book.genre}</p>

//       <h2>Reviews</h2>
//       {reviews.length > 0 ? (
//         reviews.map((review) => ( 
//           <div key={review._id}>
//             <p><strong>{review.reviewer}:</strong> {review.content}</p>
//           </div>
//         ))
//       ) : (
//         <p>No reviews yet.</p>
//       )}
//     </div>
//   );
// };

// export default BookDetail;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get URL params

const BookDetail = () => {
  const { id } = useParams(); // Extract book ID from the URL
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        // Fetch book details
        const bookResponse = await axios.get(`http://localhost:5002/api/books/${id}`);
        setBook(bookResponse.data);

        // Fetch book reviews (assuming reviews are stored in the book object)
        const reviewsResponse = await axios.get(`http://localhost:5002/api/books/${id}/reviews`);
        setReviews(reviewsResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Error fetching book details');
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {book && (
        <div>
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <h3>Reviews</h3>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="review-item">
                <p><strong>{review.user}</strong>: {review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetail;
