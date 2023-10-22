import {StyleSheet, Text, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import React from 'react';
import { colors, fontfamily } from '../Constants/DesignContstants';
import LinearGradient from 'react-native-linear-gradient';

export default function CustomButton({lable,style,TouchStyle,loading,...action}) {
  return (
  <TouchableOpacity {...action}  style={TouchStyle}>
     <LinearGradient colors={[ colors.secondarycolor, colors.secondarycolor1]} style={[styles.ButtonContainer,style]}>
      {loading ? (
        <ActivityIndicator size="small" color={colors.textwhite} />
      ) : (
    <Text style={styles.ButtonText}>
    {lable}
    </Text>
      )}
    </LinearGradient>
  </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    ButtonContainer:{
        height: 54,
        backgroundColor: colors.primarycolor,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ButtonText:{
        fontFamily:fontfamily.fontRegular,
        fontSize:14,
        fontWeight:'500',
        lineHeight:18,
        color:colors.textblack,
    }
});
