// import { configureStore } from '@reduxjs/toolkit';
// import bookReducer from './bookSlice';

// const store = configureStore({
//   reducer: {
//     books: bookReducer,
//   },
// });

// export default store;




import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;



