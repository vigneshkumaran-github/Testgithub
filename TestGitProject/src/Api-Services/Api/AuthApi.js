import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../Config';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export const SendOtpCall = async (mobile_number) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/send-otp`, {
      mobile_number: mobile_number,
    });
    if (response.data?.status === true) {
      Toast.show({
        type: 'success',
        text1: 'OTP Sent Successfully',
        text2: 'Please Check Your Mobile',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    return response.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    Toast.show({
      type: 'error',
      text1: err.response.data.error.message,
      text2: 'Please check your mobile number',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    console.log(err);
    return err.response.data;
  }
};

   
export const ResendOtpCall = async (mobile_number) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/resend-otp`, {
      mobile_number: mobile_number,
    });
    if (response.data?.status === true) {
      Toast.show({
        type: 'success',
        text1: 'OTP Sent Successfully',
        text2: 'Please Check Your Mobile',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
    return response.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    Toast.show({
      type: 'error',
      text1: err.response.data.error.message,
      text2: 'Please check your mobile number',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    console.log(err);
    return err.response.data;
  }
};


export const getToken = async () => {
  const token = await AsyncStorage.getItem('userToken');
  // console.log('token', token);
  return token;
};
