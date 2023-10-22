import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, fontfamily} from '../../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../../Context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {getUserLocationInfo} from '../../../Remote/UserRemote';
import {useNavigation} from '@react-navigation/native';

export default function MainHeader({name, image, loading,refreshing}) {
  const {language, switchLanguage} = useContext(AuthContext);
  const [Locality, setLocality] = useState();
  const [Country, setCountry] = useState();
  const navigation = useNavigation();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const SwitchLang = () => {
    let Lang = language === 'English' ? 'Arabic' : 'English';
    switchLanguage(Lang);
  };

  async function fetchMyAPI() {
    const location = await getUserLocationInfo();
     console.log(location,"location")
    if (location) {
      setLocality(location.locality);
      setCountry(location.countryName);
    }
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);


  useEffect(()=>{
    fetchMyAPI()
  },[refreshing])

  return (
    <View style={styles.HeaderContainer}>
      <View style={styles.ContentLayout(language)}>
        <TouchableOpacity
          style={styles.profileLayout(language)}
          onPress={() => navigation.navigate('Profile')}>
          <View>
            {!loading ? (
              <Image
                style={styles.profileImage}
                source={
                  image != undefined
                    ? {uri: image}
                    : require('../../../../assets/images/profile.png')
                }
              />
            ) : (
              <View>
                <ShimmerPlaceholder style={styles.profileImage} />
              </View>
            )}
          </View>

          {/* Profile Name */}
          {!loading ? (
            <View style={{margin: 5, marginLeft: 8}}>
              <Text style={styles.profileName}>{name}</Text>
              <Text style={styles.locationLable}>
                {' '}
                {Locality != undefined
                  ? Locality + ' ,' + Country
                  : 'Please allow location permission'}
              </Text>
            </View>
          ) : (
            <View style={{margin: 5, marginLeft: 8}}>
              <ShimmerPlaceholder
                style={{width: 100, height: 10, marginTop: 5, borderRadius: 10}}
              />
              <ShimmerPlaceholder
                style={{
                  width: 140,
                  height: 10,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              />
            </View>
          )}
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          {/* Notification icon */}
          {!loading ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notification');
              }}>
              <LinearGradient
                colors={['#74C8FD', '#46A6F8']}
                style={styles.ButtonTouch}>
                <Image
                  style={styles.notificationImage}
                  source={require('../../../../assets/images/notification.png')}
                />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View>
              <ShimmerPlaceholder style={styles.ButtonTouch} />
            </View>
          )}

          {/* Language Switch */}
          {!loading ? (
            <TouchableOpacity
              onPress={() => {
                SwitchLang();
              }}>
              <Text
                style={{
                  marginTop: 10,
                  color: colors.textwhite,
                  textDecorationLine: 'underline',
                }}>
                {language === 'English' ? 'عربي' : 'English'}
              </Text>
            </TouchableOpacity>
          ) : (
            <ShimmerPlaceholder
              style={{width: 40, height: 10, marginTop: 10, borderRadius: 10}}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  HeaderContainer: {
    width: wp('100%'),
    height: hp('23%'),
    backgroundColor: colors.primarycolor,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    position: 'relative',
  },
  ContentLayout: language => ({
    flex: 1,
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    width: wp('95%'),
    height: hp('10%'),
    margin: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  }),
  profileLayout: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    height: 60,
    // backgroundColor:'green'
  }),
  notificationLayout: {},
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  profileName: {
    fontSize: 15,
    fontFamily: fontfamily.fontRegular,
    fontWeight: '500',
    color: colors.textwhite,
    lineHeight: 20,
  },
  notificationImage: {
    width: 18,
    height: 18,
  },
  locationLable: {
    fontSize: 10,
    fontFamily: fontfamily.fontRegular,
    fontWeight: '400',
    color: colors.textwhite,
    lineHeight: 20,
    opacity: 0.6,
  },
  ButtonTouch: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
