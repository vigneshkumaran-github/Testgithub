import {
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import CustomButton from '../../CustomComponents/CustomButton';
import {DashBoardApiCall} from '../../Api-Services/Api/DashBoardApi';
import Geolocation from '@react-native-community/geolocation';
import InstantBookingComponent from './Components/InstantBooking';
import LinearGradient from 'react-native-linear-gradient';
import MainHeader from './Components/Header';
import MainServices from './Components/Services';
import {ProfileApiCall} from '../../Api-Services/Api/ProfileApi';
import ShimmerEffect from './Components/ShimmerEffect';
import {colors} from '../../Constants/DesignContstants';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import {useNavigation} from '@react-navigation/native';

export default function Dashboard() {
  const [serviceData1, setServiceData] = useState([]);
  const [bannerdata, setBannerData] = useState([]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [datas, setDatas] = useState();
  const {setDashBoardData} = useContext(AuthContext);
  const {Dashboard, Profile, setUserdata} = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
    const [currentLongitude, setCurrentLongitude] = useState('...');
    const [currentLatitude, setCurrentLatitude] = useState('...');
    const [locationStatus, setLocationStatus] = useState('');

  const apicall = async () => {
      setLoading(true);
    const result = await Dashboard();
    if (result?.status === true) {
      setDatas(result?.data);
      setServiceData(result?.data?.serviceData);
      setBannerData(result?.data?.bannerData);
      setDashBoardData(result?.data?.serviceData);
      setUserdata(result?.data?.user);
    }
      setLoading(false);
  };

  useEffect(() => {
    apicall()
  }, [])


  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');
        console.log(position.coords.longitude, 'long');
        console.log(position.coords.latitude, 'lat');
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
        console.log(error)
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change
        setLocationStatus('You are Here');

        const jsonValue = JSON.stringify(position.coords);
        console.log(jsonValue);
        AsyncStorage.setItem('location_details', jsonValue);
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
        console.log("sub",error)
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  };
  
  


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    apicall();
    getOneTimeLocation()
    subscribeLocationLocation()
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primarycolor}
            colors={[colors.lightcolor, colors.primarycolor]}
          />
        }
        style={styles.Container}>
        <MainHeader
        refreshing={refreshing}
          loading={isLoading}
          name={datas?.user?.name}
          image={datas?.user?.profile_photo ? datas?.user?.profile_photo : null}
        />
        <MainServices
          loading={isLoading}
          Data={serviceData1}
          BannerData={bannerdata}
        />
        {!isLoading ? (
          <InstantBookingComponent />
        ) : (
          <View
            style={{
              alignSelf: 'flex-end',
              marginHorizontal: 15,
              flexDirection: 'row',
              marginRight: 16,
              position: 'absolute',
              bottom: 0,
              right: 10,
            }}>
            <ShimmerPlaceholder
              style={{
                width: 100,
                height: 14,
                borderRadius: 10,
                alignSelf: 'center',
                marginHorizontal: 10,
              }}
            />
            <ShimmerPlaceholder
              style={{
                width: 55,
                height: 55,
                borderRadius: 55 / 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: '#C4EBFD',
              }}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
});
