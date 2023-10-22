import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors, fontfamily} from '../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import {Checkbox} from 'react-native-paper';
import {CreateProfileApiCall} from '../../Api-Services/Api/AuthApi';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomInput from '../../CustomComponents/CustomInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { SvgXml } from 'react-native-svg';
import  Toast  from 'react-native-toast-message';
import { checksvg } from '../../../assets/svg/Svg';
import {useNavigation} from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const {language, CreateProfile} = useContext(AuthContext);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('974');

  const reqobj = {
    name: name,
    email: email,
    mobile_number: mobileNumber,
    country_code: '974',
  };

  const apicall = async () => {
    const registerdata = await CreateProfile(reqobj);
    if (registerdata?.status === true) {
         navigation.replace('Home');
         console.log(registerdata?.status)
    }
  };

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={colors.textwhite} barStyle="dark-content" />
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.LogoContainer}>
          <Image
            source={require('../../../assets/images/applogo.png')}
            style={{width: 100, height: 130, resizeMode: 'contain'}}
          />
        </View>
        <View style={styles.bottomContainer(language)}>
          <Text style={styles.headerText}>
            {language === 'English' ? 'Register' : 'تسجيل الدخول'}
          </Text>
          <Text style={styles.lightText}>
            {language === 'English'
              ? 'Please enter the details'
              : 'الرجاء إدخال التفاصيل'}
          </Text>

          <CustomInput
            inputMode={'text'}
            maxLength={25}
            placeholderText={
              language === 'English' ? ' User Name' : 'اسم المستخدم'
            }
            iconName={'person-outline'}
            onChangeText={text => setName(text)}
          />
          <CustomInput
            inputMode={'numeric'}
            maxLength={8}
            placeholderText={
              language === 'English' ? ' Mobile Number' : 'رقم الهاتف المحمول'
            }
            iconName={'md-call-outline'}
            onChangeText={text => setMobileNumber(text)}
          />
          <CustomInput
            inputMode={'email'}
            placeholderText={
              language === 'English'
                ? ' Email Address'
                : 'عنوان البريد الإلكتروني'
            }
            iconName={'mail-outline'}
            onChangeText={text => setEmail(text)}
          />

          <View style={styles.CheckContainer(language)}>
            {/* <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
              color={colors.primarycolor}
              uncheckColor={'red'}
              
            /> */}
            <TouchableOpacity style={{width:22,height:22,borderRadius:1,borderWidth:2,borderColor:colors.primarycolor,alignSelf:'center',marginHorizontal:3,alignItems:'center',justifyContent:'center'}} 
            onPress={()=>{setChecked(!checked)}}>
              {
                checked === true &&
                <SvgXml xml={checksvg} width={17} height={17} />
              }
            </TouchableOpacity>
            <Text style={styles.LableCheck}>
              {language === 'English' ? 'I accept the' : 'أقبل'}{' '}
            </Text>
            <TouchableOpacity   onPress={() => {
            Linking.openURL('https://5serv.com/terms-and-condition');
          }}>
              <Text style={[styles.LableColor]}>
                {language === 'English'
                  ? 'Terms & conditions'
                  : 'البنود و الظروف'}{' '}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{width: wp('90%'), alignSelf: 'center', marginTop: 50}}>
            <CustomButton
              lable={language === 'English' ? 'Register' : 'تسجيل الدخول'}
              style={{alignSelf: 'center',width:'100%'}}
              onPress={() => {
                // navigation.navigate('Login');
                if (checked === false) {
                  Toast.show({
                    type: 'error',
                    text1: 'Terms & Conditions ',
                    text2: 'Please Accept our Terms & Conditions',
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
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomContainer: language => ({
    padding: 10,
    width: wp('100%'),
    //   height: hp('60%'),
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
  LableCheck: {
    marginTop: 8,
    marginLeft: 5,
    fontSize: 14,
    fontFamily: fontfamily.fontMedium,
    color: colors.textgray,
  },
  LableColor: {
    marginTop: 8,
    marginLeft: 3,
    fontSize: 14,
    fontFamily: fontfamily.fontMedium,
    color: colors.lightcolor,
    textDecorationLine: 'underline',
  },
  CheckContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    marginTop: 20,
  }),
});
