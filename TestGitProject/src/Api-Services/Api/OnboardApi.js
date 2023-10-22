import { BASE_URL } from '../Config';
import axios from 'axios';

export const OnboardApiCall = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/onboard`);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data.error.message);
    return err.response.data;
  }
};
