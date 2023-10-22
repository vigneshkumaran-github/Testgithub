// CustomText.js
import React from 'react';
import {Text, StyleSheet} from 'react-native';
import { colors, fontfamily, fontsize } from '../Constants/DesignContstants';

export default function CustomText(props) {
  return (
    <Text
      style={[
        props.varient === 'Heading'
          ? styles.HeadingFont
          : props.varient === 'Medium'
          ? styles.MidumFont
          : props.varient === 'Small'
          ? styles.SmallFont
          : null,
        props.style,
      ]}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  // ... add your default style here

  //Heading Fonts
  HeadingFont: {
    // color: colors.textcolor,
    // fontFamily: fontfamily.Medium,
    // fontSize: fontsize.Medium,
  },

  //Medium Fonts
  MidumFont: {
    // color: colors.textcolor,
    // fontFamily: fontfamily.Regular,
    // fontSize: fontsize.Small,
  },

  //Small Fonts

  SmallFont: {
    // color: colors.textGray,
    // fontFamily: fontfamily.Regular,
    // fontSize: fontsize.ExtraSmall,
  },
});
