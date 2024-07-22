// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   comparison: [],
//   loading: false,
//   error: null,
// };

// export const comparisonSlice = createSlice({
//   name: 'comparison',
//   initialState,
//   reducers: {
//     fetchComparison: (state) => {
//       // No need to handle token here, as it's for initial fetch
//     },
//     setComparison: (state, action) => {
//       state.comparison = action.payload || [];
//     },
//     toggleComparison: (state, action) => {
//       const token = state.user?.token;
//       if (!token) {
//         const product = state.comparison.find((item) => item.id === action.payload.id);
//         if (product) {
//           state.comparison = state.comparison.filter((item) => item.id !== action.payload.id);
//         } else {
//           state.comparison.push({ ...action.payload });
//         }
//       }
//     },
//   },
// });

// export const {
//   fetchComparison,
//   setComparison,
//   toggleComparison,
// } = comparisonSlice.actions;
// export default comparisonSlice.reducer;

// src/features/comparison/comparisonSlice.ts
// src/features/comparison/comparisonSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { getTokenFromCookies } from '../../helpers/cookies/cookies';

const initialState = {
  comparison: [],
  loading: false,
  error: null,
};

export const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    fetchComparison: (state) => {
      // No need to handle token here, as it's for initial fetch
    },
    setComparison: (state, action) => {
      state.comparison = action.payload || [];
    },
    addToComparison: (state, action) => {
      const token = getTokenFromCookies();
      if (!token) {
        state.comparison.push({ ...action.payload });
      }
    },
    removeFromComparison: (state, action) => {
      const token = getTokenFromCookies();
      if (!token) {
        state.comparison = state.comparison.filter((item) => item.id !== action.payload.id);
      }
    },
  },
});

export const { fetchComparison, setComparison, addToComparison, removeFromComparison } = comparisonSlice.actions;
export default comparisonSlice.reducer;
