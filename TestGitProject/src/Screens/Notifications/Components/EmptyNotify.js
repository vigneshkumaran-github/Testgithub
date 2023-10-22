import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../../Constants/DesignContstants';

import { AuthContext } from '../../../Context/AuthContext';

const EmptyNotify = () => {
  const {language} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/nonotification.png')}
      />
      <Text style={styles.notifytext}>
        {language === 'English'
          ? 'No Notification Yet'
          : 'لا يوجد إخطار حتى الآن'}
      </Text>
      <Text style={styles.notifytext2}>
        {language === 'English'
          ? 'We will inform you when something arrives !'
          : 'سنبلغك عند وصول شيء ما!'}
      </Text>
    </View>
  );
};

export default EmptyNotify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  notifytext: {
    color: colors.textblack,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
    fontSize: fontsize.bigheading,
  },
  notifytext2: {
    color: colors.lightblack,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
    fontSize: fontsize.subheading,
    textAlignVertical: 'center',
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 10,
  },
});
