// import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {addsvg, housesvg, officesvg, otherssvg} from '../../assets/svg/Svg';
import {colors, fontWeight, fontfamily} from '../Constants/DesignContstants';

import {AuthContext} from '../Context/AuthContext';
import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import {SvgXml} from 'react-native-svg';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import {isMWeb} from '../Helper/HelperFunctions';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

const Height = Dimensions.get('window').height;
const Width = Dimensions.get('window').width;

const CustomAdressCard = ({onchange}) => {
  const {language, GetAddress, address, setAddress} = useContext(AuthContext);
  const [datas, setDatas] = useState([]);
  const [datas2, setDatas2] = useState([]);
  const [ismodalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [loading,setloading] = useState(false)
  const navigation = useNavigation();
  const ShimmerPlaceholder=createShimmerPlaceholder(LinearGradient)

  useEffect(() => {
    const apicall = async () => {
      setloading(true)
      const result = await GetAddress();
      if (result.status === true) {
        setDatas(result?.data?.addresses);
        //   setAddress(result?.data?.addresses);
        setDatas2(result?.data?.addresses);
        // onchange(result?.data?.addresses[0]?.id);
      }
      setloading(false)
    };

    apicall();
  }, []);

  /* useFocusEffect(
      React.useCallback(() => {
        const apicall = async () => {
          const unsubscribe = await Profile();
          if (unsubscribe?.status === true) {
            setDatas(unsubscribe)
          }
          return () => unsubscribe();
        }
        apicall()
      }, []),
    ); */

  const toggleModal = () => {
    setModalVisible(!ismodalVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      const apicall = async () => {
        setloading(true)
        const result = await GetAddress();
        if (result.status === true) {
          setDatas(result?.data?.addresses);
          //   setAddress(result?.data?.addresses);
          setDatas2(result?.data?.addresses);
          onchange(result?.data?.addresses[0]?.id);
        }
        setloading(false)
      };
      apicall();
    }, []),
  );

  const selectAddress = (item, index) => {
    setIndex(index);
    setModalVisible(!ismodalVisible);
    onchange(item?.id);
  };

  //

  return (
    <View>
      {/* ADDRESS CARD */}
      {!loading ? (
        datas2 && datas2.length !== 0 ? (
          <View style={styles.AddressCard(language)}>
            <View>
              <View style={styles.housecontainer(language)}>
                <SvgXml
                  xml={
                    datas[index]?.type === 'Home'
                      ? housesvg
                      : datas[index]?.type === 'Office'
                      ? officesvg
                      : otherssvg
                  }
                  width={35}
                  height={35}
                />
                <Text style={styles.hometext(language)}>
                  {language === 'English' ? datas[index]?.type : 'بيت'}
                </Text>
              </View>
              <Text style={styles.addressText}>
                {datas[index]?.full_address}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.changeBtn}
              onPress={() => {
                setModalVisible(!ismodalVisible);
              }}>
              <Text style={styles.changetext}>
                {language === 'English' ? 'Change' : 'يتغير'}{' '}
              </Text>
              <MaterialIcons
                name={'chevron-right'}
                size={20}
                color={'#648AEE'}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity
              style={styles.addcard}
              onPress={() => {
                navigation.navigate('AddAddress');
              }}>
              <SvgXml xml={addsvg} width={40} height={40} />
              <Text style={styles.addtext(language)}>
                {language === 'English'
                  ? 'Add New Address'
                  : ' إضافة عنوان جديد'}
              </Text>
            </TouchableOpacity>
          </>
        )
      ) : (
        <View>
          <ShimmerPlaceholder style={styles.shimmerstyle} />
        </View>
      )}

      {/* BOTTOM SHEET */}

      <Modal
        isVisible={ismodalVisible}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={toggleModal}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={900}
        animationOutTiming={500}
        backdropTransitionInTiming={1000}
        backdropTransitionOutTiming={500}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <View style={styles.center}>
            <View style={styles.barIcon} />

            <Text style={styles.picktext}>Pick Your Location</Text>

            {/* Getting all Adresses if exists ! */}
            {datas2 && datas2.length !== 0 ? (
              datas2?.map((item, index) => (
                <TouchableOpacity
                  style={styles.card(language)}
                  key={index}
                  onPress={() => {
                    selectAddress(item, index);
                  }}>
                  
                    <SvgXml
                      xml={
                        item.type === 'Home'
                          ? housesvg
                          : item.type === 'Office'
                          ? officesvg
                          : otherssvg
                      }
                      width={35}
                      height={35}
                    />  
                  
                
                  <View style={{flexDirection:'column',justifyContent:'center',alignItems:'flex-start',width:'90%'}}>
                  <Text style={styles.titletext}>{item?.type}</Text>
                  <Text numberOfLines={3} ellipsizeMode='tail' style={styles.address(language)}>
                    {item?.house_number},{item?.house_floor},{item?.landmark},{item?.full_address}
                  </Text>
                  </View>
                    <TouchableOpacity
                      style={{
                        marginHorizontal: 5,
                        position: 'absolute',
                        top: 10,
                        end: 10,
                        backgroundColor: colors.lightblue,
                        width: 25,
                        height: 25,
                        borderRadius: 25 / 2,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setModalVisible(!ismodalVisible)
                        navigation.navigate('EditAddress', {data: item});
                      }}>
                      <MaterialIcons
                        name="edit"
                        size={15}
                        color={colors.primarycolor}
                      />
                    </TouchableOpacity>
                 
                </TouchableOpacity>

              ))
            ) : (
              <Text style={[styles.titletext, {alignSelf: 'center'}]}>
                No Address Found !
              </Text>
            )}

            {/* ADD BUTTON */}

            {datas2.length < 3 && (
              <TouchableOpacity
                style={styles.addcard}
                onPress={() => {
                  setModalVisible(!ismodalVisible)
                  navigation.navigate('AddAddress');
                }}>
                <SvgXml xml={addsvg} width={40} height={40} />
                <Text style={styles.addtext(language)}>
                  {language === 'English'
                    ? 'Add New Address'
                    : ' إضافة عنوان جديد'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomAdressCard;

const styles = StyleSheet.create({
  addressText: {
    fontFamily: fontfamily.fontRegular,
    color: colors.textgray,
    fontSize: 15,
    fontWeight: fontWeight.regular,
    flexWrap: 'wrap',
    textAlign: 'left',
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
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 15,
    shadowColor: 'black',
    shadowRadius: 10,
    elevation: 4,
    shadowOpacity: 0.12,

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
    position: 'absolute',
    // alignSelf: 'center',
    right: 10,
    marginTop: 20,
  },
  changetext: {
    color: '#648AEE',
    fontSize: 14,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
  },

  //
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.backgroundColor,
    paddingTop: 13,
    paddingHorizontal: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    minHeight: Height / 2,
    paddingBottom: 20,
  },
  center: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  barIcon: {
    width: 60,
    height: 5,
    backgroundColor: '#bbb',
    borderRadius: 3,
    alignSelf: 'center',
  },
  text: {
    color: '#bbb',
    fontSize: 24,
    marginTop: 100,
  },
  picktext: {
    color: colors.textblack,
    fontSize: 18,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
    marginVertical: 10,
    marginHorizontal: 15,
  },

  //
  // CARD STYLES

  card: language => ({
    backgroundColor: colors.backgroundColor,
    borderRadius: 10,
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent:'flex-start',
    shadowColor: 'black',
    shadowRadius: 10,
  }),
  titletext: {
    color: colors.textblack,
    fontSize: 18,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
    marginHorizontal: 10,  
  },
  address: language => ({
    color: colors.textblack,
    fontSize: 14,
    fontWeight: fontWeight.regular,
    fontFamily: fontfamily.fontRegular,
    marginTop: 2,
    marginHorizontal: 10,
  }),
  addcard: {
    backgroundColor: colors.lightblue,
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addtext: language => ({
    color: colors.primarycolor,
    fontSize: 18,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
    marginHorizontal: 10,
  }),
  shimmerstyle: {
    width: '90%',
    alignSelf: 'center',
    height: 100,
    marginTop: 10,
    borderRadius:10
  }
});
