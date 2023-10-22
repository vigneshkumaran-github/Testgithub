import Toast from 'react-native-toast-message';
import {axiosInstanceWithAuth} from '../Config';

export const BookServiceApi = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.post('/service-bookings/book-service',reqobj);
    if (response.data.status === true) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Service Booked Successfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    return response.data;
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
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


export const InstantBookingApi = async (service_type,name,mobile_number) => {
  try {
    console.log(service_type);
    const response = await axiosInstanceWithAuth.post(
      '/service-bookings/instant-booking',
      {
        "service_type": service_type,
        "name": name,
        "mobile_number":mobile_number
        
      }
    );
    if (response.data.status === true) {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Service Booked Successfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      return response.data;
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    }
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
