// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchBooks } from '../redux/bookSlice';

// const BookListing = () => {
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
//       <h1>All Books</h1>
//       <ul>
//         {books.map((book) => (
//           <li key={book._id}>
//             <h3>{book.title}</h3>
//             <p>{book.author}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookListing;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './BookListing.css';

// const BookListing = () => {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [author, setAuthor] = useState('');
//   const [genre, setGenre] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async (filters = {}) => {
//     setLoading(true);
//     try {
//       const response = await axios.get('http://localhost:5002/api/books', { params: filters });
//       setBooks(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError('Error fetching books');
//       setLoading(false);
//     }
//   };

//   const handleSearch = () => {
//     fetchBooks({ search, author, genre });
//   };

//   return (
//     <div>
//       <h1>Book Listing</h1>
//       <div className="filter-bar">
//         <input
//           type="text"
//           placeholder="Search by title"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Search by author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <select value={genre} onChange={(e) => setGenre(e.target.value)}>
//           <option value="">Filter by genre</option>
//           <option value="Fiction">Fiction</option>
//           <option value="Non-Fiction">Non-Fiction</option>
//           <option value="Fantasy">Fantasy</option>
//           <option value="Science">Science</option>
//           {/* Add more genres as needed */}
//         </select>
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {loading && <div>Loading...</div>}
//       {error && <div>{error}</div>}

//       <div className="book-list">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book._id} className="book-item">
//               <h3>{book.title}</h3>
//               <p><strong>Author:</strong> {book.author}</p>
//               <p><strong>Genre:</strong> {book.genre}</p>
//               <p>{book.description}</p>
//             </div>
//           ))
//         ) : (
//           <p>No books found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookListing;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './BookListing.css';

// const BookListing = () => {
//   const [books, setBooks] = useState([]);
//   const [search, setSearch] = useState('');
//   const [author, setAuthor] = useState('');
//   const [genre, setGenre] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Function to fetch books based on filters
//   const fetchBooks = async (filters = {}) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axios.get('http://localhost:5002/api/books', { params: filters });
//       setBooks(response.data);
//     } catch (err) {
//       setError('Error fetching books');
//     } finally {
//       setLoading(false);
//     }
//   };



//   // Handle the search button click
//   const handleSearch = () => {
//     fetchBooks({ search, author, genre });
//   };

//   return (
//     <div>
//       <h1>Book Listing</h1>
//       <div className="filter-bar">
//         <input
//           type="text"
//           placeholder="Search by title"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Search by author"
//           value={author}
//           onChange={(e) => setAuthor(e.target.value)}
//         />
//         <select value={genre} onChange={(e) => setGenre(e.target.value)}>
//           <option value="">Filter by genre</option>
//           <option value="Fiction">Fiction</option>
//           <option value="Non-Fiction">Non-Fiction</option>
//           <option value="Fantasy">Fantasy</option>
//           <option value="Science">Science</option>
//         </select>
//         <button onClick={handleSearch}>Search</button>
//       </div>

//       {/* Display loading and error states */}
//       {loading && <div>Loading...</div>}
//       {error && <div>{error}</div>}

//       {/* Display search results */}
//       <div className="book-list">
//         {books.length > 0 ? (
//           books.map((book) => (
//             <div key={book._id} className="book-item">
//               <h3>{book.title}</h3>
//               <p><strong>Author:</strong> {book.author}</p>
//               <p><strong>Genre:</strong> {book.genre}</p>
//               <p>{book.description}</p>
//             </div>
//           ))
//         ) : (
//           !loading && <p>No books found. Use the search bar above to find books.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookListing;




import React, { useState } from 'react';
import axios from 'axios';
import './BookListing.css';

const BookListing = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooks = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5002/api/books', { params: filters });
      setBooks(response.data);
    } catch (err) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filters = {
      search: search || undefined,
      author: author || undefined,
      genre: genre || undefined,
    };
    fetchBooks(filters); // Fetch books based on filters
  };

  return (
    <div>
      <h1>Book Listing</h1>
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Filter by genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Science">Science</option>
          {/* Add more genres if needed */}
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <div className="book-list">
        {books.length > 0 ? (
          books.map((book) => (
            <div key={book._id} className="book-item">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p>{book.description}</p>
            </div>
          ))
        ) : (
          !loading && <p>No books found. Use the search bar above to find books.</p>
        )}
      </div>
    </div>
  );
};

export default BookListing;
