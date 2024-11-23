// import { createSlice } from '@reduxjs/toolkit';

// export const bookSlice = createSlice({
//   name: 'books',
//   initialState: {
//     books: [],
//     loading: false,
//     error: null
//   },
//   reducers: {
//     fetchBooksRequest: (state) => {
//       state.loading = true;
//     },
//     fetchBooksSuccess: (state, action) => {
//       state.books = action.payload;
//       state.loading = false;
//     },
//     fetchBooksFailure: (state, action) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
// });

// export const { fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure } = bookSlice.actions;

// export const fetchBooks = () => async (dispatch) => {
//   dispatch(fetchBooksRequest());
//   try {
//     const response = await fetch('http://localhost:5002/api/books');
//     const data = await response.json();
//     dispatch(fetchBooksSuccess(data));
//   } catch (error) {
//     dispatch(fetchBooksFailure(error.toString()));
//   }
// };

// export default bookSlice.reducer;





// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
//   const response = await fetch('http://localhost:5002/api/books');
//   const data = await response.json();
//   return data;
// });

// const bookSlice = createSlice({
//   name: 'books',
//   initialState: { books: [], loading: false, error: null },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBooks.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBooks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.books = action.payload;
//       })
//       .addCase(fetchBooks.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default bookSlice.reducer;






import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch books from API
export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('http://localhost:5002/api/books');
  return response.data;
});

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default bookSlice.reducer;
