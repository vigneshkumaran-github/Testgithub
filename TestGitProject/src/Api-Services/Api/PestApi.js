import { BASE_URL, axiosInstanceWithAuth } from '../Config';

import Toast from 'react-native-toast-message';

export const PestServiceApi = async () => {
 try {
   const response = await axiosInstanceWithAuth.get('/pest/service-list');
   console.log(response.data)
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

export const PestCostApi = async () => {
  try {
    const response = await axiosInstanceWithAuth.get('/pest/service-cost');
    console.log(response.data?.data?.pest_control_service,"PEST COST>>>");
    return response?.data;
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
    return err?.response?.data;
  }
};





