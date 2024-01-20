// import {
//   loginFailure,
//   loginStart,
//   loginSuccess,
// } from '../redux/slices/userSlice';
import { request } from './axios';

// Login:
export const postAuthorization = async (dispatch, data) => {
  // dispatch(loginStart());

  try {
    const res = await request.post('/api/User/auth', data.loginInput);
    console.log(res);
    // dispatch(loginSuccess(res?.data));
    return { success: false };
  } catch (error) {
    // dispatch(loginFailure(error));
    return { success: false };
  }
};
