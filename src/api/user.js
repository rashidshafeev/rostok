import { api } from '../redux/api/api';
import {
  loginFailure,
  loginStart,
  loginSuccess,
  setToken,
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
export const postAuthWithEmail = async (dispatch, data, favoriteItems) => {
  dispatch(loginStart());
  const sendData = {
    login: data.login,
    password: data.password,
  };
  try {
    const res = await request.post('/api/User/auth', sendData);
    const token = res?.data?.token;
    if (token) {
      dispatch(setToken(token));
      dispatch(loginSuccess(res?.data));

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      if (favoriteItems?.length > 0) {
        await request.post(
          '/api/ProductsFavourites/set',
          { ids: favoriteItems },
          config
        );
        dispatch(api.util.invalidateTags([{ type: 'Favorite', id: 'LIST' }]));
      }
    }
    return { success: res?.data?.success, resData: res?.data };
  } catch (error) {
    dispatch(loginFailure(error));
    return { success: false, error: error.message };
  }
};

// Register
export const postRegister = async (dispatch, data, favoriteItems) => {
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
    const token = res?.data?.token;
    if (res?.data?.success === 'ok') {
      if (token && favoriteItems?.length > 0) {
        dispatch(setToken(token));
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        await request.post(
          '/api/ProductsFavourites/set',
          { ids: favoriteItems },
          config
        );
        dispatch(api.util.invalidateTags([{ type: 'Favorite', id: 'LIST' }]));
      }
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

export const updateProfile = async (sendData, token) => {
  try {
    const res = await request.post('/api/Profile/saveInfo', sendData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert('Ошибка! Данная функция в процессе разработки.');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
