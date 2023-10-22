import Toast from 'react-native-toast-message';
import {axiosInstanceWithAuth} from '../Config';

export const BookingHistoryApi = async (service_type, page) => {
  try {
    const response = await axiosInstanceWithAuth.post('/history/get-history', {
      service_type:service_type,
      page: page,
    });
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

export const HistoryDetailsApi = async (reqobj) => {
  try {
    const response = await axiosInstanceWithAuth.post('/history/detail',reqobj);
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
    console.log(response)
    return err.response.data;
  }
};
