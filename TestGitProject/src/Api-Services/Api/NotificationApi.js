import {BASE_URL, axiosInstanceWithAuth} from '../Config';
import React, {useContext} from 'react';

import {Alert} from 'react-native';

export const GetNotification = async reqobj => {
  try {
    const response = await axiosInstanceWithAuth.get(
      '/profile/notifications',
    );
    console.log('Notifications >>>', response.data);

    return response.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    Alert.alert(err.response.data.error.message);
    console.log(err);
    console.log(reqobj);
    return err.response.data;
  }
};
