import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {calendarsvg, housesvg, timesvg} from '../../../../assets/svg/Svg';
import {
    colors,
    fontWeight,
    fontfamily,
} from '../../../Constants/DesignContstants';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../../Context/AuthContext';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomDatePicker from '../../../CustomComponents/CustomDatePicker';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import CustomTimePicker from '../../../CustomComponents/CustomTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Lottie from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/core';

export default function BookingSuccess() {
    const {language} = useContext(AuthContext);
    const navigation = useNavigation();


    return (
      <View style={styles.MainContainer}>
        <SafeAreaView />

        {/* ----------- Date Time Picker ----------------*/}

        <View
          style={{
            flex: 1,
            width: wp('100%'),
            alignItems: 'center',
            alignContent: 'center',
          }}>
          {/* <ActivityIndicator size={"large"} color={colors.primarycolor}/> */}

          <Lottie
            source={require('../../../../assets/json/send.json')}
            loader
            autoPlay
            loop
            style={{width: 350, height: 350, marginTop: 30}}
          />

          <Text style={styles.successHead}>
            {language === 'English' ? 'Request Sent !' : 'تم ارسال الطلب !'}
          </Text>
          <View style={{width: wp('80%'), alignItems: 'center'}}>
            <Text style={styles.succesContent}>
              {language === 'English'
                ? 'Our Customer Care Executive will get back to you  :) '
                : ' سيقوم مسؤول خدمة العملاء لدينا بالرد عليك :)'}
            </Text>
          </View>
        </View>

        {/* Bootom Layout Footer*/}
        <View style={styles.BottomLayout(language)}>
          <CustomButton
            lable={language === 'English' ? 'Go to Home' : 'اذهب الى المنزل'}
            style={styles.BottomButton}
            onPress={() => {
              navigation.navigate('BottomTab');
            }}
          />
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
    },
    BottomLayout: language => ({
      height: 110,
      backgroundColor: '#3579A3',
      width: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      alignItems: 'center',
      flexDirection: language === 'English' ? 'row' : 'row-reverse',
      justifyContent: 'space-around',
      position: 'absolute',
      bottom: 0,
    }),
  
    BottomButton: {
      width: wp('90%'),
    },
  
    BottomTotalText: {
      marginBottom: 5,
      fontSize: 12,
      color: colors.textgray,
      fontFamily: fontfamily.fontRegular,
    },
    ButtomTotalRate: {
      fontSize: 12,
      color: colors.textwhite,
      fontFamily: fontfamily.fontRegular,
      fontWeight: fontWeight.medium,
    },
    ButtomTotalRateBold: {
      fontSize: 25,
      color: colors.textwhite,
      fontFamily: fontfamily.fontRegular,
      fontWeight: fontWeight.medium,
    },

    successHead: {
        marginTop:20,
        fontSize: 16,
        color: colors.textgray,
        fontFamily: fontfamily.fontRegular,
   
      },

      succesContent: {
        marginTop:15,
        fontSize: 20,
        color: colors.textblack,
        fontFamily: fontfamily.fontMedium,

      },
  
  });
  