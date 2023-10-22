import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors, fontfamily} from '../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../Context/AuthContext';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomInput from '../../CustomComponents/CustomInput';
import OneSignal from 'react-native-onesignal';
import {SendOtpCall} from '../../Api-Services/Api/AuthApi';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const {language} = useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const apicall = async () => {
    setLoading(true);
    const logindata = await SendOtpCall(mobileNumber);
    if (logindata?.status === true) {
      navigation.navigate('Otp',{mobile_number:mobileNumber});
      setLoading(false);
    } else {
      setLoading(false);
    }
     
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={colors.textwhite} barStyle="dark-content" />
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.LogoContainer}>
          <Image
            source={require('../../../assets/images/applogo1.png')}
            style={{width: 400, height: 320, resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.bottomContainer(language)}>
          <Text style={styles.headerText}>
            {language === 'English' ? 'Login' : 'تسجيل الدخول'}
          </Text>
          <Text style={styles.lightText}>
            {language === 'English'
              ? 'Please enter your phone number'
              : 'الرجاء إدخال رقم هاتفك'}
          </Text>

          <CustomInput
            inputMode={'numeric'}
            placeholderText={'+974'}
            iconName={'md-call-outline'}
            maxLength={8}
            onChangeText={text => setMobileNumber(text)}
          />
          <View style={{alignSelf: 'center', marginTop: 50}}>
            <CustomButton
              loading={loading}
              lable={language === 'English' ? 'LOGIN' : 'تسجيل الدخول'}
              style={{width: wp('90%')}}
              onPress={() => {
                if (mobileNumber.length !== 8) {
                  Toast.show({
                    type: 'error',
                    text1: 'Please Enter Valid Mobile Number',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                  });
                } else {
                  apicall();
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },

  LogoContainer: {
    width: wp('100%'),
    height: hp('40%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30
  },

  bottomContainer: language => ({
    padding: 10,
    width: wp('100%'),
    height: hp('60%'),
    alignItems: language === 'English' ? 'stretch' : 'flex-end',
  }),
  headerText: {
    fontSize: 25,
    fontFamily: fontfamily.fontBold,
    color: colors.primarycolor,
  },
  lightText: {
    width: wp('70%'),
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.primarycolor,
    opacity: 0.4,
    lineHeight: 22,
    marginTop: 13,
    marginLeft: 4,
  },
  darkText: {
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.textblack,
    lineHeight: 24,
    marginTop: 13,
  },
});
