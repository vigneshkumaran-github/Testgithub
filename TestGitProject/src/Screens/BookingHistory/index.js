import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {colors, fontfamily} from '../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../Context/AuthContext';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import NoBookings from './NoBookings';
import {SvgXml} from 'react-native-svg';
import Toast from 'react-native-toast-message';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {locationsvg} from '../../../assets/svg/Svg';

export default function Dashboard() {
  const navigation = useNavigation();
  const {language, BookingHistory, dashboardData} = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const [index, setIndex] = useState(0);
  const [offset, setOffset] = useState(1);
  const [endReached, SetEndReached] = useState(false);
  const [keyval, setkeyval] = useState(1);
  const [isLoading2, setIsLoading2] = useState(false);
  const [count, setCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const shimmerdata = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [modalData, setModaldata] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingId, setBookinhgId] = useState();

  useFocusEffect(
    React.useCallback(() => {
      const apicall = async () => {
        setIsLoading(true);
        const result = await BookingHistory(dashboardData[index]?.tag, offset);
        setDatas(result?.data);
        console.log(result?.data, 'DATA');
        console.log(result?.data[0]?.service_list, 'serviceList');
        SetEndReached(false);
        setkeyval(keyval + 1);
        setOffset(1);
        setCount(result?.data?.length);
        setIsLoading(false);
        return () => result();
      };
      apicall();
    }, [index]),
  );

  // Increase Tab
  const incTab = () => {
    if (index < dashboardData.length - 1) {
      setIndex(index + 1);
      setOffset(1);
      SetEndReached(false);
    } else {
      setOffset(1);
      setIndex(0);
      SetEndReached(false);
    }
  };

  // Decrease Tab
  const decTab = () => {
    if (index === 0) {
      setIndex(dashboardData.length - 1);
      setOffset(1);
      SetEndReached(false);
    } else {
      setIndex(index - 1);
      setOffset(1);
      SetEndReached(false);
    }
  };

  const cardClickHandler = items => {
    if (dashboardData[index]?.tag === 'laundry') {
      navigation.navigate('OrderBookingsDetails', {
        service_booking_id: bookingId,
        service_sub_booking_id: items?.id,
      });
      setIsModalOpen(false)
    } else {
      navigation.navigate('MepOrderDetails', {
        service_booking_id: bookingId,
        service_sub_booking_id: items?.id,
      });
      setIsModalOpen(false)
    }
  };

  const openmodal = item => {
    setModaldata(item?.service_list);
    setBookinhgId(item?.service_booking_id);
    setIsModalOpen(true);
    console.log(item?.translations)
  };

  //Pagination
  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const screenHeight = event.nativeEvent.layoutMeasurement.height;

    if (offsetY + screenHeight >= contentHeight || count >= 10) {
      console.log(count);
      if (endReached === false) {
        setOffset(val => val + 1);
        const newOffset = offset + 1;
        apicall(newOffset);
      } else {
        // Alert.alert("EnD")
      }
    }
  };

  const apicall = async newOffset => {
    setIsLoading2(true);
    const result = await BookingHistory(dashboardData[index]?.tag, newOffset);
    if (result?.data?.length !== 0) {
      setDatas([...datas, ...result?.data]);
      console.log(offset, 'From offset');
      console.log(result);
    } else {
      console.log(newOffset);
      console.log(result);
      SetEndReached(true);
    }
    setCount(result?.data?.length);

    setIsLoading2(false);
  };

  return (
    <View style={styles.Container} key={keyval}>
      <SafeAreaView />
      <CustomHeader
        lable={language === 'English' ? 'Booking History' : 'سجل الحجز'}
      />
      <View style={styles.SwiperContainer}>
        <TouchableOpacity
          style={styles.TouchStyles}
          onPress={() => {
            decTab();
          }}>
          <MaterialIcons name={'chevron-left'} size={20} color={'#EF8732'} />
        </TouchableOpacity>
        <Text style={styles.ServiceText}>
          {language === 'English'
            ? dashboardData[index]?.title
            : dashboardData[index].translations[0].value}
        </Text>
        <TouchableOpacity
          style={styles.TouchStyles}
          onPress={() => {
            incTab();
          }}>
          <MaterialIcons name={'chevron-right'} size={20} color={'#EF8732'} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{marginBottom: 10}}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}>
        <View style={styles.HistoryLayout}>
          <View style={styles.HistoryContainer}>
            {/*Status Card View */}
            {/* Checking whether the data is empty or not */}
            {!isLoading ? (
              datas && datas.length !== 0 ? (
                <View style={{alignItems: 'center'}}>
                  {datas &&
                    datas.map((items, index1) => (
                      <>
                        <TouchableOpacity
                          style={styles.HistoryCard}
                          key={index1}
                          onPress={() => {
                            openmodal(items);
                          }}>
                          <View style={styles.FirstLayContainer(language)}>
                            <View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text style={styles.orderNoLable}>
                                  {items.service_booking_id}
                                </Text>
                              </View>

                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <SvgXml
                                  xml={locationsvg}
                                  width={20}
                                  height={20}
                                />
                                <Text style={styles.timeLable}>
                                  {items?.full_address}
                                </Text>
                              </View>
                            </View>
                          </View>

                          <TouchableOpacity
                            onPress={() => {
                              openmodal(items);
                            }}
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'absolute',
                              borderRadius: 20,
                              borderWidth: 0.5,
                              borderColor: colors.primarycolor,
                              top: 10,
                              right: 10,
                              // flex:1
                            }}>
                            <MaterialIcons
                              name={'chevron-right'}
                              size={20}
                              color={'#648AEE'}
                            />
                          </TouchableOpacity>
                        </TouchableOpacity>
                      </>
                    ))}
                </View>
              ) : (
                <NoBookings />
              )
            ) : (
              shimmerdata.map((item, index) => (
                <View style={{width: '95%'}}>
                  <ShimmerPlaceholder
                    style={{
                      marginTop: 20,
                      width: '100%',
                      alignSelf: 'center',
                      borderRadius: 10,
                      height: 70,
                    }}
                  />
                </View>
              ))
            )}
            {isLoading2 && (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={colors.primarycolor} />
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Dialog Modal */}

      <Modal
        isVisible={isModalOpen}
        onBackButtonPress={() => setIsModalOpen(false)}
        onBackdropPress={() => setIsModalOpen(false)}
        // onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.center}>
            {/* Heading Name */}
            <View
              style={{
                flexDirection: language === 'English' ? 'row' : 'row',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}>
              <Text style={styles.orderNoLable}>
                {language === 'English'
                  ? datas[0]?.service_list[0]?.booking_status_label
                  : datas[0]?.service_list[0].translations[1].value}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalOpen(false);
                }}>
                <Text style={styles.orderNoLable}>X</Text>
              </TouchableOpacity>
            </View>

            {modalData?.map((item, index1) => (
              <TouchableOpacity
                key={index1}
                onPress={() => {
                  cardClickHandler(item);
                }}
                style={{
                  flexDirection: 'row',
                  borderColor: 'black',
                  borderBottomWidth: 0.5,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '80%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                    {/* Service Name */}
                  {index!==0 ?
                  <Text style={[styles.ServiceText, {flexWrap:'wrap',width:'55%'}]}>
                    {language === 'English'
                      ? item?.name
                      : item?.translations[0].value}
                  </Text> 
                  :
                   <View style={{width:"55%",flexDirection:'row',flexWrap:'wrap',}}>
                    { item?.name.split(',').map((item2,index)=>(
                      <Text style={[styles.ServiceText,]}>{item2}</Text>
                    ))}
                   </View>
                  }
                  <View style={styles.statusCon(item?.status_color_code)}>
                    <Text style={styles.statusLable}>{item?.status}</Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    cardClickHandler(item);
                  }}
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    borderRadius: 20,
                    borderWidth: 0.5,
                    borderColor: colors.primarycolor,
                    // top: 10,
                    right: language === 'English' ? 10 : 10,
                    alignSelf:'center'
                    // left: language === 'English' ? 0 : 10,
                  }}>
                  <MaterialIcons
                    name={'chevron-right'}
                    size={20}
                    color={'#648AEE'}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  HistoryLayout: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  HistoryContainer: {
    width: wp('90%'),
    alignItems: 'center',
  },
  SwiperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    alignSelf: 'center',
  },
  TouchStyles: {
    width: 30,
    height: 30,
    backgroundColor: '#E7F6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    opacity: 0.6,
  },

  ServiceText: {
    fontFamily: fontfamily.fontMedium,
    fontSize: 14,
    color: colors.textblack,
    marginLeft: 10,
    marginRight: 10,
  },

  HistoryCard: {
    width: wp('90%'),
    backgroundColor: '#E3F3FF',
    marginTop: 20,
    borderRadius: 10,
  },

  FirstLayContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  }),
  orderNoLable: {
    fontSize: 16,
    fontFamily: fontfamily.fontMedium,
    color: colors.textblack,
  },
  timeLable: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: fontfamily.fontRegular,
    color: colors.textgray,
    width: '90%',
    marginHorizontal: 5,
  },
  statusCon: status_color_code => ({
    backgroundColor: status_color_code ? status_color_code : 'gray',
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 20,
    width: '40%',
    alignItems:'center',
    justifyContent:'center'
  }),
  statusLable: {
    fontSize: 12,
    fontFamily: fontfamily.fontMedium,
    color: colors.textwhite,
    textTransform: 'capitalize',
  },
  line: {
    borderStyle: 'dashed',
    borderWidth: 0.5,
    borderRadius: 1,
    borderColor: colors.textgray,
    width: wp('80%'),
  },
  StatusTracker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  StatusContainer: {
    gap: 10,
  },
  inactiveStatus: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: colors.textgray,
  },

  activeStatus: {
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    backgroundColor: '#6291ED',
  },

  statusLableText: {
    fontFamily: fontfamily.fontRegular,
    fontSize: 14,
    color: colors.textwhite,
    marginLeft: 5,
  },
  TextContainer: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  totalContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 15,
    marginTop: 20,
  }),

  TotalText: {
    fontFamily: fontfamily.fontMedium,
    fontSize: 16,
    color: colors.textblack,
  },
  TotalQar: {
    fontFamily: fontfamily.fontRegular,
    fontSize: 10,
    color: colors.textgray,
  },
  //
  modal: {
    justifyContent: 'center',
    margin: 10,
  },
  modalContent: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 13,
    paddingHorizontal: 12,
    borderRadius: 10,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
