import { BASE_URL, axiosInstanceWithAuth } from '../Config';

import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';

export const ProfileApiCall = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.get('/profile/get-details')
    
    return response.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: err.response.data.error.message,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    return err.response.data;
  }
};






export const EditProfileApi = async (reqobj) => {
  try {
    const axiosInstance = axios.create({
      headers: {
        'Content-type': 'multipart/form-data',
        Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
      },
    });

    console.log('REQUEST>>>', reqobj);
    const response = await axiosInstance.post(
      `${BASE_URL}/profile/update`,
      reqobj,
    );
    console.log('EDIT DATA >>>', response?.data);
    return response?.data;
    // return response;
  } catch (err) {
    console.log(err.response.data);
    Alert.alert(err.response);
    return err;
  }
};

