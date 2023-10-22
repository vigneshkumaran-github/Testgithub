import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../../Constants/DesignContstants';
import CustomButton from '../../../CustomComponents/CustomButton';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../Context/AuthContext';


const PestReview = () => {
  const navigation = useNavigation();
  const {language} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.primarycolor}
        barStyle="light-content"
      />
      {/* HEADER */}
      <CustomHeader lable={language === 'English' ? 'Review' : 'استعراض'} />

      <Text style={styles.summarytext}>
        {language === 'English' ? 'Payment Summary' : 'ملخص الدفع'}
      </Text>
      <View style={styles.card}>
        <View style={styles.rowtext}>
          <Text style={styles.cardtext1}>
            {language === 'English' ? 'Details' : 'التفاصيل'}
          </Text>
          <Text style={styles.cardtext12}>1BHK</Text>
        </View>
        <View style={styles.rowtext}>
          <Text style={styles.cardtext1}>
            {language === 'English' ? 'Delivery' : 'تسليم'}
          </Text>
          <Text style={styles.cardtext12}>Tuesday , 11:AM</Text>
        </View>
        <View style={styles.rowtext}>
          <Text style={styles.cardtext1}>
            {' '}
            {language === 'English' ? 'Type' : 'نوع'}
          </Text>
          <Text style={styles.cardtext12}>Home</Text>
        </View>
        <View style={styles.amounttext}>
          <Text style={styles.costtext}>Total Cost</Text>
          <Text style={styles.costnum}>2000</Text>
        </View>
      </View>

      <View style={styles.bottomtext}>
        <Text style={styles.termstextblack}>
          {language === 'English'
            ? 'This is an approximate amount value and it may vary'
            : 'هذه قيمة مبلغ تقريبية وقد تختلف'}
        </Text>
        <View style={styles.rowview}>
          <Text style={styles.termstextblack}>
            {language === 'English'
              ? 'at the end of the service. '
              : 'في نهاية الخدمة. '}
          </Text>
          <TouchableOpacity>
            <Text style={styles.blutext}>
              {language === 'English'
                ? 'Term and Condition'
                : 'الشروط والأحكام'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottombar}>
        <CustomButton
          lable={language === 'English'?"Book Appointement":'حجز موعد'}
          style={styles.continuebtn}
          onPress={() => navigation.navigate('BookingSuccess')}
        />
      </View>
    </View>
  );
};

export default PestReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  summarytext: {
    marginTop: 15,
    marginHorizontal: 15,
    color: colors.lightblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.regular,
    fontFamily: fontfamily.fontBold,
  },
  card: {
    backgroundColor: colors.billcolor,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 20,
    paddingVertica: 5,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 2,
  },
  rowtext: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginVertical: 10,
  },
  cardtext1: {
    color: '#AAAAAA',
    fontSize: fontsize.para,
    fontWeight: fontWeight.regular,
    fontFamily: fontfamily.fontMedium,
  },
  cardtext12: {
    color: colors.textblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
  },
  amounttext: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  costtext: {
    color: colors.textblack,
    fontSize: fontsize.paragraph,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
    alignSelf: 'center',
    marginRight: 10,
  },
  costnum: {
    fontSize: fontsize.subheading,
    fontWeight: 'bold',
    color: colors.textblack,
    fontFamily: fontfamily.fontBold,
  },
  bottomtext: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
  },
  rowview: {
    flexDirection: 'row',
  },
  blutext: {
    color: colors.primarycolor,
    fontSize: fontsize.para,
    fontWeight: fontWeight.regular,
    fontFamily: fontfamily.fontMedium,
    alignSelf: 'center',
  },
  termstextblack: {
    color: colors.lightblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.regular,
    fontFamily: fontfamily.fontMedium,
  },
  //
  bottombar: {
    height: 99,
    backgroundColor: colors.primarycolor,
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },

  continuebtn: {
    width: '80%',
    alignSelf: 'center',
  },
});
