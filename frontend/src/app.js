// import React from 'react';

// function App() {
//   return (
//     <div>
//       <h1>Welcome to the Book Review Platform</h1>
//     </div>
//   );
// }

// export default App;



// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import BookListing from './components/BookListing';
// import BookDetail from './components/BookDetail';
// import UserProfile from './components/UserProfile';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" component={HomePage} />
//         <Route path="/books" element={<BookListing />} />
//         <Route path="/book/:id" element={<BookDetail />} />
//         <Route path="/user/:id" element={<UserProfile />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookListing from './components/BookListing';
import BookDetail from './components/BookDetail';
import UserProfile from './components/UserProfile';

function App() {
  // Sample book data for demonstration
  const books = [
    { _id: '1', title: 'Book One', author: 'Author One' },
    { _id: '2', title: 'Book Two', author: 'Author Two' },
  ];
  return (
    <Router>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/books" element={<BookListing />} />
    <Route path="/book/:id" element={<BookDetail />} />
    <Route path="/user/" element={<Navigate to="/profile" replace />} />
    <Route path="/user/:id" element={<UserProfile />} /> {/* Dynamic user profile */}
    <Route path="/profile" element={<UserProfile />} /> {/* Logged-in user's profile */}
  </Routes>
</Router>

     
  );
}

export default App;



