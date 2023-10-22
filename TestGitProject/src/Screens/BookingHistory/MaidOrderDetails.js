import {
  Animated,
  Dimensions,
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  backGround,
  housesvg,
  officesvg,
  otherssvg,
} from '../../../assets/svg/Svg';
import {colors, fontfamily} from '../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {AuthContext} from '../../Context/AuthContext';
import BottomBack from '../../../assets/images/background.png';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';
import DialogModal from './DialogModal';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

const reviewData = [
  {
    category_id: 1,
    english_category_name: 'Dry Cleaning',
    arabic_category_name: 'التنظيف الجاف',
    qty: 3,
    qar: 150,
  },
  {
    category_id: 2,
    english_category_name: 'Laundry',
    arabic_category_name: 'مغسلة',
    qty: 1,
    qar: 30,
  },
  {
    category_id: 3,
    english_category_name: 'Ironing',
    arabic_category_name: 'كى الملابس',
    qty: 2,
    qar: 80,
  },
  {
    category_id: 3,
    english_category_name: 'Washing',
    arabic_category_name: 'كى الملابس',
    qty: 2,
    qar: 80,
  },
  {
    category_id: 3,
    english_category_name: 'Ironing',
    arabic_category_name: 'كى الملابس',
    qty: 2,
    qar: 80,
  },
  {
    category_id: 3,
    english_category_name: 'Ironing',
    arabic_category_name: 'كى الملابس',
    qty: 2,
    qar: 80,
  },
];

