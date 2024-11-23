import { fetchBooks } from "../../api";

export const fetchAllBooks = () => async (dispatch) => {
  const { data } = await fetchBooks();
  dispatch({ type: "FETCH_BOOKS_SUCCESS", payload: data });
};
