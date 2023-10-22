import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {AuthContext} from '../Context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {SvgXml} from 'react-native-svg';
import {calendarsvg} from '../../assets/svg/Svg';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

export default function CustomDatePicker({lable, style, loading, ...action}) {
  const {language} = useContext(AuthContext);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  return !loading ? (
    <TouchableOpacity {...action} style={[styles.DateTimeBtn(language), style]}>
      <Text style={styles.datetext}>{lable}</Text>
      <SvgXml xml={calendarsvg} width={20} height={20} />
    </TouchableOpacity>
  ) : (
    <View>
      <ShimmerPlaceholder
        style={{
          height: 50,
          width: '100%',
          alignSelf: 'center',
          borderRadius: 10,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  DateTimeBtn: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF9FF',
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: 10,
    width:'95%',
    alignSelf:'center'
  }),
  datetext: {
    color: '#ADC7D7',
  },
});
