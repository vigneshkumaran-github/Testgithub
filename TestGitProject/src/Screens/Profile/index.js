import {
  Edit,
  Help,
  Logout,
  TermsConditions,
  bookingHistory,
  savedAddress,
} from '../../../assets/svg/Svg';
import {
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {colors, fontWeight, fontfamily} from '../../Constants/DesignContstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SvgXml} from 'react-native-svg';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

export default function Profile() {
  const {language, logouthandler, Profile} = useContext(AuthContext);
  const naviagtion = useNavigation();
  const [datas, setDatas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const ShimmerPlaceholder=createShimmerPlaceholder(LinearGradient)


  useFocusEffect(
    React.useCallback(() => {
      const apicall = async () => {
        setIsLoading(true)
        const unsubscribe = await Profile();
        if (unsubscribe?.status === true) {
          setDatas(unsubscribe);
          console.log(unsubscribe);
        }
        setIsLoading(false);
        return () => unsubscribe();
      };
      apicall();
    }, []),
  );

  return (
    <View style={styles.Container}>
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
       <View style={styles.profileCard}>
          <View>
            {!isLoading ?
              <Image
              source={{uri: datas?.data?.user.profile_photo}}
              // source={require('../../../assets/images/profile.png')}
              style={styles.ProfileImage}
            />
            :
              <ShimmerPlaceholder style={styles.ProfileImage} />
            }
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                naviagtion.navigate('EditProfile', {datas: datas});
              }}>
              <SvgXml
                xml={Edit}
                width={15}
                height={15}
                style={styles.EditIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{datas?.data?.user.name}</Text>
          <Text style={styles.profileNumber}>
            {datas?.data?.user?.country_code}{' '}
            {datas?.data?.user?.contact_number}
          </Text>
        </View>
          

        <TouchableOpacity
          style={styles.settingsCard(language)}
          onPress={() => {
            naviagtion.navigate('BookingHistory');
          }}>
          <View style={styles.ContentLayout(language)}>
            <View style={styles.editButton1(language)}>
              <SvgXml
                xml={bookingHistory}
                width={15}
                height={15}
                style={styles.EditIcon}
              />
            </View>

            <Text style={styles.subScreensText}>
              {language === 'English' ? 'Booking History' : 'سجل الحجز'}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={'chevron-right'}
              size={20}
              color={colors.textblack}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsCard(language)}
          onPress={() => {
            naviagtion.navigate('Address');
          }}>
          <View style={styles.ContentLayout(language)}>
            <View style={styles.editButton1(language)}>
              <SvgXml
                xml={savedAddress}
                width={15}
                height={15}
                style={styles.EditIcon}
              />
            </View>

            <Text style={styles.subScreensText}>
              {language === 'English' ? 'Saved Address' : 'العنوان المحفوظ'}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={'chevron-right'}
              size={20}
              color={colors.textblack}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsCard(language)}
          onPress={() => {
            Linking.openURL('https://5serv.com/terms-and-condition');
          }}>
          <View style={styles.ContentLayout(language)}>
            <View style={styles.editButton1(language)}>
              <SvgXml
                xml={TermsConditions}
                width={15}
                height={15}
                style={styles.EditIcon}
              />
            </View>

            <Text style={styles.subScreensText}>
              {language === 'English'
                ? 'Terms & Conditions'
                : 'البنود و الظروف'}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={'chevron-right'}
              size={20}
              color={colors.textblack}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsCard(language)}
          onPress={() => {
            Linking.openURL(`tel:${'+974 31310600'}`);
          }}>
          <View style={styles.ContentLayout(language)}>
            <View style={styles.editButton1(language)}>
              <SvgXml
                xml={Help}
                width={15}
                height={15}
                style={styles.EditIcon}
              />
            </View>

            <Text style={styles.subScreensText}>
              {language === 'English' ? 'Help Center' : 'مركز المساعدة'}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={'chevron-right'}
              size={20}
              color={colors.textblack}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsCard(language)}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.ContentLayout(language)}>
            <View style={styles.editButton1(language)}>
              <SvgXml
                xml={Logout}
                width={15}
                height={15}
                style={styles.EditIcon}
              />
            </View>

            <Text style={styles.subScreensText}>
              {language === 'English' ? 'Logout' : 'تسجيل خروج'}
            </Text>
          </View>
          <View>
            <MaterialIcons
              name={'chevron-right'}
              size={20}
              color={colors.textblack}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Logout Dialog */}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Image
                source={require('../../../assets/images/LogoutImage.png')}
                style={styles.LogoutImage}
              />
              <Text style={styles.modalText}>Confirmation</Text>
              <Text style={styles.modalText1}>Are you sure </Text>
              <Text style={styles.modalText1}>you want to logout?</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '90%',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={styles.noBtn}
                  onPress={() => logouthandler()}>
                  <Text style={styles.noText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.yesBtn}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <LinearGradient
                    colors={[colors.secondarycolor, colors.secondarycolor1]}
                    style={[styles.ButtonContainer]}>
                    <Text style={styles.yesText}>No</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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
    width: wp('100%'),
    alignItems: 'center',
  },
  profileCard: {
    width: wp('90%'),
    // backgroundColor:colors.backgroundColor,
    height: 170,
    marginTop: 20,
    elevation: 2,
    shadowColor: colors.textgray,
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 17,
    borderRadius: 3,
  },
  ProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    resizeMode: 'cover',
  },
  EditIcon: {
    // bottom:5
  },
  editButton: {
    width: 30,
    backgroundColor: '#E2E2FB',
    height: 30,
    borderRadius: 30 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: 2,
    right: -5,
  },
  profileName: {
    fontSize: 20,
    fontFamily: fontfamily.fontMedium,
    color: '#3F3D93',
    lineHeight: 28,
    marginTop: 10,
  },
  profileNumber: {
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.textblack,
    lineHeight: 24,
    marginTop: 5,
    paddingBottom: 10,
  },

  profileNumber1: {
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    color: colors.textblack,
  },

  settingsCard: language => ({
    width: wp('90%'),
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    // backgroundColor:colors.backgroundColor,
    height: 60,
    marginTop: 20,
    elevation: 2,
    shadowColor: colors.textgray,
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 17,
    borderRadius: 3,
  }),
  ContentLayout: language => ({
    flexDirection: language === 'English' ? 'row' : 'row-reverse',
    alignItems: 'center',
  }),
  editButton1: language => ({
    width: 30,
    backgroundColor: '#E2E2FB',
    height: 30,
    borderRadius: 30 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  }),
  subScreensText: {
    fontSize: 18,
    fontFamily: fontfamily.fontMedium,
    color: colors.textblack,
    marginLeft: 12,
    marginRight: 12,
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
