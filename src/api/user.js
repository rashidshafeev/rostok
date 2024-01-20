// import {
//   loginFailure,
//   loginStart,
//   loginSuccess,
// } from '../redux/slices/userSlice';
import { request } from './axios';

// Login:
export const postAuthCheck = async (dispatch, data) => {
  // dispatch(loginStart());

  try {
    const res = await request.post('/api/User/check', data);
    // dispatch(loginSuccess(res?.data));
    return { success: true, loginType: res?.data?.login_type };
  } catch (error) {
    // dispatch(loginFailure(error));
    return { success: false };
  }
};
