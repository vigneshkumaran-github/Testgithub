import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {calendarsvg, housesvg, timesvg} from '../../../../assets/svg/Svg';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../../Context/AuthContext';
import CustomAdressCard from '../../../CustomComponents/CustomAdressCard';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomDatePicker from '../../../CustomComponents/CustomDatePicker';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import CustomTimePicker from '../../../CustomComponents/CustomTimePicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {LaunServiceMethodApi} from '../../../Api-Services/Api/LaundryApi';
import LinearGradient from 'react-native-linear-gradient';
import Loading from '../../../CustomComponents/Loading';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/core';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function LaundryBookingDetails() {
  const {language, LaundryCategory, LaundryServices, BookService} =
    useContext(AuthContext);
  const navigation = useNavigation();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickupDate, setPickupdate] = useState();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickupTime, setPickupTime] = useState();

  const [datas, setDatas] = useState();
  const [datas2, setDatas2] = useState([]);
  const [datetext, setDateText] = useState();

  // const [serviceMethod, setServiceMethod] = useState('');
  const [addressfromProps, setAddressFromProps] = useState('');
  const [isloading, setIsloading] = useState(true);

  //

  const [newDatas, setnewDatas] = useState([]);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const shimmerdata = [1, 2];

  useEffect(() => {
    setIsloading(true);
    const apicall = async () => {
      //Category Api
      const categorydata = await LaundryCategory();
      setDatas(categorydata?.data);
      addnewArray(categorydata?.data?.main_category);
      setDatas2(categorydata?.data?.main_category);
      console.log(categorydata?.data?.main_category);
    };
    apicall();
    // setIsloading(false);
  }, []);

  //Creating a new Array for adding selected field

  const addnewArray = data => {
    setIsloading(true);
    let newArray = [];
    data.map((item, index) =>
      newArray.push({
        id: item?.id,
        name: item?.name,
        translations: item?.translations?.value,
        selected: false,
      }),
    );
    setnewDatas(newArray);
    console.log('NEW ARRAY >>>', newArray);
    setIsloading(false);
  };

  //For Date
  function showDatePickerCall() {
    setShowDatePicker(true);
  }

  function onDateSelectedStart(event, value) {
    setPickupdate(value);
    // setDateText(value?.slice(0,10).toString)
    console.log(value);
    setShowDatePicker(false);
  }

  //For Time
  function showTimePickerCall() {
    setShowTimePicker(true);
  }

  function onTimeSelectedStart(event, value) {
    console.log(value?.toTimeString().slice(3, 5) > 0);
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

  // Change Address Card with BottomSheet
  renderCard = () => {
    return <CustomAdressCard onchange={changeadd} />;
  };

  //Callback From Child Component To Get "address_id"

  const changeadd = add => {
    setAddressFromProps(add);
  };
  console.log('address_id', addressfromProps && addressfromProps);

  // Book Service Api

  const bookService = async () => {
    let laundrcat = [];
    newDatas
      ?.filter(item => item.selected == true)
      .map(({id}) => laundrcat.push(id));

    const reqobj = {
      address_id: addressfromProps,
      service_type: 'laundry',
      // service_method_id: serviceMethod,
      laundry_category_id: laundrcat,
      pickup_date: pickupDate && pickupDate?.toISOString().slice(0, 10),
      pickup_time: pickupTime && pickupTime?.toTimeString().slice(0, 8),
    };

    console.log('BOOK SERVICE REQUEST>>>', reqobj);
    const result = await BookService(reqobj);
    if (result?.status === true) {
      navigation.replace('BookingSuccess');
    }
  };

  // To Select Multiple Services
  const selectService = value => {
    const newItem = newDatas.map(val => {
      if (val.id === value.id) {
        return {
          ...val,
          selected: !val.selected,
        };
      } else {
        return {...val};
      }
    });
    setnewDatas(newItem);
  };
  console.log(datas);

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView />
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.primarycolor}
      />
      {/* Header Area */}
      <CustomHeader
        lable={language === 'English' ? 'Booking Details' : 'تفاصيل الحجز'}
      />

      {/* ----------- Date Time Picker ----------------*/}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.DetailsContainer}>
          <View style={styles.headerrow(language)}>
            {!isloading ? (
              <Text
                style={[
                  styles.deteTimeText(language),
                  {paddingHorizontal: 20, paddingBottom: 10, marginTop: 15},
                ]}>
                {language === 'English'
                  ? datas && datas?.section_labels[0]?.service_label
                  : datas && datas?.translations[0]?.value}
              </Text>
            ) : (
              <ShimmerPlaceholder
                style={[
                  styles.shimmertext(language),
                  {marginHorizontal: 15, marginTop: 10},
                ]}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LaundryPrice');
              }}>
              <Text
                style={{
                  color: colors.primarycolor,
                  textDecorationLine: 'underline',
                  marginHorizontal: 15,
                  marginTop: 15,
                }}>
                Cost Lists
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.prblmtncontainer(language)}>
            {!isloading
              ? newDatas &&
                newDatas.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      selectService(item, index);
                    }}
                    style={
                      item?.selected === true
                        ? styles.prblmbtn2
                        : styles.prblmbtn
                    }>
                    <Text
                      style={[
                        styles.prblmtext,
                        {
                          color:
                            item?.selected === true
                              ? 'white'
                              : colors.lightblack,
                        },
                      ]}>
                      {language === 'English' ? item?.name : item?.translations}
                    </Text>
                  </TouchableOpacity>
                ))
              : shimmerdata.map((item, index) => (
                  <View key={index}>
                    <ShimmerPlaceholder style={styles.prblmbtn2} />
                  </View>
                ))}
          </View>

          <View style={styles.detailsCard}>
            <View>
              {!isloading ? (
                <Text style={styles.deteTimeText(language)}>
                  {language === 'English'
                    ? datas?.section_labels[1]?.appointment_date_label
                    : datas?.translations[1]?.value}
                </Text>
              ) : (
                <ShimmerPlaceholder style={styles.shimmertext(language)} />
              )}

              <CustomDatePicker
                loading={isloading}
                lable={pickupDate ? pickupDate.toDateString() : 'DD/MM/YYYY'}
                onPress={() => {
                  showDatePickerCall();
                }}
              />
            </View>

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

            <View style={{marginTop: 10}}>
              {!isloading ? (
                <Text style={styles.deteTimeText(language)}>
                  {language === 'English'
                    ? datas?.section_labels[2]?.appointment_time_label
                    : datas?.translations[2]?.value}
                </Text>
              ) : (
                <ShimmerPlaceholder style={styles.shimmertext(language)} />
              )}

              <CustomTimePicker
                loading={isloading}
                lable={
                  pickupTime ? pickupTime.toLocaleTimeString() : 'HH/MM/SS'
                }
                onPress={() => {
                  showTimePickerCall();
                }}
              />
            </View>
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

          {/* ----------- Address Area ----------------*/}

          <Text
            style={[
              styles.deteTimeText(language),
              {paddingHorizontal: 20, paddingTop: 10},
            ]}>
            {language === 'English'
              ? datas?.section_labels[3]?.pickup_location_label
              : datas?.translations[3]?.value}
          </Text>
          <CustomAdressCard onchange={changeadd} />
        </View>
      </ScrollView>
      {/* Bootom Layout Footer*/}
      <View style={styles.BottomLayout(language)}>
        <CustomButton
          lable={language === 'English' ? 'Book Service' : 'يكمل'}
          style={styles.BottomButton}
          onPress={() => {
            if (
              pickupDate === undefined ||
              pickupTime === undefined ||
              addressfromProps === ''
            ) {
              Toast.show({
                type: 'error',
                text1: 'Please Fill All Fields ! ',
                text2: 'Please Fill All Fields',
                visibilityTime: 2000,
                autoHide: true,
                topOffset: 60,
              });
            } else
            bookService();
          }} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  BottomLayout: language => ({
    height: 110,
    backgroundColor: '#3579A3',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
  }),

  BottomButton: {
    width: wp('90%'),
  },

  BottomTotalText: {
    marginBottom: 5,
    fontSize: 12,
    color: colors.textgray,
    fontFamily: fontfamily.fontRegular,
  },
  ButtomTotalRate: {
    fontSize: 12,
    color: colors.textwhite,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
  },
  ButtomTotalRateBold: {
    fontSize: 25,
    color: colors.textwhite,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
  },

  DetailsContainer: {
    // marginTop: 10,
    width: wp('100%'),
    paddingBottom: hp('15%'),
  },
  detailsCard: {
    shadowColor: 'black',
    // marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowRadius: 10,
  },
  deteTimeText: language => ({
    fontFamily: fontfamily.fontRegular,
    fontWeight: 'bold',
    color: colors.textblack,
    fontSize: 15,
    opacity: 0.6,
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end',
  }),
  addressText: {
    fontFamily: fontfamily.fontRegular,
    color: colors.textgray,
    fontSize: 15,
    fontWeight: fontWeight.regular,
  },
  DateTimeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EFF9FF',
    paddingHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 15,
    marginVertical: 10,
  },
  datetext: {
    color: '#ADC7D7',
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

  //Service Area
  ServiceCard: language => ({
    backgroundColor: '#FFFDD1',
    shadowColor: colors.textblack,
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 7,
  }),

  ServiceLeftContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  ServiceImage: {
    width: 60,
    height: 57,
    resizeMode: 'cover',
  },
  ServiceMethodContainer: language => ({
    marginLeft: language === 'English' ? 15 : 0,
    marginRight: language === 'English' ? 0 : 15,
  }),
  ServiceMainText: {
    fontSize: 18,
    color: '#FFA800',
    fontFamily: fontfamily.fontMedium,
    letterSpacing: 7,
  },
  ServiceSubText: {
    fontSize: 12,
    color: colors.textblack,
    fontFamily: fontfamily.fontRegular,
    marginLeft: 5,
    marginTop: 5,
    opacity: 0.6,
  },
  ServiceRate: {
    fontSize: 14,
    color: colors.textblack,
    fontFamily: fontfamily.fontMedium,
    marginTop: 3,
    // fontWeight:fontWeight.medium
  },
  ServiceQarText: {
    fontSize: 10,
    color: colors.textgray,
    fontFamily: fontfamily.fontRegular,
  },
  RightRate: {
    marginRight: 10,
  },
  activeService: {
    borderWidth: 1,
    borderColor: '#4BA5E2',
  },
  prblmbtn: {
    height: height / 16,
    minHeight: 50,
    borderColor: 'black',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
    marginHorizontal: 5,
  },
  prblmbtn2: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 40,
    marginHorizontal: 5,
    backgroundColor: colors.primarycolor,
  },
  prblmtncontainer: language => ({
    justifyContent: language === 'English' ? 'flex-start' : 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
  }),
  prblmtext: {
    color: colors.lightblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
  },
  headerrow: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  shimmertext:(language)=>({
    width: 100,
    height: 10,
    marginBottom: 10,
    borderRadius: 10,
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end'
  }),
});
