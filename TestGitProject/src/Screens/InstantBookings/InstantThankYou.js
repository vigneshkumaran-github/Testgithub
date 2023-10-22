import {
  Linking,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useContext} from 'react';
import {colors, fontfamily} from '../../Constants/DesignContstants';
import CustomButton from '../../CustomComponents/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../Context/AuthContext';
import CustomHeader from '../../CustomComponents/CustomHeader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function InstantThankYou() {
  const {language} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.MainContainer}>
      <SafeAreaView />

      {/* Header Area */}
      <CustomHeader
        lable={language === 'English' ? 'Instant Support' : 'دعم فوري'}
      />
      <View style={styles.GridContainer}>
        <Lottie
          source={require('../../../assets/json/customerCare.json')}
          loader
          autoPlay
          loop
          style={{width: 250, height: 250}}
        />

        {language === 'English' ? (
          <Text style={styles.TextView}>
            Your request has been received, Our{' '}
            <Text style={{color: colors.lightcolor}}>help center</Text> will get
            back to you shortly.
          </Text>
        ) : (
          <Text style={styles.TextView}>
           تم استلام طلبك ، لدينا{' '}
            <Text style={{color: colors.lightcolor}}>مركز المساعدة</Text>سوف نعود إليك قريبا. </Text>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BottomTab');
        }}>
        <LinearGradient
          colors={[colors.extralight, colors.lightcolor]}
          style={[styles.ButtonContainer]}>
          <Text style={styles.ButtonText}>
            {language === 'English' ? 'Back to Home' : 'العودة إلى المنزل'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

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
  },
  ButtonContainer: {
    width: wp('90%'),
    marginBottom: 20,
    height: 54,
    backgroundColor: colors.primarycolor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    fontFamily: fontfamily.fontRegular,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
    color: colors.textwhite,
  },
});
