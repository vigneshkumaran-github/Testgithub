import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, fontWeight, fontfamily } from '../Constants/DesignContstants';
import { AuthContext } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function CustomHeader({lable,lableColor,style,...action}) {
  
  const {language} = useContext(AuthContext);
const navigation=useNavigation()
  return (
    <View style={[styles.HeaderLayout,style]}>
    <View style={styles.HeaderMainLayout(language)}>
  <TouchableOpacity
        style={styles.BackButtonLayout}
        {...action}
        onPress={()=>{navigation.goBack()}}
        >
     <MaterialIcons name="keyboard-backspace" color={"#4BA5E2"} size={30}/>
      </TouchableOpacity> 

      <Text style={[styles.TitleText(language),lableColor]}>{lable}</Text>
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    HeaderLayout: {
        backgroundColor: colors.primarycolor,
        height: hp("11%"),
        width: wp('100%'),
        justifyContent: 'center',
      },
      BackButtonLayout: {
        height: 50,
        width: 50,
        borderRadius: 5,
        borderColor: '#0000008f',
        borderWidth: 0.3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#32739B",
        shadowColor: "#32739B",
        elevation: 3,
      },
      HeaderMainLayout: language=>({
        marginHorizontal: 20,
        flexDirection: language ==="English" ? 'row' : 'row-reverse',
        alignItems: 'center',
      }),
      TitleText: language=>({
        color: colors.textwhite,
        marginLeft: language ==="English" ? 20:0,
        marginRight: language ==="English" ? 0:20,
        fontSize: 22,
        fontFamily:fontfamily.fontRegular,
        fontWeight:fontWeight.medium
      }),
})