import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  organizations: [],
  loading: false,
  error: null,
};

export const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    addOrganization: (state, action) => {
        state.organizations.push({...action.payload});
    
    }
  },
});

export const {
 addOrganization
} = organizationsSlice.actions;
export default organizationsSlice.reducer;