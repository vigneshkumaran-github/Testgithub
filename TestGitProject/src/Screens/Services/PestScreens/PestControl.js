import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../../Constants/DesignContstants';
import { housesvg, minussvg, plussvg, ticksvg } from '../../../../assets/svg/Svg';

import { AuthContext } from '../../../Context/AuthContext';
import CustomAdressCard from '../../../CustomComponents/CustomAdressCard';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomDatePicker from '../../../CustomComponents/CustomDatePicker';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import CustomTimePicker from '../../../CustomComponents/CustomTimePicker';
import DateTime from '../MepScreens/Components/DateTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SvgXml } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const PestControl = () => {
  const [datas, setDatas] = useState();
  const [addressfromProps, setAddressFromProps] = useState('');
  const [newDatas, setNewDatas] = useState();
  const { language, PestService, BookService } = useContext(AuthContext);
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickupDate, setPickupdate] = useState();
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickupTime, setPickupTime] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const shimerdata = [1, 2]

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
    if (
      value?.toTimeString().slice(0, 2) < 8 ||
      value?.toTimeString().slice(0, 2) >= 20
    ) {
      Toast.show({
        type: 'error',
        text1: 'Please Change Time ! ',
        text2: 'Time Should be 8 AM - 8 PM',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setPickupTime();
    } else {
      setPickupTime(value);
    }
    setShowTimePicker(false);
  }


  useEffect(() => {
    const apicall = async () => {
      setIsLoading(true)
      const result = await PestService();
      if (result.status === true) {
        setDatas(result?.data);
        addnewArray(result?.data?.service?.data);
      }
      console.log(result, "######PEST CONTROL");
    };
    apicall();
  }, []);

  const changeadd = add => {
    setAddressFromProps(add);
  };

  const addnewArray = data => {
    let newArray = [];
    data.map((item, index) =>
      newArray.push({
        id: item?.id,
        name: item?.name,
        translations: item?.translations?.value,
        selected: false,
      }),
    );
    setNewDatas(newArray);
    setIsLoading(false);
  };

  const selectService = value => {
    const newItem = newDatas.map(val => {
      if (val.id === value.id) {
        return {
          ...val,
          selected: !val.selected,
        };
      } else {
        return { ...val };
      }
    });
    setNewDatas(newItem);
  };

  //Book Service
  const bookService = async () => {
    let laundrcat = [];
    newDatas
      ?.filter(item => item.selected == true)
      .map(({ id }) => laundrcat.push(id));

    const reqobj = {
      address_id: addressfromProps,
      service_type: 'pest_control',
      service_category: laundrcat,
      appointment_date: pickupDate && pickupDate?.toISOString().slice(0, 10),
      appointment_time: pickupTime && pickupTime?.toTimeString().slice(0, 8),
    };
    const result = await BookService(reqobj);
    if (result?.status === true) {
      navigation.replace('BookingSuccess');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3579A3" barStyle="light-content" />
      {/* HEADER */}

      <CustomHeader
        lable={language === 'English' ? 'Pest Control' : 'مكافحة الآفات'}
      />

      <ScrollView style={styles.maincontainer}>
        <View style={styles.headerrow(language)}>
          {!isLoading ? (
            <Text style={styles.picktext}>
              {language === 'English'
                ? datas?.service?.section_label
                : datas?.service?.translations?.value}
            </Text>
          ) : (
            <ShimmerPlaceholder style={styles.shimmertext(language)} />
          )}
          {!isLoading ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PestPrice');
              }}>
              <Text
                style={{
                  color: colors.primarycolor,
                  textDecorationLine: 'underline',
                  marginHorizontal: 15,
                }}>
                Cost Lists
              </Text>
            </TouchableOpacity>
          ) : (
            <ShimmerPlaceholder style={styles.shimmertext(language)} />
          )}
        </View>

        {/* SERVICE */}
        <View style={styles.servicecontainer}>
          {!isLoading
            ? newDatas &&
            newDatas.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={
                  item?.selected === true
                    ? styles.servicebtn2
                    : styles.servicebtn
                }
                onPress={() => {
                  selectService(item);
                }}>
                {item?.selected === true && (
                  <SvgXml
                    xml={ticksvg}
                    width={15}
                    height={15}
                    style={{ marginRight: 3 }}
                  />
                )}
                <Text style={styles.servicetext}>
                  {language === 'English' ? item?.name : item?.translations}
                </Text>
              </TouchableOpacity>
            ))
            : shimerdata.map((item, index) => (
              <View style={styles.servicecontainer} key={index}>
                <ShimmerPlaceholder
                  style={{
                    height: height / 22,
                    width: width / 3,
                    marginHorizontal: 5,
                    borderRadius: 10,
                  }}
                />
              </View>
            ))}
        </View>
        <View style={styles.datetime}>
          {/* date */}
          {!isLoading ? (
            <Text style={styles.datetext}>
              {language === 'English'
                ? datas?.section_labels[0].appointment_date_label
                : datas?.translations[0]?.value}
            </Text>
          ) : (
            <ShimmerPlaceholder style={styles.shimmertext(language)} />
          )}
          <CustomDatePicker
            loading={isLoading}
            lable={pickupDate ? pickupDate.toDateString() : 'DD/MM/YYYY'}
            onPress={() => {
              showDatePickerCall();
            }}
          />


          {showDatePicker && (
            <DateTimePicker
              minimumDate={new Date()}
              value={pickupDate ? pickupDate : new Date()}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onDateSelectedStart}
            // style={styleSheet.datePicker}
            />
          )}

          {/* time */}
          {!isLoading ? (
            <Text style={styles.datetext}>
              {language === 'English'
                ? datas?.section_labels[1].appointment_time_label
                : datas?.translations[1]?.value}
            </Text>
          ) : (
            <ShimmerPlaceholder style={styles.shimmertext(language)} />
          )}
          <CustomTimePicker loading={isLoading}
            lable={pickupTime ? pickupTime.toLocaleTimeString() : 'HH/MM/SS'}
            onPress={() => {
              showTimePickerCall();
            }}
          />
        </View>


        {showTimePicker && (
          <DateTimePicker
            minimumDate={new Date()}
            value={pickupTime ? pickupTime : new Date()}
            mode={'time'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={false}
            onChange={onTimeSelectedStart}
          // style={styleSheet.datePicker}
          />
        )}

        {/* Address Card */}
        <CustomAdressCard onchange={changeadd} />
      </ScrollView>

      <View style={styles.bottombar}>
        <View style={{ alignSelf: 'center', width: '90%' }}>
          <CustomButton
            lable={language === 'English' ? 'Book Service' : 'استمر'}
            style={styles.continuebtn}
            onPress={() => {
              bookService();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PestControl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  progressbar: {
    height: 7,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
  },
  bar2: {
    height: 7,
    flexDirection: 'row',
    backgroundColor: '#4EBCFF',
  },
  maincontainer: {
    marginBottom: 100,
  },
  picktext: {
    marginHorizontal: 15,
    color: colors.lightblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
  },
  servicecontainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  servicebtn: {
    paddingHorizontal: 20,
    height: height / 22,
    minHeight: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.5,
    flexDirection: 'row',
    marginHorizontal: 3,
    marginTop: 10,
  },
  servicebtn2: {
    paddingHorizontal: 20,
    height: height / 22,
    minHeight: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8DEF8',
    flexDirection: 'row',
    marginHorizontal: 3,
    marginTop: 10,
  },

  servicespace: {
    flexDirection: 'row',
    alignSelf: 'center',
    flexWrap: 'wrap',
    width: '100%',
    alignItems: 'center',
  },
  servicespacebtn: {
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 0,
    justifyContent: 'center',
  },
  servicetext: {
    color: colors.textblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
  },
  spacetext: {
    color: colors.lightblack,
    fontSize: fontsize.paragraph,
    fontWeight: fontWeight.regular,
    fontFamily: fontfamily.fontMedium,
    marginTop: 0,
  },
  spacebtn: {
    backgroundColor: colors.lightblue,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 20,
    marginTop: 8,
    marginStart: 15,
  },
  circlebtn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    height: 35,
    width: 35,
  },
  plustext: {
    fontSize: 26,
    color: 'black',
    fontWeight: 600,
  },
  numbertext: {
    marginHorizontal: 5,
    color: colors.textblack,
    fontSize: fontsize.heading,
    fontWeight: fontWeight.bold,
    fontFamily: fontfamily.fontBolditalic,
  },
  qarcontainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qarnum: {
    marginLeft: 5,
    color: colors.lightcolor,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    marginEnd: 5,
  },
  qartext: {
    color: colors.textblack,
    fontSize: fontsize.paragraph,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
    alignSelf: 'center',
  },
  datetime: {
    // marginHorizontal: 15,
    marginTop: 15,
  },
  datetext: {
    color: colors.lightblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
    marginStart: 10,
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

  //

  bottombar: {
    height: 99,
    backgroundColor: colors.primarycolor,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },

  continuebtn: {
    alignSelf: 'center',
    width: '100%',
  },
  headerrow: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  }),
  shimmertext: language => ({
    width: 100,
    height: 10,
    borderRadius: 10,
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end',
    marginVertical: 10,
    marginHorizontal: 10
  }),
});
