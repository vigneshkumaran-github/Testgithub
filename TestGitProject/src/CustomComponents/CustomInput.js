import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors, fontfamily} from '../Constants/DesignContstants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { AuthContext } from '../Context/AuthContext';
export default function CustomInput({inputMode,placeholderText,iconName,...action}) {

    const {language} = useContext(AuthContext);

  return (
    <View style={styles.InputSection(language)}>
      <Icon
        style={styles.InputIcon}
        name={iconName}
        size={20}
        color="#000"
      />
      <TextInput
        inputMode={inputMode}
        style={styles.Input}
        placeholderTextColor={'#ADC7D7'}
        placeholder={placeholderText}
        numberOfLines={1}
        {...action}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    InputSection: language => ({
        width:wp("90%"),
        flexDirection: language==="English" ? 'row':'row-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#EFF9FF",
        height:55,
        borderRadius:30,
        marginTop:19,
    }),
    InputIcon: {
        padding: 10,
        paddingLeft:15
    },
    Input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: "#EFF9FF",
        color: '#ADC7D7',
        height:55,
        borderRadius:30
    },
});
