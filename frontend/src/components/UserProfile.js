



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import './UserProfile.css'; // Optional: Add styles for the profile page

// const UserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         // Replace this URL with your backend endpoint to fetch user details
//         const response = await axios.get('http://localhost:5002/api/user'); 
//         setUser(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching user details');
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="user-profile">
//       <h1>User Profile</h1>
//       {user && (
//         <div>
//           <p><strong>Name:</strong> {user.name}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           {/* Add more user fields as needed */}
//           <p><strong>Favorite Books:</strong></p>
//           {user.favoriteBooks && user.favoriteBooks.length > 0 ? (
//             <ul>
//               {user.favoriteBooks.map((book, index) => (
//                 <li key={index}>{book}</li>
//               ))}
//             </ul>
//           ) : (
//             <p>No favorite books listed.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfile;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserProfile = ({ userId }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/api/users/${userId}`);
//         setUser(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching user profile');
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [userId]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h1>User Profile</h1>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Favorite Books:</strong> {user.favoriteBooks.join(', ')}</p>
//     </div>
//   );
// };

// export default UserProfile;


import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('User ID is missing.');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/users/${id}`);
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user profile.');
      }
    };

    fetchUser();
  }, [id]);

  if (error) return <Navigate to="/profile" replace />; // Redirect if there's an error or missing ID
  if (!user) return <div>Loading user profile...</div>;

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Joined: {user.createdAt}</p>
    </div>
  );
};

export default UserProfile;
