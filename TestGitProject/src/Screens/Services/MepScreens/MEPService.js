import {
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import CustomHeader from './../../../CustomComponents/CustomHeader';
import CustomTimePicker from '../../../CustomComponents/CustomTimePicker';
import DateTime from './Components/DateTime';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import Toast from 'react-native-toast-message';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { ticksvg } from '../../../../assets/svg/Svg';
import { useNavigation } from '@react-navigation/native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const MEPService = () => {
  const navigation = useNavigation();
  const { language, MepLists, BookService } = useContext(AuthContext);

  const [addressfromProps, setAddressFromProps] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [pickupDate, setPickupdate] = useState();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [pickupTime, setPickupTime] = useState();

  //
  const [datas, setDatas] = useState();
  const [newDatas, setNewDatas] = useState();
  const [isLoading, setLoading] = useState(false)
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const shimmerdata = [1, 2, 3, 4]

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
        text2: 'Choose time between 8 AM - 8 PM',
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


  const continuebtnhandler = value => {
    navigation.navigate('BookingSuccess');
  };

  //Creating a new Array for adding selected field

  const addnewArray = data => {
    setLoading(true)
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
    setLoading(false);
  };

  const selectService = (value) => {
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
      "address_id": addressfromProps,
      "service_type": "mep",
      "service_category": laundrcat,
      "appointment_date": pickupDate && pickupDate?.toISOString().slice(0, 10),
      "appointment_time": pickupTime && pickupTime?.toTimeString().slice(0, 8),
    };

    const result = await BookService(reqobj);
    if (result?.status === true) {
      navigation.replace('BookingSuccess');
    }
  };


  useEffect(() => {
    const apicall = async () => {
      setLoading(true);
      const result = await MepLists();
      setDatas(result?.data);
      addnewArray(result?.data?.services)
    };
    apicall();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#3579A3" barStyle="light-content" />
        {/* HEADER */}

        <CustomHeader
          lable={
            language === 'English'
              ? 'MEP Service'
              : 'خدمة الهندسة الكهربائية والميكانيكية'
          }
        />
        {/* MAIN COMPONENTS */}

        <ScrollView>
          <View style={styles.maincontainer}>
            <View style={styles.card1}>
              <View style={styles.headerrow(language)}>
                {!isLoading ? (
                  <Text style={styles.picktext}>
                    {language === 'English'
                      ? datas?.section_labels[0]?.service_label
                      : datas?.translations[0]?.value}
                  </Text>
                ) : (
                  <ShimmerPlaceholder style={styles.shimmertext(language)} />
                )}
                {!isLoading ? (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MepPrice');
                    }}>
                    <Text
                      style={{
                        color: colors.primarycolor,
                        textDecorationLine: 'underline',
                        marginHorizontal: 15,
                        // marginTop: 15,
                      }}>
                      Cost Lists
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <ShimmerPlaceholder style={styles.shimmertext(language)} />
                )}
              </View>
              <View style={styles.servicecontainer(language)}>
                {!isLoading
                  ? newDatas &&
                  newDatas?.map((item, index) => (
                    <TouchableOpacity
                      style={
                        item.selected === true
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
                        {language === 'English'
                          ? item?.name
                          : item?.translations}
                      </Text>
                    </TouchableOpacity>
                  ))
                  : shimmerdata.map((item, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                      <ShimmerPlaceholder
                        style={[
                          {
                            height: height / 22,
                            width: width / 3,
                            marginTop: 10,
                            marginHorizontal: 4,
                            borderRadius: 10,
                          },
                        ]}
                      />
                    </View>
                  ))}
              </View>
            </View>
          </View>

          <View style={styles.datetime}>
            {/* date */}
            {!isLoading ? (
              <Text style={styles.datetext}>
                {language === 'English'
                  ? datas?.section_labels[1]?.appointment_date_label
                  : datas?.translations[1]?.value}
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
                  ? datas?.section_labels[2]?.appointment_time_label
                  : datas?.translations[2]?.value}
              </Text>
            ) : (
              <ShimmerPlaceholder style={styles.shimmertext(language)} />
            )}
            <CustomTimePicker
              loading={isLoading}
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
          <View style={{ marginBottom: 100 }}>
            <CustomAdressCard onchange={changeadd} />
          </View>
        </ScrollView>

        {/* BOTTOM BAR */}
      </View>
      <View style={styles.bottombar}>
        <View style={{ width: '90%', alignSelf: 'center' }}>
          <CustomButton
            lable={language === 'English' ? 'Book Service' : 'خدمة الحجز'}
            style={styles.continuebtn}
            onPress={() => {
              bookService();
            }}
          />
        </View>
      </View>
    </>
  );
};

export default MEPService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  bar2: {
    height: 7,
    flexDirection: 'row',
    backgroundColor: '#4EBCFF',
  },
  maincontainer: {
    flex: 1,
    // backgroundColor: '#E6E6E647',
    backgroundColor: 'white',
  },
  card1: {
    width: '100%',
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: 20,
    marginBottom: 10,
    shadowColor: 'black',
  },
  picktext: {
    color: colors.lightblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.bold,
    fontFamily: fontfamily.fontBold,
    // marginVertical: 15,
    marginHorizontal: 10,
  },

  servicecontainer: (language) => ({
    justifyContent: language === 'English' ? 'flex-start' : 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical:5
  }),
  servicebtn: {
    paddingHorizontal: 20,
    height: height / 22,
    minHeight: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0.4,
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 3,
  },
  servicebtn2: {
    paddingHorizontal: 20,
    height: height / 26,
    minHeight: 35,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8DEF8',
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 3,
  },
  servicetext: {
    color: colors.textblack,
    fontSize: fontsize.paragraph,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
  },

  prblmbtn: {
    height: height / 16,
    minHeight: 50,
    borderColor: colors.lightblack,
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  prblmbtn2: {
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    backgroundColor: colors.primarycolor,
  },
  prblmtncontainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  prblmtext: {
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
  },
  inputstyle: {
    backgroundColor: '#E6E6E647',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    height: 125,
    textAlignVertical: 'top',
    padding: 10,
    marginBottom: 100,
    fontFamily: fontfamily.fontMedium,
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
  continuetext: {
    color: colors.white,
    fontSize: fontsize.paragraph,
    fontWeight: fontWeight.medium,
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
  headerrow: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  }),
  shimmertext: language => ({
    width: 100,
    height: 10,
    borderRadius: 10,
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end',
    marginVertical: 10
  }),
});
