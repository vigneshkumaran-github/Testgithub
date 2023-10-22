import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image, SvgXml} from 'react-native-svg';
import React, {useContext, useEffect, useState} from 'react';
import {
  addsvg,
  housesvg,
  officesvg,
  otherssvg,
} from '../../../../assets/svg/Svg';
import {
  colors,
  fontWeight,
  fontfamily,
} from '../../../Constants/DesignContstants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {AuthContext} from '../../../Context/AuthContext';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import { GetAllAddressApi } from '../../../Api-Services/Api/AddressApi';
import LinearGradient from 'react-native-linear-gradient';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

// import {MaterialIcons} from '@reactna/vector-icons';


const SavedAddress = () => {
  const [datas, setDatas] = useState([]);
  const navigation = useNavigation();
  const { language, GetAddress, DeleteAddress } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteId, setDeleteId] = useState()
  const[isLoading,setIsLoading] = useState(false)

  const apicall = async () => {
    setIsLoading(true)
    const result = await GetAddress();
    setDatas(result?.data.addresses);
    setIsLoading(false);
    return () => result();
    
  };

  useFocusEffect(
    React.useCallback(() => {
      apicall();
    }, []),
  );


  const deleteAddress = async () => {
    setModalVisible(!modalVisible)
    const reqobj = {
      address_id:deleteId
    };
    const result = await DeleteAddress(reqobj);
    if (result?.status === true) {
      apicall();
    }
  }

  // const reqobj = {
  //   address_id: 'dba314b5-3f24-49b6-9376-78aa302a2fe5',
  //   full_address: 'Gopal Nagar, Ondipudur, CBE-16',
  //   house_number: 'CBE-16',
  //   house_floor: 'Second Floor',
  //   landmark: 'near bag stiching shop',
  //   address_type: 'Other',
  //   latitude: 88.9,
  //   longitude: 90.09,
  // };

  return (
    <View style={styles.container}>
      <ScrollView>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={colors.primarycolor}
        />
        <CustomHeader
          lable={language === 'English' ? 'Saved Address' : 'العنوان المحفوظ'}
          lableColor={{color: colors.textwhite}}
          style={{backgroundColor: colors.primarycolor, marginBottom: 20}}
        />

        {isLoading && 
          <View>
            <ActivityIndicator size={'large'} color={colors.primarycolor}  />
          </View>
          
        }

        {/* Getting all Adresses if exists ! */}
        {datas && datas.length !== 0 ? (
          datas?.map((item, index) => (
            <View style={styles.card(language)} key={index}>
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

              <View style={{paddingHorizontal: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '80%',
                  }}>
                  <Text style={styles.titletext}>{item?.type}</Text>
                </View>
                <View style={{width: '90%', marginHorizontal: 10}}>
                  <Text style={styles.address}>
                    {item?.house_number}, {item?.house_floor} floor,{' '}
                    {item?.landmark}, {item?.full_address}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}>
                <TouchableOpacity
                  style={styles.editbtn}
                  onPress={() => {
                    navigation.navigate('EditAddress', {data: item});
                  }}>
                  <MaterialIcons
                    name="edit"
                    size={15}
                    color={colors.primarycolor}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editbtn}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    setDeleteId(item?.id);
                  }}>
                  <MaterialIcons
                    name="delete"
                    size={20}
                    color={colors.primarycolor}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={[styles.titletext, {alignSelf: 'center'}]}>
            No Address Found !
          </Text>
        )}

        {datas.length < 3 && (
          <TouchableOpacity
            style={styles.addcard}
            onPress={() => {
              navigation.navigate('AddAddress');
            }}>
            <SvgXml xml={addsvg} width={40} height={40} />
            <Text style={styles.addtext(language)}>
              {language === 'English' ? 'Add New Address' : ' إضافة عنوان جديد'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Logout Dialog */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible)}} style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalText}>Confirmation</Text>
              <Text style={styles.modalText1}>Are you sure </Text>
              <Text style={styles.modalText1}>you want to delete the address?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={styles.yesBtn}
                  onPress={() => deleteAddress()}>
                  <LinearGradient
                    colors={[colors.secondarycolor, colors.secondarycolor1]}
                    style={[styles.ButtonContainer]}>
                    <Text style={styles.yesText}>Yes</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.noBtn}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.noText}>NO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SavedAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  card: language => ({
    backgroundColor: colors.backgroundColor,
    shadowColor: 'black',
    shadowRadius: 10,
    elevation: 4,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    flexDirection: language === 'English' ? 'row' : 'row',
    width: '90%',
    alignSelf: 'center',
  }),
  titletext: {
    color: colors.textblack,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
  marginTop:'10%'
  },
  address: {
    color: colors.textblack,
    fontSize: 14,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontRegular,
    marginTop: 10,
  },
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
  editbtn: {
    marginHorizontal: 5,
    backgroundColor: colors.lightblue,
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: colors.backgroundColor,
    borderRadius: 20,
    padding: 10,
    width: '90%',
    height: 'auto',
  },
  modalHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  LogoutImage: {
    width: 109,
    height: 109,
    resizeMode: 'contain',
  },
  modalText: {
    fontSize: 18,
    fontFamily: fontfamily.fontMedium,
    fontWeight: fontWeight.medium,
    color: colors.textblack,
    marginTop: 10,
    marginBottom: 10,
  },
  modalText1: {
    fontSize: 14,
    fontFamily: fontfamily.fontMedium,
    fontWeight: fontWeight.medium,
    color: colors.textgray,
  },
  yesBtn: {
    width: '45%',
    height: 47,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ButtonContainer: {
    width: '100%',
    height: 47,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  yesText: {
    fontSize: 16,
    fontFamily: fontfamily.fontMedium,
    fontWeight: fontWeight.medium,
    color: colors.textwhite,
  },
  noBtn: {
    width: '45%',
    height: 47,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.secondarycolor,
    borderWidth: 1,
    backgroundColor: '#F6D6BB',
  },
  noText: {
    fontSize: 16,
    fontFamily: fontfamily.fontBold,
    fontWeight: fontWeight.bold,
    color: '#F19042',
  },
});
