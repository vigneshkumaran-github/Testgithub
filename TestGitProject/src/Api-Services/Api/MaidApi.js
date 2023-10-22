import Toast from 'react-native-toast-message';
import {axiosInstanceWithAuth} from '../Config';

export const MaidServiceApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.get('/maid/service-list', reqobj);
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

export const MaidCostApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.get(
      '/maid/service-cost',
      reqobj,
    );
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
