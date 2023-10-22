import Toast from 'react-native-toast-message';
import {axiosInstanceWithAuth} from '../Config';

export const LaunServiceMethodApi = async (reqobj) => {
  try {
    const response = await axiosInstanceWithAuth.get('/laundry/service-methods', reqobj);
    return response.data;
  } catch (err) {
    console.error(err.response.data.error.message);
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

export const LaundryCostApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.get(
      '/laundry/service-cost',
      reqobj,
    );
    return response.data;
  } catch (err) {
    console.error(err.response.data.error.message);
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



export const LaundryCategoryApi = async (reqobj) => {
  try {
    const response = await axiosInstanceWithAuth.get('/laundry/service-list', reqobj);
    return response.data;
  } catch (err) {
    console.error(err.response.data.error.message);
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
