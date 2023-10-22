import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {VerifyOtpCall, getToken} from '../../Api-Services/Api/AuthApi';
import {colors, fontfamily} from '../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomInput from '../../CustomComponents/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

export default function OtpScreen(route) {
  const mobile_number = route.route.params.mobile_number;
  const {language, ResendOtp, VerifyOtp} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const CELL_COUNT = 4;
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const apicall = async () => {
    setLoading(true);
    const verifydata = await VerifyOtp(value, mobile_number);
    if (verifydata?.status === true) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const resendcall = async () => {
    const result = await ResendOtp(mobile_number);
    console.log(result);
    if (result?.status === true) {
      Toast.show({
        type: 'success',
        text1: 'OTP Sent Successfully',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
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
            {language === 'English' ? 'Verify' : 'تسجيل الدخول'}
          </Text>
          <Text style={styles.lightText(language)}>
            {language === 'English'
              ? 'Please enter the 4-digit OTP sent to the number +974-XXXXXXXX'
              : 'إذا كان لديك حساب الرجاء إدخال رقم هاتفك المسجل'}
          </Text>
          <View
            style={{
              width: '95%',
              alignSelf: 'center',
            }}>
            <CodeField
              ref={ref}
              {...props}
              // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              returnKeyType="done"
              clearButtonMode="never"
              // textContentType="oneTimeCode"
              onSubmitEditing={Keyboard.dismiss}
              renderCell={({index, symbol, isFocused}) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
          </View>
          {language === 'English' ? (
            <Text style={styles.darkText}>
              Didn’t receive anything.{' '}
              <Text
                style={{
                  color: colors.lightcolor,
                  textDecorationLine: 'underline',
                }}
                onPress={() => {
                  resendcall();
                }}>
                Resend OTP
              </Text>
            </Text>
          ) : (
            <Text
              style={{
                color: colors.lightcolor,
                textDecorationLine: 'underline',
                marginHorizontal: 5,
              }}
              onPress={() => {
                resendcall();
              }}>
              يخلق
              <Text style={[styles.darkText, {marginEnd: 15}]}>
                ليس لديك حساب{' '}
              </Text>
            </Text>
          )}

          <View style={{alignSelf: 'center', marginTop: 50}}>
            <CustomButton
              loading={loading}
              lable={language === 'English' ? 'Verify' : 'تسجيل الدخول'}
              style={{width: wp('90%')}}
              onPress={() => {
                if (value.length !== 4) {
                  Toast.show({
                    type: 'error',
                    text1: 'Please Enter Valid Otp',
                    visibilityTime: 2000,
                    autoHide: true,
                    topOffset: 30,
                    bottomOffset: 40,
                  });
                  setLoading(false);
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
  },

  bottomContainer: language => ({
    padding: 10,
    width: wp('100%'),
    height: hp('60%'),
    alignItems: language === 'English' ? 'stretch' : 'stretch',
  }),
  headerText: {
    fontSize: 25,
    fontFamily: fontfamily.fontBold,
    color: colors.primarycolor,
    marginHorizontal: 5,
  },
  lightText: language => ({
    width: wp('70%'),
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.primarycolor,
    opacity: 0.4,
    lineHeight: 22,
    marginTop: 13,
    marginHorizontal: 5,
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end',
  }),
  darkText: {
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.textblack,
    lineHeight: 24,
    marginTop: 13,
    marginHorizontal: 5,
  },

  codeFieldRoot: {
      alignItems: 'center',
    marginTop: 25,
    justifyContent: 'center',
  },
  title: {textAlign: 'center', fontSize: 22},
 
  cell: {
    flex: 1,

    marginHorizontal: 5,
   paddingVertical:5,

    width: 46,

    height: 56,

    justifyContent: 'center',

    alignItems: 'center',

    borderWidth: 1,

    borderColor: colors.gray,

    borderRadius: 8,

    fontSize: 24,

    textAlign: 'center',

    lineHeight: 40,

    color: colors.primarycolor,
  },
  focusCell: {
    borderColor: '#F1984F',
  },
});
