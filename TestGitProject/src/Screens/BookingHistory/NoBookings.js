import {
    Image,
    Linking,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useContext} from 'react';
import {colors, fontfamily} from '../../Constants/DesignContstants';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../Context/AuthContext';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';

export default function NoBookings() {
    const {language} = useContext(AuthContext);
    const navigation = useNavigation();
    return (
      <View style={styles.MainContainer}>
        <SafeAreaView />

        {/* Header Area */}
        {/*  <CustomHeader
          lable={language === 'English' ? 'Booking History' : 'سجل الحجز'}
        /> */}

        <View style={styles.GridContainer}>
          <Lottie
            source={require('../../../assets/json/empty.json')}
            loader
            autoPlay
            loop
            style={{width: 300, height: 350, marginBottom: 20}}
          />

          <Text style={styles.TextView}>
            {language === 'English'
              ? 'There is no booking history yet'
              : 'لا يوجد سجل حجز حتى الان'}
          </Text>

          <Text style={styles.TextView1}>
            {language === 'English'
              ? 'make your appointments an know the status of service here'
              : 'اجعل مواعيدك تعرف حالة الخدمة هنا'}
          </Text>
        </View>


        {/* Card Layout */}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
      width: wp('100%'),
      alignItems: 'center',
    },

    GridContainer: {
      width: wp('90%'),
      marginTop: 30,
      flex: 1,
      alignItems: 'center',
      marginBottom: 30,
    },

    Items: {
      width: wp('90%'),
      height: 60,
      marginTop: 25,
      // height: wp(20),
      // borderRadius: 50,
      backgroundColor: colors.textwhite,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: {width: 0, height: 8},
      shadowOpacity: 0.12,
      shadowRadius: 3.84,
      elevation: 5,
      shadowColor: colors.textblack,
      borderRadius: 3,
    },

    TextView: {
      alignSelf: 'center',
      lineHeight: 28,
      width: 280,
      fontSize: 18,
      color: colors.textblack,
      fontFamily: fontfamily.fontMedium,
      textAlign: 'center',
    },

    TextView1: {
      alignSelf: 'center',
      marginTop: 10,
      width: 250,
      fontSize: 14,
      color: colors.textgray,
      fontFamily: fontfamily.fontRegular,
      textAlign: 'center',
    },
  });
  