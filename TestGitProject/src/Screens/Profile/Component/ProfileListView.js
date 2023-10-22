import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../../Context/AuthContext'
import { colors, fontfamily } from '../../../Constants/DesignContstants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SvgXml} from 'react-native-svg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { Edit, Help, TermsConditions, bookingHistory, savedAddress } from '../../../../assets/svg/Svg';
  
export default function ProfileListView({lable,icon,...action}) {

   const{language} =useContext(AuthContext);

  return (
    <TouchableOpacity style={styles.settingsCard(language)} {...action}>
    <View style={styles.ContentLayout(language)}>
      <View style={styles.editButton1(language)}>
      {icon}
      </View>

      <Text style={styles.subScreensText}>
      {lable}
      </Text>
    </View>
    <View>
      <MaterialIcons
        name={'chevron-right'}
        size={20}
        color={colors.textblack}
      />
    </View>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    settingsCard: language => ({
        width: wp('90%'),
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: language === 'English' ? 'row' : 'row-reverse',
        justifyContent: 'space-between',
        // backgroundColor:colors.backgroundColor,
        height: 60,
        marginTop: 20,
        elevation: 2,
        shadowColor: colors.textgray,
        alignItems: 'center',
        paddingTop: 17,
        paddingBottom: 17,
        borderRadius: 3,
      }),
      ContentLayout: language => ({
        flexDirection: language === 'English' ? 'row' : 'row-reverse',
        alignItems: 'center',
      }),
      editButton1: language => ({
        width: 30,
        backgroundColor: '#E2E2FB',
        height: 30,
        borderRadius: 30 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
      }),
      subScreensText: {
        fontSize: 18,
        fontFamily: fontfamily.fontMedium,
        color: colors.textblack,
        marginLeft: 12,
        marginRight: 12,
      },
})