export default function MaidOrderDetails({route}) {
  const {language, HistoryDetails} = useContext(AuthContext);
  const navigation = useNavigation();
  const {service_booking_id, service_sub_booking_id} = route.params;
  const [datas, setDatas] = useState([]);
  const [reviewDatas, setReviewDatas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);

  const reqobj = {
    service_booking_id: service_booking_id,
    service_sub_booking_id: service_sub_booking_id,
  };

  useEffect(() => {
    const apical = async () => {
      const result = await HistoryDetails(reqobj);
      setDatas(result?.data);
      setReviewDatas(result?.data?.summary?.summary);
      console.log(result?.data?.summary_items);
    };
    apical();
  }, []);

  //Convert railwaytime

  const converttime = val => {
    // const val = '18:08:08';
    let newval = val?.slice(0, 2);
    if (newval > 12) {
      return newval - 12 + ':' + val?.slice(3, 5) + 'Pm';
    }
    return newval + ':' + val?.slice(3, 5) + 'Am';
  };

  const totalval = () => {
    let sum = 0;
    const total =
      reviewDatas &&
      reviewDatas.map(
        (item, index) => (sum = sum + item?.qty * item?.service_charge),
      );
    console.log(total);
    return sum;
  };

  const openModal = item => {
    setIsModalOpen(!isModalOpen);
    setModalData(item);
  };

  return (
    <View style={styles.Container}>
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader
          lable={language === 'English' ? 'Booking Details' : 'تفاصيل الطلب'}
          style={{backgroundColor: colors.textwhite}}
          lableColor={{color: colors.textblack}}
        />
        <View style={[styles.Layout]}>
          {/* ORDER DETAIL CARD */}
          {datas &&
            datas?.services?.map((item, index) => (
              <View key={index} style={styles.HistoryCard}>
                <View style={styles.FirstLayContainer(language)}>
                  <Text style={styles.orderNoLable}>
                    {language === 'English'
                      ? 'BOOKING ID'
                      : 'رقم التعريف الخاص بالطلب'}
                  </Text>
                  <Text style={styles.orderNoLable}>{service_booking_id}</Text>
                </View>

                <View style={styles.FirstLayContainer(language)}>
                  <Text style={styles.timeLable1}>
                    {language === 'English'
                      ? item?.maid_and_beautician_service.name
                      : 'اختر تاريخا'}
                  </Text>
                  <Text style={styles.timeLable1}>
                    {/* {datas?.pickup_date + ' | ' + converttime(datas?.pickup_time)} */}
                  </Text>
                </View>

                {
                  <View style={styles.FirstLayContainer(language)}>
                    <Text style={styles.timeLable}>
                      {language === 'English'
                        ? datas?.appointment_label
                        : 'تاريخ التسليم او الوصول'}
                    </Text>
                    <Text style={styles.timeLable1}>
                      {item?.appointment_date +
                        '|' +
                        item?.appointment_time_converted}
                    </Text>
                  </View>
                }
              </View>
            ))}

          <View style={styles.HistoryCard}>
            <Text style={styles.orderNoLable}>
              {language === 'English' ? 'Service Location' : 'موقع التسليم'}
            </Text>

            <View style={styles.secondLayoutContainer(language)}>
              <View>
                <SvgXml
                  xml={
                    datas?.address_type === 'Home'
                      ? housesvg
                      : datas?.address_type === 'Office'
                      ? officesvg
                      : otherssvg
                  }
                  width={35}
                  height={35}
                  style={{marginTop: 15}}
                />
              </View>
              <View style={{marginLeft: 15, width: wp('73%')}}>
                <Text style={styles.addressHead}> {datas?.address_type}</Text>
                <Text style={styles.addressText}>{datas?.full_address}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bootom Layout Footer*/}

      <View style={styles.BottomLayout(language)}>
        <ImageBackground
          source={BottomBack}
          style={styles.BottomLayout(language)}>
          <Text style={styles.billDetails(language)}>
            {language === 'English' ? datas?.summary_label : 'تفاصيل الفاتورة'}
          </Text>
          {/* Review Product Area */}
          <View style={styles.tableContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tableRow(language)}>
                <View style={styles.tabledata(language)}>
                  <Text style={styles.tableHead}>
                    {language === 'English' ? 'Service Type' : 'نوع الخدمة'}
                  </Text>
                </View>

                <View style={styles.tabledata2(language)}>
                  <Text style={styles.tableHead}>
                    {language === 'English' ? 'QAR' : 'ريال قطري'}
                  </Text>
                </View>
              </View>
              {reviewDatas &&
                reviewDatas.map((item, index) => {
                  return (
                    <View style={styles.tableRow(language)} key={index}>
                      <TouchableOpacity
                        style={styles.tabledata(language)}
                        onPress={() => {
                          openModal(item);
                        }}>
                        <Text style={styles.tableDataContent}>
                          {' '}
                          {language === 'English' ? item?.name : item?.name}
                        </Text>
                      </TouchableOpacity>
                      <View style={styles.tabledata2(language)}>
                        <Text style={styles.tableDataContent}>
                          {item?.service_charge}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
            <View style={{alignItems: 'center'}}>
              <View style={styles.line} />
            </View>
            <View style={styles.TotalContent(language)}>
              <View style={styles.TotalPrice(language)}>
                <Text style={[styles.textTotal]}>
                  {language === 'English' ? 'Total' : 'المجموع التقديري'}
                </Text>
                <Text style={[styles.tableHeadProce(language)]}>
                  {/* = {totalval()} */}
                  {datas?.summary?.total_service_charge}
                </Text>
              </View>
            </View>
          </View>

          {/* <CustomButton
            lable={language === 'English' ? 'Pay Now' : 'يكمل'}
            style={styles.BottomButton}
            onPress={() => {
              navigation.navigate('BottomTab');
            }}
          /> */}
        </ImageBackground>
      </View>

      {/* Dialogs */}
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
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.orderNoLable}>
                {modalData && modalData.length !== 0 && modalData?.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalOpen(false);
                }}>
                <Text style={styles.orderNoLable}>X</Text>
              </TouchableOpacity>
            </View>

            {/* Activities */}
            {modalData.activities &&
              modalData.activities.length !== 0 &&
              modalData.map((item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text></Text>
                </View>
              ))}

            {/* Total Text */}
            <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
              <Text
                style={[
                  styles.orderNoLable,
                  {marginHorizontal: 5, marginTop: 10},
                ]}>
                Total
              </Text>
              <Text
                style={[
                  styles.orderNoLable,
                  {marginHorizontal: 5, marginTop: 10},
                ]}>
                0
              </Text>
            </View>
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
  Layout: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: 10,
    marginBottom: HEIGHT / 2,
  },
  HistoryCard: {
    width: wp('90%'),
    backgroundColor: '#E3F3FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 13,
  },
  FirstLayContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  secondLayoutContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
  }),

  orderNoLable: {
    fontSize: 16,
    fontFamily: fontfamily.fontMedium,
    color: colors.textblack,
  },
  timeLable: {
    marginTop: 15,
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.textgray,
  },

  timeLable1: {
    marginTop: 15,
    fontSize: 12,
    fontFamily: fontfamily.fontMedium,
    color: colors.textblack,
  },

  addressHead: {
    marginTop: 15,
    fontSize: 15,
    fontFamily: fontfamily.fontMedium,
    color: colors.primarycolor,
  },
  addressText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: fontfamily.fontRegular,
    color: colors.textgray,
  },
  BottomLayout: language => ({
    // height: 110,
    backgroundColor: '#3579A3',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    // flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 15,
    resizeMode: 'contain',
  }),

  BottomButton: {
    width: wp('90%'),
  },

  tableContainer: {
    flex: 1,
    padding: 15,
    // height: 'auto',
    maxHeight: hp('33%'),
    width: wp('92%'),
    alignSelf: 'center',
    // marginTop: 30,
    borderRadius: 10,
  },
  tableRow: language => ({
    flex: 5,
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    height: 40,
  }),
  tabledata: language => ({
    flex: 5,
    margin: 1,
    alignItems: language === 'English' ? 'flex-start' : 'flex-end',
  }),

  tabledata1: {
    flex: 2,
    margin: 1,
    alignItems: 'center',
  },
  tabledata2: language => ({
    flex: 2,
    margin: 1,
    alignItems: language === 'English' ? 'flex-end' : 'flex-start',
  }),
  tableHead: {
    fontFamily: fontfamily.fontBold,
    color: colors.textgray,
    fontSize: 14,
  },

  textTotal: {
    fontFamily: fontfamily.fontMedium,
    color: colors.textwhite,
    fontSize: 16,
  },

  tableDataContent: {
    fontFamily: fontfamily.fontRegular,
    color: colors.textwhite,
    fontSize: 16,
  },
  TotalContent: language => ({
    // flexDirection:  language === 'English' ? 'row-reverse' : 'row' ,
    marginBottom: 10,
    marginTop: 5,
  }),
  TotalPrice: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    marginLeft: 10,
  }),
  tableHeadProce: language => ({
    fontFamily: fontfamily.fontMedium,
    color: colors.textwhite,
    fontSize: 14,
    // marginLeft: language==="English" ? 20:0,
    // marginRight: language==="English" ? 0:20,
  }),

  line: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 1,
    borderColor: colors.textgray,
    width: wp('80%'),
    marginBottom: 10,
    marginTop: 10,
  },
  billDetails: language => ({
    marginTop: 20,
    marginBottom: 10,
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end',
    marginLeft: language === 'English' ? 25 : 0,
    marginRight: language === 'English' ? 0 : 25,
    fontSize: 18,
    fontFamily: fontfamily.fontMedium,
    color: colors.textwhite,
  }),
  //
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 13,
    paddingHorizontal: 12,
    borderRadius: 20,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
