import React, {useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../../../Constants/DesignContstants';
import {AuthContext} from '../../../../Context/AuthContext';
import CustomDatePicker from '../../../../CustomComponents/CustomDatePicker';
import CustomTimePicker from '../../../../CustomComponents/CustomTimePicker';
import  DateTimePicker  from '@react-native-community/datetimepicker';

const DateTime = ({datetext,timetext}) => {
  const {language} = useContext(AuthContext);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickupDate, setPickupdate] = useState(new Date());

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickupTime, setPickupTime] = useState(new Date());

  //For Date
  function showDatePickerCall() {
    setShowDatePicker(true);
  }

  function onDateSelectedStart(event, value) {
    setPickupdate(value);
    setShowDatePicker(false);
  }

  //For Time
  function showTimePickerCall() {
    setShowTimePicker(true);
  }

  function onTimeSelectedStart(event, value) {
    setPickupTime(value);
    setShowTimePicker(false);
  }

  return (
    <>
      {/* DATA AND TIME */}

      <View style={styles.datetime}>
        {/* date */}
        <Text style={styles.datetext}>{datetext}</Text>
        <CustomDatePicker
          lable={pickupDate.toDateString()}
          onPress={() => {
            showDatePickerCall();
          }}
        />

        {/* time */}
        <Text style={styles.datetext}>{ timetext}</Text>
        <CustomTimePicker
          lable={pickupTime.toLocaleTimeString()}
          onPress={() => {
            showTimePickerCall();
          }}
        />
      </View>

      {showDatePicker && (
        <DateTimePicker
          minimumDate={new Date()}
          value={pickupDate}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelectedStart}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          minimumDate={new Date()}
          value={pickupTime}
          mode={'time'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={false}
          onChange={onTimeSelectedStart}
        />
      )}
    </>
  );
};

export default DateTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  datetime: {
    marginHorizontal: 15,
  },
  datetext: {
    color: colors.lightblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.bold,
    fontFamily: fontfamily.fontBold,
    marginHorizontal: 15,
    marginTop: 15,
  },
  AddressCard: language => ({
    backgroundColor: colors.backgroundColor,
    elevation: 3,
    shadowColor: colors.textblack,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 15,
  }),
  housecontainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
  }),
  hometext: language => ({
    marginLeft: language === 'English' ? 10 : 0,
    marginRight: language === 'English' ? 0 : 10,
    color: colors.textblack,
    fontSize: 18,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
  }),
  changeBtn: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  changetext: {
    color: '#648AEE',
    fontSize: 14,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
  },
});
