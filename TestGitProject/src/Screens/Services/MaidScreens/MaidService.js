import {
  BackHandler,
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

import { AuthContext } from '../../../Context/AuthContext';
import CustomAdressCard from '../../../CustomComponents/CustomAdressCard';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomDatePicker from '../../../CustomComponents/CustomDatePicker';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import CustomTimePicker from '../../../CustomComponents/CustomTimePicker';
import DateTime from '../MepScreens/Components/DateTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { ticksvg } from '../../../../assets/svg/Svg';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MaidService = () => {
  const [barwidth, setBarwidth] = useState(50);
  const [radiobtn, setRadiobtn] = useState('');
  //

  const [servicedatas, setServiceDatas] = useState();
  const [slotdatas, setSlotDatas] = useState();
  const [addressfromProps, setAddressFromProps] = useState('');

  const navigation = useNavigation();
  const { language, MaidServiceApi, BookService } = useContext(AuthContext);
  const [newDatas, setNewDatas] = useState();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickupDate, setPickupdate] = useState();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickupTime, setPickupTime] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const shimmerdata = [1, 2]

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

  //Callback From Child Component To Get "address_id"

  const changeadd = add => {
    setAddressFromProps(add);
  };
  console.log(addressfromProps && addressfromProps);

  const continuebtnhandler = value => {
    // navigation.navigate('BookingSuccess');
    bookService();
  };

  useEffect(() => {
    const apicall = async () => {
      setIsLoading(true);
      const maiddata = await MaidServiceApi();
      setServiceDatas(maiddata?.data?.service);
      setSlotDatas(maiddata?.data?.slot?.data);
      console.log(maiddata?.data?.service?.data);
      console.log(maiddata?.data?.slot?.data);
      addnewArray(maiddata?.data?.service?.data);
    };
    apicall();
  }, []);

  //Creating a new Array for adding selected field

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
    console.log('NEW ARRAY >>>', newArray);
  };

  //To select multiple services

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

  // Book Service Api

  const bookService = async () => {
    let laundrcat = [];
    newDatas
      ?.filter(item => item.selected == true)
      .map(({ id }) => laundrcat.push(id));

    const reqobj = {
      address_id: addressfromProps,
      service_type: 'Maid Service',
      service_category: laundrcat,
      appointment_date: pickupDate && pickupDate?.toISOString().slice(0, 10),
      appointment_time: pickupTime && pickupTime?.toTimeString().slice(0, 8),
      gender: radiobtn,
    };
    console.log('BOOK SERVICE REQUEST>>>', reqobj);

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
        lable={language === 'English' ? 'Maid Service' : 'خدمة الخادمة'}
        onPress={() => {
          continuebtnhandler();
        }}
      />

      <ScrollView style={styles.maincontainer}>
        {!isLoading ? (
          <Text style={styles.text1}>
            {language === 'English'
              ? servicedatas?.gender_label
              : servicedatas?.translations[0]?.value}
          </Text>
        ) : (
          <ShimmerPlaceholder style={styles.shimmertext(language)} />
        )}
        {!isLoading ? (
          <View style={styles.radiobtn(language)}>
            <TouchableOpacity
              onPress={() => {
                setRadiobtn('male');
              }}
              style={styles.radiocontainer}>
              <View style={styles.circle1}>
                <View
                  style={[
                    styles.circle2,
                    { opacity: radiobtn === 'male' ? 1 : 0 },
                  ]}></View>
              </View>
              <Text style={styles.maletext}>
                {' '}
                {language === 'English' ? 'Male' : 'ذكر'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radiocontainer}
              onPress={() => {
                setRadiobtn('female');
              }}>
              <View style={styles.circle1}>
                <View
                  style={[
                    styles.circle2,
                    { opacity: radiobtn === 'female' ? 1 : 0 },
                  ]}></View>
              </View>
              <Text style={styles.maletext}>
                {language === 'English' ? 'Female' : 'أنثى'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.radiobtn(language)}>
            <ShimmerPlaceholder style={styles.circle1} />
            <ShimmerPlaceholder style={styles.shimmertext(language)} />
            <ShimmerPlaceholder style={styles.circle1} />
            <ShimmerPlaceholder style={styles.shimmertext(language)} />
          </View>
        )}

        <View
          style={{
            flexDirection: language === 'English' ? 'row' : 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {!isLoading ? (
            <Text style={styles.picktext}>
              {language === 'English'
                ? servicedatas?.service_label
                : servicedatas?.translations[0].value}
            </Text>
          ) : (
            <View>
              <ShimmerPlaceholder style={styles.shimmertext(language)} />
            </View>
          )}

          {!isLoading ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MaidPrice');
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

        {/* SERVICE BUTTONS */}

        <View style={styles.servicecontainer(language)}>
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                </View>
              </TouchableOpacity>
            ))
            : shimmerdata.map((item, index) => (
              <View key={index}>
                <ShimmerPlaceholder style={styles.servicebtn2} />
              </View>
            ))}
        </View>

        {/* DATA AND TIME */}

        <View style={styles.datetime}>
          {/* date */}
          {!isLoading ? (
            <Text style={styles.datetext}>
              {language === 'English'
                ? servicedatas?.appointment_date_label
                : servicedatas?.translations[2].value}
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
                ? servicedatas?.appointment_time_label
                : servicedatas?.translations[3].value}
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
          />
        )}
        <View style={{ marginBottom: 100 }}>
          <CustomAdressCard onchange={changeadd} />
        </View>
      </ScrollView>

      {/* BOTTOM BAR */}
      <View style={styles.bottombar}>
        <View style={{ alignSelf: 'center', width: '90%' }}>
          <CustomButton
            lable={language === 'English' ? 'Request Service' : 'اطلب الخدمة'}
            style={styles.continuebtn}
            onPress={() => {
              continuebtnhandler();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default MaidService;

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
    backgroundColor: 'white',
  },
  text1: {
    marginTop: 10,
    marginHorizontal: 15,
    color: colors.lightblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
  },
  maletext: {
    color: colors.textblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
  },
  radiobtn: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
    marginTop: 15,
  }),
  circle1: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 10,
  },
  circle2: {
    width: 10,
    height: 10,
    backgroundColor: colors.primarycolor,
    borderRadius: 10,
  },
  radiocontainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },

  picktext: {
    marginVertical: 10,
    marginHorizontal: 15,
    color: colors.lightblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
  },

  servicecontainer: language => ({
    justifyContent: language === 'English' ? 'flex-start' : 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 15,
  }),
  servicebtn: {
    paddingHorizontal: 15,
    height: height / 26,
    minHeight: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.4,
    margin: 5,
  },
  servicebtn2: {
    paddingHorizontal: 15,
    height: height / 26,
    minHeight: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8DEF8',
    margin: 5,
  },
  servicetext: {
    color: colors.lightblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
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
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  prblmbtn2: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
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

  bottombar: {
    height: 99,
    backgroundColor: '#3579A3',
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
  datetime: {
    // marginHorizontal: 15,
  },
  datetext: {
    color: colors.lightblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.bold,
    fontFamily: fontfamily.fontBold,
    marginHorizontal: 15,
    marginTop: 15,
  },
  shimmertext: language => ({
    width: 100,
    height: 10,
    borderRadius: 10,
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end',
    marginVertical: 10,
    marginHorizontal: 10,
  }),
});
