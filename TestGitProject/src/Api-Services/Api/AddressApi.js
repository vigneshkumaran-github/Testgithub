import {BASE_URL, axiosInstanceWithAuth} from '../Config';
import React, {useContext} from 'react';

import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import  Toast  from 'react-native-toast-message';

export const GetAllAddressApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.get(
      `${BASE_URL}/address/get-all`,
    );
    console.log(
      '***************** GET ALL ADDRESS **************************************',
    );
    console.log('ALL ADDRESS DATA >>>', response.data);

    return response.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    Alert.alert(err.response.data.error.message);
    console.log(err);
    console.log(reqobj);
    return err.response.data;
  }
};

export const AddAddressApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.post(
      `${BASE_URL}/address/add-new`,
      reqobj,
    );
   
    console.log('NEW ADDRESS DATA >>>', response.data);
     if (response.data.status === true) {
       Toast.show({
         type: 'success',
         text1: 'Success',
         text2: response?.data.message,
         visibilityTime: 2000,
         autoHide: true,
         topOffset: 30,
         bottomOffset: 40,
       });
     } else {
       Toast.show({
         type: 'error',
         text1: 'Error',
         text2: '',
         visibilityTime: 2000,
         autoHide: true,
         topOffset: 30,
         bottomOffset: 40,
       });
       return response.data;
     }
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
    console.log(err);
    console.log(reqobj);
    return err.response.data;
  }
};

export const UpdateAddressApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.post(
      `${BASE_URL}/address/update`,
      reqobj,
    );
    if (response.data.status === true) {
       Toast.show({
         type: 'success',
         text1: 'Success',
         text2: response?.data.message,
         visibilityTime: 2000,
         autoHide: true,
         topOffset: 30,
         bottomOffset: 40,
       });
      return response.data;
    }
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

export const DeleteAddressApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.post(
      `${BASE_URL}/address/delete`,
      reqobj,
    );
    console.log(
      '***************** DELETE ADDRESS **************************************',
    );
    console.log('DELETE ADDRESS DATA >>>', response.data);
    if (response.data.status === true) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: response?.data.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: '',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return response.data;
    }
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
    console.log(err);
    console.log(reqobj);
    return err.response.data;
  }
};
