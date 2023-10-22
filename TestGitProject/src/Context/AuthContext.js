import {BASE_URL, axiosInstanceWithAuth} from '../Config/Config';
import React, {createContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import OneSignal from 'react-native-onesignal';
import Toast from 'react-native-toast-message';
import apiCall from '../Api-Services/index';
import axios from 'axios';
import dayjs from 'dayjs';
import {jwt_decode} from 'jwt-decode';
import {useNavigation} from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [UserToken, setUserToken] = useState(null);
  const [language, setLanguage] = useState('English');
  const [profiledata, setProfileData] = useState();
  const [dashboardData, setDashBoardData] = useState([]);
  const [address, setAddres] = useState();
  const [userData, setUserdata] = useState();

  //For Logout Action
  const switchLanguage = async lang => {
    setIsLoading(true);
    setLanguage(lang);
    setIsLoading(false);
  };

  const VerifyOtp = async (otp, mobile_number) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        otp: otp,
        mobile_number: mobile_number,
      });
      console.log(response?.data);

      if (response.data?.data?.new_customer !== true) {
        await AsyncStorage.setItem(
          'userToken',
          response.data?.data?.tokens?.accessToken,
        );
        await AsyncStorage.setItem(
          'refreshToken',
          response.data?.data?.tokens?.refreshToken,
        );
        setUserToken(response.data?.data?.tokens?.accessToken);

        
        OneSignal.sendTag(
          'user_id',
          response.data?.data?.tokens?.user_id.toString(),
        );
        OneSignal.sendTag(
          'user_type',
          response.data?.data?.tokens?.user_type.toString(),
        );
        
        OneSignal.getDeviceState().then((devicestate) => {
          console.log("Device State", devicestate.userId)
          UpdateSubId(devicestate.userId);
        })
        
        
      } else {
        navigation.navigate('Register');
      }
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

  // To send  sunscription id to one signal
  
  const UpdateSubId = async (subscription_id) => {
    try {
      const response = await axiosInstanceWithAuth.post(
        '/profile/update-subscription',
        {"subscription_id": subscription_id},
      );
      if (response?.data?.status === true) {
        console.log("subscription_id sent")
      }
    }
    catch(err) {
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
      return err.response.data;
    }
  }
  

  const CreateProfile = async reqobj => {
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/create-profile`,
        reqobj,
      );
      if (response.data?.status === true) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile Created Successfully',
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        await AsyncStorage.setItem(
          'userToken',
          response.data?.data?.accessToken,
        );
        await AsyncStorage.setItem(
          'refreshToken',
          response.data?.data?.refreshToken,
        );
        setUserToken(response.data?.data?.accessToken)
        OneSignal.sendTag('user_id', response.data.data.user_id.toString());
        OneSignal.sendTag('user_type', response.data.data.user_type.toString());
        OneSignal.getPermissionSubscriptionState(status => {
          console.log(status.userId, 'hgfihfhghfffjjdgfgfgf');
          // AsyncStorage.setItem('onesignal_id', status.userId);
        });
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
      return err.response.data;
    }
  };
  

  const checkToken = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const logouthandler = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    setUserToken(null);
    OneSignal.clearSubscriptionObservers();
  };

  useEffect(() => {
    checkToken();
  }, []);

  let contextValue = {
    userData,
    setUserdata,
    logouthandler,
    UserToken,
    setUserToken,
    isLoading,
    setIsLoading,
    language,
    switchLanguage,
    profiledata,
    dashboardData,
    setDashBoardData,
    address,
    setAddres,
    setProfileData,
    VerifyOtp,
    SendOtp: apiCall.SendOtpCall,
    ResendOtp: apiCall.ResendOtpCall,
    CreateProfile,
    AddAddresses: apiCall.AddAddressApi,
    GetAddress: apiCall.GetAllAddressApi,
    Onboard: apiCall.OnboardApiCall,
    Dashboard: apiCall.DashBoardApiCall,
    Profile: apiCall.ProfileApiCall,
    EditProfileCall: apiCall.EditProfileApi,
    MepLists: apiCall.MepListApi,
    LaundryCategory: apiCall.LaundryCategoryApi,
    LaundryServices: apiCall.LaunServiceMethodApi,
    MaidServiceApi: apiCall.MaidServiceApi,
    PestService: apiCall.PestServiceApi,
    UpdateAddress: apiCall.UpdateAddressApi,
    DeleteAddress: apiCall.DeleteAddressApi,
    BookService: apiCall.BookServiceApi,
    BookingHistory: apiCall.BookingHistoryApi,
    HistoryDetails: apiCall.HistoryDetailsApi,
    Notification: apiCall.GetNotification,
    InstantBook: apiCall.InstantBookingApi,
    PestCost: apiCall.PestCostApi,
    LaundryCost: apiCall.LaundryCostApi,
    MepCost: apiCall.MepCostApi,
    MaidCost:apiCall.MaidCostApi
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
