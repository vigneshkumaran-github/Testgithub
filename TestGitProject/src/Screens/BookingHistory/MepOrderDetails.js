import {
  ActivityIndicator,
  Animated,
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
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

export default function MepOrderDetails({route}) {
  const {language, HistoryDetails} = useContext(AuthContext);
  const navigation = useNavigation();
  const {service_booking_id, service_sub_booking_id} = route.params;
  const [datas, setDatas] = useState([]);
  const [reviewDatas, setReviewDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const reqobj = {
    service_booking_id: service_booking_id,
    service_sub_booking_id: service_sub_booking_id,
  };

  useEffect(() => {
    const apical = async () => {
      setIsLoading(true);
      const result = await HistoryDetails(reqobj);
      setDatas(result?.data);
      setReviewDatas(result?.data?.summary_list.list);
      setIsLoading(false);
      console.log(result?.data?.summary_items);
    };
    apical();
  }, []);

  return (
    <View style={styles.Container}>
      <SafeAreaView />
      <CustomHeader
        lable={language === 'English' ? 'Booking Details' : 'تفاصيل الطلب'}
        style={{backgroundColor: colors.textwhite}}
        lableColor={{color: colors.textblack}}
      />
      {!isLoading ? (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.Layout}>
              <View style={styles.HistoryCard}>
                <View style={styles.FirstLayContainer(language)}>
                  <Text style={styles.orderNoLable}>
                    {language === 'English'
                      ? datas?.service_booking_id_label
                      : datas?.translations
                          ?.filter(
                            item => item.key == 'service_booking_id_label',
                          )
                          .map(({key, value, locale}) => value)}
                  </Text>
                  <Text style={styles.orderNoLable}>{service_booking_id}</Text>
                </View>

                <View style={styles.FirstLayContainer(language)}>
                  <Text style={styles.timeLable}>
                    {language === 'English'
                      ? datas?.appointment_label
                      : datas?.translations
                          ?.filter(item => item.key == 'appointment_label')
                          .map(({key, value, locale}) => value)}
                  </Text>
                  <Text style={styles.timeLable1}>{datas?.appointment}</Text>
                </View>

                <View style={styles.FirstLayContainer(language)}>
                  <Text style={styles.timeLable}>
                    {language === 'English'
                      ? datas?.payment_status_label
                      : datas?.translations
                          ?.filter(item => item.key == 'payment_status_label')
                          .map(({key, value, locale}) => value)}
                  </Text>
                  <Text style={styles.timeLable1}>{datas?.payment_status}</Text>
                </View>
              </View>

              <View style={styles.HistoryCard}>
                <Text style={styles.orderNoLable}>
                  {language === 'English'
                    ? datas?.address_label
                    : datas?.translations
                        ?.filter(item => item.key == 'address_label')
                        .map(({key, value, locale}) => value)}
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
                    <Text style={styles.addressHead}>
                      {' '}
                      {datas?.address_type}
                    </Text>
                    <Text style={styles.addressText}>
                      {datas?.full_address}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Bootom Layout Footer*/}
          <View
            // source={BottomBack}
            style={styles.BottomLayout(language)}>
            <Text style={styles.billDetails(language)}>
              {language === 'English'
                ? datas?.summary_label
                : datas?.translations
                    ?.filter(item => item.key == 'summary_label')
                    .map(({key, value, locale}) => value)}
            </Text>
            {/* Review Product Area */}
            <View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.tableContainer}>
                <View style={styles.tableRow(language)}>
                  <View style={styles.tabledata(language)}>
                    <Text style={styles.tableHead}>
                      {language === 'English'
                        ? datas?.summary_list?.service_label
                        : datas?.translations
                            ?.filter(item => item.key == 'service_label')
                            .map(({key, value, locale}) => value)}
                    </Text>
                  </View>
                  <View style={styles.tabledata2(language)}>
                    <Text style={[styles.tableHead, {alignSelf: 'center'}]}>
                      {language === 'English'
                        ? datas?.summary_list?.qty_label
                        : datas?.summary_list?.translations
                            ?.filter(item => item.key == 'qty_label')
                            .map(({key, value, locale}) => value)}
                    </Text>
                  </View>

                  <View style={styles.tabledata2(language)}>
                    <Text style={styles.tableHead}>
                      {language === 'English'
                        ? datas?.summary_list?.service_charge_label
                        : datas?.summary_list?.translations
                            ?.filter(item => item.key == 'service_label')
                            .map(({key, value, locale}) => value)}
                    </Text>
                  </View>
                </View>

                <View>
                  {reviewDatas &&
                    reviewDatas.map((item, index) => {
                      return (
                        <>
                          <View style={styles.tableRow(language)} key={index}>
                            <TouchableOpacity
                              style={styles.tabledata(language)}>
                              <Text style={styles.tableDataContent}>
                                {language === 'English'
                                  ? item?.name
                                  : item?.translations
                                      ?.filter(item => item.key == 'name')
                                      .map(({key, value, locale}) => value)}
                              </Text>
                            </TouchableOpacity>

                            {item?.qty && (
                              <View style={styles.tabledata2(language)}>
                                <Text
                                  style={[
                                    styles.tableDataContent,
                                    {alignSelf: 'center'},
                                  ]}>
                                  {item?.qty}x
                                </Text>
                              </View>
                            )}

                            <View style={styles.tabledata2(language)}>
                              <Text style={styles.tableDataContent}>
                                {item?.service_charge}
                              </Text>
                            </View>
                          </View>
                        </>
                      );
                    })}
                </View>

                {/* line */}
                <View style={{alignItems: 'center'}}>
                  <View style={styles.line} />
                </View>

                {/* Total Amount */}
                <View style={styles.TotalContent(language)}>
                  <View style={styles.TotalPrice(language)}>
                    <Text style={[styles.textTotal]}>
                      {language === 'English'
                        ? datas?.summary_list?.total_service_charge_label
                        : datas?.summary_list?.translations
                            ?.filter(
                              item => item.key == 'total_service_charge_label',
                            )
                            .map(({key, value, locale}) => value)}
                    </Text>
                    <Text style={[styles.tableHeadProce(language)]}>
                      {datas?.summary_list?.total_service_charge}
                    </Text>
                  </View>
                </View>

                {/* Advance Payment */}
                <View style={styles.TotalContent(language)}>
                  <View style={styles.TotalPrice(language)}>
                    <Text style={[styles.textTotal]}>
                      {language === 'English'
                        ? datas?.summary_list?.prepaid_label
                        : datas?.summary_list?.translations
                            ?.filter(item => item.key == 'prepaid_label')
                            .map(({key, value, locale}) => value)}
                    </Text>
                    <Text style={[styles.tableHeadProce(language)]}>
                      {datas?.summary_list?.prepaid_amount === null
                        ? 0
                        : '-' + datas?.summary_list?.prepaid_amount}
                    </Text>
                  </View>
                </View>

                {/* line */}
                <View style={{alignItems: 'center'}}>
                  <View style={styles.line} />
                </View>

                {/* Total due amount after subtracted from advance payment */}
                <View style={styles.TotalContent(language)}>
                  <View style={styles.TotalPrice(language)}>
                    <Text style={[styles.textTotal]}></Text>
                    <Text
                      style={[
                        styles.tableHeadProce(language),
                        {marginBottom: 30},
                      ]}>
                      {datas?.summary_list?.total_service_charge -
                        datas?.summary_list?.prepaid_amount}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        </>
      ) : (
        <View>
          <ActivityIndicator
            size={'large'}
            color={colors.primarycolor}
            style={{
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0)',
              height: '100%',
            }}
          />
        </View>
      )}
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
    marginBottom: 20,
  },
  HistoryCard: {
    width: wp('90%'),
    backgroundColor: '#E3F3FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 13,
  },
  FirstLayContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),

  secondLayoutContainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row',
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
    backgroundColor: '#3579A3',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    paddingTop: 20,
    paddingBottom: 15,
  }),

  BottomButton: {
    width: wp('90%'),
  },

  tableContainer: {
    flex: 1,
    padding: 15,
    maxHeight: hp('33%'),
    width: wp('92%'),
    alignSelf: 'center',
    marginBottom: 10,
  },
  tableRow: language => ({
    flex: 5,
    flexDirection: language === 'English' ? 'row' : 'row',
    justifyContent: 'space-between',
    height: 40,
  }),
  tabledata: language => ({
    flex: 5,
    margin: 1,
    alignItems: language === 'English' ? 'flex-start' : 'flex-start',
  }),

  tabledata1: {
    flex: 2,
    margin: 1,
    alignItems: 'center',
  },
  tabledata2: language => ({
    flex: 2,
    margin: 1,
    alignItems: language === 'English' ? 'flex-end' : 'flex-end',
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
    flexDirection: language === 'English' ? 'row' : 'row',
    justifyContent: 'space-between',
    marginLeft: 3,
    marginBottom: 5,
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
    alignSelf: language === 'English' ? 'flex-start' : 'flex-start',
    marginLeft: language === 'English' ? 25 : 25,
    // marginRight: language === 'English' ? 0 : 25,
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
