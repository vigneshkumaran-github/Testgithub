import AddAddress from '../Screens/Profile/Address/AddAddress';
import BookingHistory from '../Screens/BookingHistory';
import BookingInstantService from '../Screens/InstantBookings/BookingInstantService';
import BookingSuccess from '../Screens/Services/BookingSuccess';
import BottomTab from './BottomTab';
import Dashboard from '../Screens/Dashboard';
import EditAddress from '../Screens/Profile/Address/EditAddress';
import EditProfile from '../Screens/Profile/EditProfile';
import InstantBooking from '../Screens/InstantBookings';
import InstantThankYou from '../Screens/InstantBookings/InstantThankYou';
import LanguageChoose from '../Screens/Auth/LanguageChoose';
import LaundryBookingDetails from '../Screens/Services/Laundry/BookingDetails';
import LaundryPrice from '../Screens/Services/Laundry/LaundryPrice';
import LaundryServices from '../Screens/Services/Laundry/Services';
import LoginScreen from '../Screens/Auth/LoginScreen';
import MEPService from '../Screens/Services/MepScreens/MEPService';
import MaidOrderDetails from '../Screens/BookingHistory/MaidOrderDetails';
import MaidPrice from '../Screens/Services/MaidScreens/MaidPrice';
import MaidService from '../Screens/Services/MaidScreens/MaidService';
import MepOrderDetails from '../Screens/BookingHistory/MepOrderDetails';
import MepPrice from '../Screens/Services/MepScreens/MepPrice';
import NoBookings from '../Screens/BookingHistory/NoBookings';
import Notification from '../Screens/Notifications/Notification';
import OnboardingScreen from '../Screens/Auth/Onboarding/OnboardingScreen';
import OrderBookingsDetails from '../Screens/BookingHistory/OrderBookingsDetails';
import OtpScreen from '../Screens/Auth/OtpScreen';
import PestControl from '../Screens/Services/PestScreens/PestControl';
import PestReview from '../Screens/Services/PestScreens/PestReview';
import Pestprice from '../Screens/Services/PestScreens/Pestprice';
import Profile from '../Screens/Profile';
import React from 'react';
import RegisterScreen from '../Screens/Auth/RegisterScreen';
import ReviewService from '../Screens/Services/Laundry/ReviewService';
import SavedAddress from '../Screens/Profile/Address/SavedAddress';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const StackConfig = {headerShown: false};
const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const HistoryStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

export function AuthStacks() {
  return (
    <AuthStack.Navigator
      screenOptions={StackConfig}
      initialRouteName="Language">
      <AuthStack.Screen name="Onboarding" component={OnboardingScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Otp" component={OtpScreen} />
      <AuthStack.Screen name="Language" component={LanguageChoose} />
      <AuthStack.Screen name="Home" component={BottomStacks} />
    </AuthStack.Navigator>
  );
}
export function DashboardStacks() {
  return (
    <HomeStack.Navigator
      screenOptions={StackConfig}
      initialRouteName="Dashboard">
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
    </HomeStack.Navigator>
  );
}

export function HistoryStacks() {
  return (
    <HistoryStack.Navigator
      screenOptions={StackConfig}
      initialRouteName="BookingHistory">
      <HistoryStack.Screen name="BookingHistory" component={BookingHistory} />
      <HistoryStack.Screen name="NoBookings" component={NoBookings} />
    </HistoryStack.Navigator>
  );
}

export function ProfileStacks() {
  return (
    <ProfileStack.Navigator
      screenOptions={StackConfig}
      initialRouteName="Profile">
      <ProfileStack.Screen name="Profile" component={Profile} />
       <HistoryStack.Screen name="BookingHistory" component={HistoryStacks} /> 
    </ProfileStack.Navigator>
  );
}

export function BottomStacks() {
  return (
    <HomeStack.Navigator
      screenOptions={StackConfig}
      initialRouteName="BottomTab">
      <HomeStack.Screen name="BottomTab" component={BottomTab} />
      {/*Laundry Bookings Stack*/}
      <HomeStack.Screen name="LaundryServices" component={LaundryServices} />
      <HomeStack.Screen
        name="LaundryBookingDetails"
        component={LaundryBookingDetails}
      />
      <HomeStack.Screen name="ReviewService" component={ReviewService} />
      <HomeStack.Screen name="BookingSuccess" component={BookingSuccess} />
      {/* */}
      <HomeStack.Screen name="MaidService" component={MaidService} />
      <HomeStack.Screen name="PestControl" component={PestControl} />
      <HomeStack.Screen name="MEPService" component={MEPService} />
      <HomeStack.Screen name="PestReview" component={PestReview} />
      {/*Instant Bookings Stack*/}
      <HomeStack.Screen name="InstantBooking" component={InstantBooking} />
      <HomeStack.Screen
        name="BookingInstantService"
        component={BookingInstantService}
      />
      <HomeStack.Screen name="InstantThankYou" component={InstantThankYou} />
      {/*Bookings */}
      <HomeStack.Screen
        name="OrderBookingsDetails"
        component={OrderBookingsDetails}
      />
      <HomeStack.Screen name="MaidOrderDetails" component={MaidOrderDetails} />
      <HomeStack.Screen name="MepOrderDetails" component={MepOrderDetails} />

      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      <HomeStack.Screen name="Address" component={SavedAddress} />
      <HomeStack.Screen name="AddAddress" component={AddAddress} />
      <HomeStack.Screen name="EditAddress" component={EditAddress} />
      {/* NOTIFICATIONS */}
      <HomeStack.Screen name="Notification" component={Notification} />
      {/* Price Lists */}
      <HomeStack.Screen name="MaidPrice" component={MaidPrice} />
      <HomeStack.Screen name="PestPrice" component={Pestprice} />
      <HomeStack.Screen name="LaundryPrice" component={LaundryPrice} />
      <HomeStack.Screen name="MepPrice" component={MepPrice} />
    </HomeStack.Navigator>
  );
}
