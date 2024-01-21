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
    // privacyPolicy: data.privacyPolicy,
    // legalRepresentative: data.legalRepresentative,
  };
  try {
    const res = await request.post('/api/User/register', sendData);
    localStorage.setItem('rosstokToken', res?.data?.token);
    if (res?.data?.success === 'ok') {
      dispatch(loginSuccess(res?.data));
    }
    return { success: res?.data?.success, resData: res?.data };
  } catch (error) {
    dispatch(loginFailure(error));
    return { success: false };
  }
};

export const postSendVerificationCode = async (phone) => {
  try {
    const res = await request.post('/api/User/phone/sendVerificationCode', {
      phone: phone,
    });

    return { data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const postConfirmVerificationCode = async (code, phone) => {
  const sendData = {
    phone: phone,
    code: code,
  };
  try {
    const res = await request.post(
      '/api/User/phone/confirmVerificationCode',
      sendData
    );

    return { data: res?.data };
  } catch (error) {
    return { success: false };
  }
};

export const logOutFetch = async (phone) => {
  try {
    const res = await request.post('/api/User/logout', phone);
    return { success: res?.data?.success };
  } catch (error) {
    return { success: false };
  }
};
