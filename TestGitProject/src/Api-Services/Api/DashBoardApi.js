import {BASE_URL, axiosInstanceWithAuth} from '../Config';

import Toast from 'react-native-toast-message';

export const DashBoardApiCall = async () => {
  try {
    const response = await axiosInstanceWithAuth.post('/dashboard/data', {
      "version":"1.0"
    });
    return response?.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    Toast.show({
      type: 'error',
      text1: err.response.data.error.message,
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    console.log(err);
    return err.response.data;
  }
};

  
   
