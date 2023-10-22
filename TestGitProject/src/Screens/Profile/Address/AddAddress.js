import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  backGround,
  housesvg,
  officesvg,
  otherssvg,
} from '../../../../assets/svg/Svg';
import {
  colors,
  fontWeight,
  fontfamily,
} from '../../../Constants/DesignContstants';

import {AddAddressApi} from '../../../Api-Services/Api/AddressApi';
import {AuthContext} from '../../../Context/AuthContext';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

const AddAddress = () => {
  const [flatno, setFlatNo] = useState('');
  const [floor, setFloor] = useState('');
  const [fulladd, setFullAdd] = useState('');
  const [landmark, setLandMark] = useState('');
  const [selected, setSelected] = useState('');
  const navigation = useNavigation();
  const {language} = useContext(AuthContext);

  const reqobj = {
    //   address_id: 'dba314b5-3f24-49b6-9376-78aa302a2fe5',
    full_address: fulladd,
    house_number: flatno,
    house_floor: floor,
    landmark: landmark,
    address_type: selected,
    latitude: 88.9,
    longitude: 90.09,
  };

  const apicall = async () => {
    const result = await AddAddressApi(reqobj);
    console.log(result?.status);
    if (result?.status === true) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <CustomHeader
        lable={language === 'English' ? 'Add New Address' : ' إضافة عنوان جديد'}
        lableColor={{color: colors.textblack}}
        style={{backgroundColor: colors.backgroundColor, marginBottom: 20}}
      />
      <View style={styles.subcontainer}>
        <Text style={styles.text}>House / Flat No</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFlatNo}
          value={flatno}
          placeholder="House / Flat no"
          maxLength={25}
          keyboardType="default"
          placeholderTextColor={colors.lightblack}
        />

        <Text style={styles.text}>Floor</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFloor}
          value={floor}
          maxLength={25}
          placeholder="Floor No"
          keyboardType="default"
          placeholderTextColor={colors.lightblack}
        />

        <Text style={styles.text}>Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={setFullAdd}
          value={fulladd}
          placeholder="Address"
          keyboardType="default"
          placeholderTextColor={colors.lightblack}
        />

        <Text style={styles.text}>Land Mark</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLandMark}
          value={landmark}
          placeholder="landmark"
          keyboardType="default"
          placeholderTextColor={colors.lightblack}
        />
      </View>
      <Text style={[styles.text, {marginHorizontal: 25}]}>Save As</Text>
      <View
        style={[
          styles.rowview,
          {marginTop: 10, marginHorizontal: 20, justifyContent: 'space-evenly'},
        ]}>
        <TouchableOpacity
          style={[
            styles.rowview,
            styles.typebtn,
            {
              backgroundColor:
                selected === 'Home' ? colors.primarycolor : 'white',
            },
          ]}
          onPress={() => {
            setSelected('Home');
          }}>
          <SvgXml xml={housesvg} height={25} width={25} />
          <Text
            style={[
              styles.btntext,
              {color: selected === 'Home' ? 'white' : colors.primarycolor},
            ]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.rowview,
            styles.typebtn,
            {
              backgroundColor:
                selected === 'Office' ? colors.primarycolor : 'white',
            },
          ]}
          onPress={() => {
            setSelected('Office');
          }}>
          <SvgXml xml={officesvg} height={25} width={25} />
          <Text
            style={[
              styles.btntext,
              {color: selected === 'Office' ? 'white' : colors.primarycolor},
            ]}>
            Office
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.rowview,
            styles.typebtn,
            {
              backgroundColor:
                selected === 'Others' ? colors.primarycolor : 'white',
            },
          ]}
          onPress={() => {
            setSelected('Others');
          }}>
          <SvgXml xml={otherssvg} height={25} width={25} />
          <Text
            style={[
              styles.btntext,
              {color: selected === 'Others' ? 'white' : colors.primarycolor},
            ]}>
            Others
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
        <CustomButton
          lable={language === 'English' ? 'Confirm Location' : 'تأكيد الموقع'}
          onPress={() => {
            apicall();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  input: {
    backgroundColor: colors.lightblue,
    paddingHorizontal: 30,
    height: 50,
    borderRadius: 15,
    marginTop: 10,
    color: colors.lightblack,
  },
  subcontainer: {
    marginHorizontal: 20,
  },
  text: {
    color: colors.textblack,
    fontSize: 14,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
    marginTop: 20,
    marginHorizontal: 10,
  },
  rowview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typebtn: {
    justifyContent: 'center',
    padding: 10,
    borderColor: colors.primarycolor,
    borderRadius: 18,
    borderWidth: 0.8,
  },
  btntext: {
    color: colors.primarycolor,
    fontSize: 14,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
    marginHorizontal: 5,
  },
});
