import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors, fontfamily} from '../../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../Context/AuthContext';
import {Banner} from 'react-native-paper';
import InstantBookingComponent from './InstantBooking';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {useNavigation} from '@react-navigation/core';

export default function MainServices({Data, BannerData, loading}) {
  const navigation = useNavigation();

  const {language} = useContext(AuthContext);
  const ServiceData = Data;
  const banner = BannerData && BannerData[0]?.image;
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const shimmerData = [1, 2, 3, 4];

  const ServiceRedirect = tag => {
    if (tag === 'laundry') {
      navigation.navigate('LaundryBookingDetails');
    } else if (tag === 'maid_and_beautician') {
      navigation.navigate('MaidService');
    } else if (tag === 'mep') {
      navigation.navigate('MEPService');
    } else if (tag === 'pest_control') {
      navigation.navigate('PestControl');
    } else {
      Alert.alert('Warning!', 'No Service Available');
    }
  };

  return (
    <View style={styles.ServiceContainer}>
      {/* Banner View */}
      {!loading ? (
        <View style={styles.bannerStyle}>
          <Image
            style={styles.bannerImage}
            source={{uri: banner && banner}}
            // source={require('../../../../assets/images/topbanner.jpg')}
          />
        </View>
      ) : (
        <View style={styles.bannerStyle}>
          <ShimmerPlaceholder style={styles.bannerImage} />
        </View>
      )}

      {!loading
        ? ServiceData &&
          ServiceData.map((item, id) => (
            <TouchableOpacity
              style={styles.SingleService(language)}
              key={id}
              onPress={() => ServiceRedirect(item?.tag)}>
              <View style={styles.ImageContainer(language)}>
                <Image
                  style={styles.serviceImage}
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../../../../assets/images/service1.png')
                  }
                />
                <Text style={styles.ServiceLable(language)}>
                  {language === 'English'
                    ? item?.title
                    : item?.translations[0]?.value}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  ServiceRedirect(item?.tag);
                }}>
                <LinearGradient
                  colors={[colors.secondarycolor, colors.secondarycolor1]}
                  style={styles.ButtonTouch}>
                  <MaterialIcons
                    name={'chevron-right'}
                    size={20}
                    color={colors.textblack}
                  />
                </LinearGradient>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        : shimmerData.map((item, index) => (
            <View style={{marginTop: 10}} key={index}>
              <ShimmerPlaceholder
                key={index}
                style={{
                  width: wp('90%'),
                  height: hp('10%'),
                  marginBottom: 0,
                  borderRadius: 10,
                }}
              />
            </View>
          ))}

      {/* {!loading ? (
        <InstantBookingComponent />
      ) : (
          <View style={{ alignSelf: 'flex-end', marginHorizontal: 15, flexDirection: 'row' }}>
            <ShimmerPlaceholder style={{width:100,height:14,borderRadius:10,alignSelf:'center',marginHorizontal:10}} />
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
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  ServiceContainer: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: 15,
    bottom: hp('12%'),
  },
  bannerStyle: {
    width: '90%',
    height: 150,
    borderRadius: 13,
    overflow: 'hidden',
  },
  bannerImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
    borderRadius: 13,
  },

  SingleService: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%'),
    backgroundColor: colors.primarycolor,
    height: hp('10%'),
    shadowColor: 'black',
    // shadowOpacity: 1,
    // elevation: 2,
    marginTop: 10,
    borderRadius: 10,
    padding: 15,
  }),
  ImageContainer: language => ({
    width: wp('70%'),
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
  }),
  serviceImage: {
    width: 45,
    height: 45,
  },
  ServiceLable: language => ({
    fontSize: 18,
    fontFamily: fontfamily.fontRegular,
    lineHeight: 20,
    color: colors.textwhite,
    marginLeft: language === 'English' ? 18 : 0,
    marginRight: language === 'English' ? 0 : 48,
  }),
  ButtonTouch: {
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
