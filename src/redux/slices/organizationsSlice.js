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
            state.organizations.push({ ...action.payload });

        },
        deleteOrganization: (state, action) => {
            console.log(action.payload)
            const organization = state.organizations.find((org) => org.inn === action.payload.inn)

            if (organization) {
                state.organizations = state.organizations.filter((org) => org.inn !== action.payload.inn)
            }
        },
        updateOrganization: (state, action) => {
            console.log(action.payload)
            const organization = state.organizations.find((org) => org.inn === action.payload.organization.inn)
            // const updated = { ...organization, ...action.payload.data }
            Object.assign(organization, action.payload.data )
            console.log(organization)
        }
    }
});

export const {
    addOrganization,
    deleteOrganization,
    updateOrganization
} = organizationsSlice.actions;
export default organizationsSlice.reducer;