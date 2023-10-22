import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';

export default function LanguageChoose() {
  const navigation = useNavigation();
  const {language,switchLanguage} = useContext(AuthContext);
  const [mobileNumber, setMobileNumber] = useState('');
  const [alreadyLaunched, setAlreadyLaunched] = useState(false);
  console.log(alreadyLaunched,'alreadyLaunched')

  useEffect(() => {
    const getLaunch=async()=>{
    try {
      const value = await AsyncStorage.getItem('alreadyLaunched');
      if (value !== null) {
        setAlreadyLaunched(true);
      } else {
        setAlreadyLaunched(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  getLaunch()
  }, []);


  const languageSwitch =  (Lang) => {
    console.log(Lang,'Lang')
    console.log(alreadyLaunched,'alreadyLaunched')
     if (alreadyLaunched) {
        switchLanguage(Lang);
        navigation.navigate('Login')
      } else {
        switchLanguage(Lang);
        navigation.navigate('Onboarding')
      }
  }

  return (
    <View style={styles.Container}>
      <StatusBar backgroundColor={colors.textwhite} barStyle="dark-content" />
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.LogoContainer}>
          <Image
            source={require('../../../assets/images/applogo1.png')}
            style={{width: 400, height: 320, resizeMode: 'contain',}}
          />
        </View>
        <View style={styles.bottomContainer(language)}>
          <Text style={styles.headerText}>
            {language === 'English' ? 'Choose Your Language' : 'تسجيل الدخول'}
          </Text>
          <Text style={styles.lightText}>
            {language === 'English'
              ? 'You can also change the language in your Dashboard section later.'
              : 'إذا كان لديك حساب الرجاء إدخال رقم هاتفك المسجل'}
          </Text>

          <CustomButton
            lable={'Continue with English'}
            style={{width: wp('90%'), alignSelf: 'center', marginTop: 40}}
            onPress={() => {
             languageSwitch('English')
            }}
          />

          <Text style={{alignSelf:'center',marginTop: 20}}>or</Text>

          <CustomButton
            lable={'تواصل مع اللغة الإنجليزية'}
            style={{width: wp('90%'), alignSelf: 'center', marginTop: 20}}
            onPress={() => {
                languageSwitch('Arabic')
               }}
          />
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
    marginTop: 30,
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
    alignSelf: 'center',
    textAlign: 'center',
  },
  lightText: {
    width: wp('90%'),
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.primarycolor,
    opacity: 0.4,
    lineHeight: 22,
    marginTop: 13,
    marginLeft: 4,
    alignSelf: 'center',
    textAlign: 'center',
  },
  darkText: {
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.textblack,
    lineHeight: 24,
    marginTop: 13,
  },
});
