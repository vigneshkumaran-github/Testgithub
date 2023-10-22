import {Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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

export default function BookingInstantService() {
  const {language, dashboardData, InstantBook,userData} = useContext(AuthContext);
  const navigation = useNavigation();
  // console.log(dashboardData)

  

  const bookService = async (item) => {
    console.log(userData)
    const result = await InstantBook(item?.tag, userData?.name, userData?.mobile_number);
    if (result?.status === true) {
       navigation.navigate('InstantThankYou');
    }
  }
  
  return (
    <View style={styles.MainContainer}>
      <SafeAreaView />

      {/* Header Area */}
      <CustomHeader
        lable={language === 'English' ? 'Instant Support' : 'دعم فوري'}
      />
      <View style={styles.GridContainer}>
      {dashboardData &&
        dashboardData.map((item, id) => (

       <TouchableOpacity style={styles.Items} key={id} onPress={()=>{bookService(item)}}>
        <Text style={styles.TextView}>{language === 'English'
                  ? item?.title
                  : item.translations[0].value}</Text>
        </TouchableOpacity>

           ))}
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
    alignItems: "center",
    marginBottom:30
  },


  Items: {
    width: wp("90%"),
    height:60,
    marginTop:25,
    // height: wp(20),
    // borderRadius: 50,
    backgroundColor: colors.textwhite,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 3.84,
    elevation: 5,
    shadowColor: colors.textblack,
    borderRadius:3,
  },

  TextView: {
    fontSize: 16,
    color: colors.textblack,
    fontFamily:fontfamily.fontRegular
  },
});
