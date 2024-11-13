import { OrganizationsState } from '@/types/Store/Organizations/OrganizationsState';
import { createSlice } from '@reduxjs/toolkit';

const initialState: OrganizationsState = {
    organizations: [],
};

export const organizationsSlice = createSlice({
    name: 'organizations',
    initialState,
    reducers: {
        addOrganization: (state, action) => {
            state.organizations.push({ ...action.payload });
        },
        deleteOrganization: (state, action) => {
            const organization = state.organizations.find((org) => org.inn === action.payload.inn)

            if (organization) {
                state.organizations = state.organizations.filter((org) => org.inn !== action.payload.inn)
            }
        },
        updateOrganization: (state, action) => {
            const organization = state.organizations.find((org) => org.inn === action.payload.organization.inn)
            Object.assign(organization, action.payload.data )
        }
    }
});

export const {
    addOrganization,
    deleteOrganization,
    updateOrganization
} = organizationsSlice.actions;
export default organizationsSlice.reducer;