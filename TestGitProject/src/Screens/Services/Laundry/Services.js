import React, {useContext, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import ClothTypes from './Component/ClothTypes';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import {LaunServiceMethodApi} from '../../../Api-Services/Api/LaundryApi';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SubServices from './Component/SubServices';
import {useNavigation} from '@react-navigation/core';

export default function LaundryServices() {
  const {language} = useContext(AuthContext);

  const navigation = useNavigation();

 

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView />

      {/* Header Area */}
      <CustomHeader
        lable={language === 'English' ? 'Laundry Service' : 'خدمة غسيل الملابس'}
      />

      {/* Main Laundry Category */}
      <SubServices />

      {/* Sub Laundry Category */}

      <ClothTypes />

      {/* Bootom Layout */}
      <View style={styles.BottomLayout(language)}>
        <View>
          <Text style={styles.BottomTotalText}>
            {language === 'English' ? 'Total Clothes' : 'مجموع الملابس'} :{' '}
            <Text style={styles.ButtomTotalRate}>40</Text>
          </Text>
          <Text style={[styles.BottomTotalText, {fontSize: 14}]}>
            {language === 'English' ? 'QAR' : 'ريال قطري'}
          </Text>
          <Text style={styles.ButtomTotalRateBold}>1000</Text>
        </View>
        <CustomButton
          lable={language === 'English' ? 'Continue' : 'يكمل'}
          style={styles.BottomButton}
          onPress={() => {
            navigation.navigate('LaundryBookingDetails');
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
    width: wp('55%'),
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
});
