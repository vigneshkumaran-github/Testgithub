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
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export default function InstantBooking() {
  const {language} = useContext(AuthContext);
  const navigation = useNavigation();
  return (
    <View style={styles.MainContainer}>
      <SafeAreaView />

      {/* Header Area */}
      <CustomHeader
        lable={language === 'English' ? 'Instant Booking' : 'الحجز الفوري'}
      />
      <View style={styles.GridContainer}>
        <TouchableOpacity
          style={styles.Items}
          onPress={() => {
            navigation.navigate('BookingInstantService');
          }}>
          <Image
            source={require('../../../assets/images/instant1.png')}
            style={{width: 60, height: 60, resizeMode: 'contain'}}
          />
          <Text style={styles.TextView}>
            {language === 'English' ? 'Book Service' : 'خدمة الكتاب'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Items}
          onPress={() => {
            Linking.openURL(`tel:${'+974 31310600'}`);
          }}>
          <Image
            source={require('../../../assets/images/instant2.png')}
            style={{width: 60, height: 60, resizeMode: 'contain'}}
          />
          <Text style={styles.TextView}>
            {language === 'English' ? 'Call Helpline' : 'اتصل بخط المساعدة'}
          </Text>
        </TouchableOpacity>
        {/* // ${'+91 8098629606'} */}
        <TouchableOpacity
          style={styles.Items}
          onPress={() => {
            Linking.openURL(`whatsapp://send?phone=${'+974 31310600'}`);
          }}>
          <Image
            source={require('../../../assets/images/instant3.png')}
            style={{width: 60, height: 60, resizeMode: 'contain'}}
          />
          <Text style={styles.TextView}>
            {language === 'English' ? 'Type Your Issue' : 'اكتب مشكلتك'}
          </Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 30,
  },

  Items: {
    width: 150,
    height: 150,
    marginTop: 25,
    gap: 10,
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
    borderRadius: 10,
  },

  TextView: {
    fontSize: 16,
    color: colors.textblack,
    fontFamily: fontfamily.fontRegular,
  },
});
