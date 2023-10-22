import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import {
  Edit,
  Help,
  Logout,
  TermsConditions,
  bookingHistory,
  savedAddress,
} from '../../../assets/svg/Svg';
import {Height, Width, colors, fontfamily} from '../../Constants/DesignContstants';
import React, {useContext, useEffect, useState} from 'react';
import axios, {formToJSON} from 'axios';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import {BASE_URL} from '../../Api-Services/Config';
import CustomButton from '../../CustomComponents/CustomButton';
import CustomHeader from '../../CustomComponents/CustomHeader';
import {SvgXml} from 'react-native-svg';
import  Toast  from 'react-native-toast-message';
import {launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

// 



export default function EditProfile({route}) {
  const {language} = useContext(AuthContext);
  const naviagtion = useNavigation();
  const {datas} = route.params;
  const [name, setName] = useState(datas.data.user.name);
  const [id, setId] = useState('');
  const [email, setEmail] = useState(datas.data.user.email);
  const [contactno, setContacNo] = useState(datas.data.user.contact_number);
  const [cntrycode, setCntryCode] = useState('');
  const [photo, setPhoto] = useState(datas.data.user.profile_photo);

  const [profilePhoto, setprofilePhoto] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  console.log(profilePhoto);

  const options = {
    title: 'Select Image',
    type: 'library',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    options: {
      selectionLimit: 1,
      mediaType: 'photo',
      saveToPhotos: true,
    },
  };

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    console.log(images);
    setprofilePhoto({
      uri:
        Platform.OS === 'android'
          ? images.assets[0].uri
          : images.assets[0].uri.replace('file://', ''),
      type: images.assets[0].type,
      name: images.assets[0].fileName,
    });
    
   //Preview photo
    setPhoto(images.assets[0].uri);
  };

  const apicall = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    profilePhoto?.length !== 0 &&
      formData.append(
        'profile_photo',
        profilePhoto?.length !== 0 ? profilePhoto : null,
      );
    console.log(formData, 'nyvgytcxewz');
    try {
      response = await fetch(BASE_URL + '/profile/update', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('userToken')),
        },
      });
      let responseJson = await response.json();
      console.log(responseJson);
      console.log(responseJson?.status);
      if (responseJson?.status === true) {
        // Alert.alert(JSON.stringify(responseJson.message))
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: JSON.stringify(responseJson.message),
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setIsLoading(false);
        naviagtion.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: JSON.stringify(responseJson.error.message),
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log('sdhgjhggs', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.error.message,
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.Container}>
      <SafeAreaView />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader
          lable={language === 'English' ? 'Edit Profile' : 'تعديل الملف الشخصي'}
          style={{backgroundColor: colors.backgroundColor}}
          lableColor={{color: colors.textblack}}
        />

        <View style={styles.profileCard}>
          <View>
            <Image
              // source={require('../../../assets/images/profile.png')}
              source={
                photo
                  ? {uri: photo}
                  : require('../../../assets/images/profile.png')
              }
              style={styles.ProfileImage}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => {
                openGallery();
              }}>
              <SvgXml
                xml={Edit}
                width={15}
                height={15}
                style={styles.EditIcon}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textBoxContainer}>
          <Text style={styles.lableText(language)}>
            {language === 'English' ? 'User Name' : 'اسم المستخدم'}
          </Text>
          <TextInput
            inputMode={'text'}
            style={styles.Input}
            placeholderTextColor={colors.textblack}
            placeholder={'User name'}
            numberOfLines={1}
            value={name}
            onChangeText={val => {
              setName(val);
            }}
            editable
          />
          <Text style={styles.lableText(language)}>
            {language === 'English'
              ? 'Email Address'
              : 'عنوان البريد الإلكتروني'}
          </Text>
          <TextInput
            inputMode={'email'}
            style={styles.Input}
            placeholderTextColor={colors.textblack}
            placeholder={'Email'}
            numberOfLines={1}
            value={email}
            onChangeText={val => {
              setEmail(val);
            }}
            editable
            cursorColor={'black'}
          />

          <Text style={styles.lableText(language)}>
            {language === 'English' ? 'Mobile Number' : 'رقم الهاتف المحمول'}
          </Text>
          <TextInput
            inputMode={'numeric'}
            style={styles.Input}
            placeholderTextColor={colors.textblack}
            placeholder={'User name'}
            numberOfLines={1}
            value={contactno}
            editable={false}
          />

          <View style={{width: wp('80%'), marginTop: 80, marginBottom: 10}}>
            <CustomButton lable="Update" onPress={() => apicall()} />
          </View>
        </View>
      </ScrollView>

      {isLoading && (
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'absolute',
            width: Width,
            height: Height,
            flex: 1,
            zIndex: 100,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={colors.textwhite} />
        </View>
      )}
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
    width: wp('100%'),
    // backgroundColor:colors.backgroundColor,
    marginTop: 20,
    alignItems: 'center',
    paddingTop: 17,
    paddingBottom: 17,
  },
  ProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
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

  textStyle: {
    fontSize: 18,
    fontFamily: fontfamily.fontMedium,
    color: colors.textblack,
    marginLeft: 12,
    marginRight: 12,
  },
  Input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#FAFAFA',
    fontSize: 18,
    fontFamily: fontfamily.fontMedium,
    color: colors.textblack,
    marginLeft: 12,
    marginRight: 12,

    height: 55,
    width: wp('90%'),
    borderRadius: 10,
  },
  textBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('100%'),
  },
  lableText: language => ({
    alignSelf: language === 'English' ? 'flex-start' : 'flex-end',
    marginLeft: 17,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 10,
    fontSize: 12,
    color: colors.textblack,
    fontFamily: fontfamily.fontRegular,
    opacity: 0.5,
  }),
});
