import {DashboardStacks, HistoryStacks, ProfileStacks} from './Stacks';
import React, { useContext } from 'react';
import {
  activebookingsvg,
  activehomesvg,
  activeprofilesvg,
  inactivebookingsvg,
  inactivehomesvg,
  inactiveprofilesvg,
} from '../../assets/svg/Svg';

import { AuthContext } from '../Context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SvgXml} from 'react-native-svg';
import { TouchableOpacity } from 'react-native';
import {colors} from '../Constants/DesignContstants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTab = () => {

 const {language}=useContext(AuthContext)
  return (
    <Tab.Navigator
      initialRouteName="Homescreen"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingVertical: 1,
          paddingBottom: 15,
          paddingTop: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          backgroundColor: colors.primarycolor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarActiveTintColor: colors.secondarycolor1,
        tabBarInactiveTintColor: colors.textwhite,
      }}>
      <Tab.Screen
        detachInactiveScreens={true}
        name="Home"
        component={DashboardStacks}
        options={{
          tabBarLabel: language === 'English' ? 'Home' : 'بيت',
          tabBarItemStyle: {
            flex: 0.5,
            marginHorizontal: '10%',
          },

          tabBarIcon: ({color, size, focused}) => (
            <SvgXml
              xml={focused ? activehomesvg : inactivehomesvg}
            />
          ),
          tabBarHideOnKeyboard: true,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={HistoryStacks}
        options={{
          tabBarLabel: language === 'English' ? 'Bookings' : 'الحجوزات',
          tabBarItemStyle: {
            flex: 0.5,
            marginHorizontal: '10%',
          },

          tabBarIcon: ({color, size, focused}) => (
            <SvgXml xml={focused ? activebookingsvg : inactivebookingsvg} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStacks}
        options={{
          tabBarLabel: language === 'English' ? 'Profile' : 'حساب تعريفي',
          tabBarItemStyle: {
            flex: 0.5,
            marginHorizontal: '10%',
          },

          tabBarIcon: ({color, size, focused}) => (
            <SvgXml xml={focused ? activeprofilesvg : inactiveprofilesvg} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
