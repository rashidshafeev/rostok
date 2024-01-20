import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../redux/slices/userSlice';
import { request } from './axios';

// Check Login:
export const postAuthCheck = async (dispatch, data) => {
  try {
    const res = await request.post('/api/User/check', data);
    return { success: res?.data?.success, loginType: res?.data?.login_type };
  } catch (error) {
    return { success: false };
  }
};

// Auth with email
export const postAuthWithEmail = async (dispatch, data) => {
  dispatch(loginStart());
  const sendData = {
    login: data.login,
    password: data.password,
  };
  try {
    const res = await request.post('/api/User/auth', sendData);
    localStorage.setItem('rosstokToken', res?.data?.token);
    dispatch(loginSuccess(res?.data));
    return { success: res?.data?.success, resData: res?.data };
  } catch (error) {
    dispatch(loginFailure(error));
    return { success: false };
  }
};

// Register
export const postRegister = async (dispatch, data) => {
  dispatch(loginStart());
  const sendData = {
    name: data.name,
    phone: data.phone,
    email: data.email,
    password: data.password,
    legalRepresentative: data.legalRepresentative,
  };
  console.log(sendData);
  // try {
  //   const res = await request.post('/api/User/auth', sendData);
  //   localStorage.setItem('rosstokToken', res?.data?.token);
  //   dispatch(loginSuccess(res?.data));
  //   return { success: res?.data?.success, resData: res?.data };
  // } catch (error) {
  //   dispatch(loginFailure(error));
  //   return { success: false };
  // }
};
