import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {colors, fontfamily} from '../../../Constants/DesignContstants';

import {AuthContext} from '../../../Context/AuthContext';
import CustomButton from '../../../CustomComponents/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function InstantBookingComponent() {
  const {language, switchLanguage} = useContext(AuthContext);

  const navigation = useNavigation()
  
  
  return (
    <View style={{alignSelf: 'flex-end'}}>
      <View style={styles.InstantContainer}>
        <Text style={styles.instantText}>
          {language === 'English' ? 'Instant Booking !' : 'الحجز الفوري !'}
        </Text>
        <TouchableOpacity onPress={()=>{navigation.navigate("InstantBooking")}}>
          <LinearGradient
            colors={['#74C8FD', '#46A6F8']}
            style={styles.ButtonTouch}>
            <Image
              style={styles.notificationImage}
              source={require('../../../../assets/images/help.png')}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>


    </View>

   
  );
}

const styles = StyleSheet.create({
  InstantContainer: {
    // marginTop: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    position: 'absolute',
    bottom: 0,
    right:10
  },
  notificationImage: {
    width: 19,
    height: 24,
  },
  ButtonTouch: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C4EBFD',
  },
  instantText: {
    color: colors.textblack,
    fontSize: 18,
    fontWeight: '500',
    fontFamily: fontfamily.fontRegular,
    marginRight: 8,
  },
});
