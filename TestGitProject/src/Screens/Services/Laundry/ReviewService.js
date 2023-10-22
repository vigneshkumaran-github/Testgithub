import {
  StyleSheet,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {
  colors,
  fontWeight,
  fontfamily,
} from '../../../Constants/DesignContstants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../../CustomComponents/CustomHeader';
import CustomButton from '../../../CustomComponents/CustomButton';
import SubServices from './Component/SubServices';
import ClothTypes from './Component/ClothTypes';
import {AuthContext} from '../../../Context/AuthContext';
import { useNavigation } from '@react-navigation/native';

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
    category_id: 4,
    english_category_name: 'Washing',
    arabic_category_name: 'غسلg',
    qty: 1,
    qar: 10,
  },
];

export default function ReviewService() {
  const {language} = useContext(AuthContext);

  const navigation = useNavigation();

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView />

      {/* Header Area */}
      <CustomHeader
        lable={language === 'English' ? 'Review' : 'خدمة غسيل الملابس'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Review Product Area */}
        <View style={styles.tableContainer}>
          <View style={styles.tableRow(language)}>
            <View style={styles.tabledata(language)}>
              <Text style={styles.tableHead}>{language === 'English' ? 'Service Type' : 'نوع الخدمة'}</Text>
            </View>
            <View style={styles.tabledata1}>
              <Text style={styles.tableHead}>{language === 'English' ? 'Qty' : 'الكمية'}</Text>
            </View>
            <View style={styles.tabledata2(language)}>
              <Text style={styles.tableHead}>{language === 'English' ? 'QAR' : 'ريال قطري'}</Text>
            </View>
          </View>

          {reviewData &&
            reviewData.map((item, index) => {
              return (
                <View style={styles.tableRow(language)} key={index}>
                  <View style={styles.tabledata(language)}>
                    <Text style={styles.tableDataContent}>
                      {' '}
                      {language === 'English'
                        ? item.english_category_name
                        : item.arabic_category_name}
                    </Text>
                  </View>
                  <View style={styles.tabledata1}>
                    <Text style={styles.tableDataContent}>{item.qty}</Text>
                  </View>
                  <View style={styles.tabledata2(language)}>
                    <Text style={styles.tableDataContent}>{item.qar}</Text>
                  </View>
                </View>
              );
            })}

          <View
            style={styles.TotalContent(language)}>
            <View style={styles.TotalPrice(language)}>
              <Text style={[styles.tableHead]}>{language === 'English' ? 'Estimated Total' : 'المجموع التقديري'}</Text>
              <Text style={[styles.tableHeadProce(language)]}> 1500 </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bootom Layout */}
      <View style={{position: 'absolute', bottom: 0}}>
        <View style={{padding: 15, marginBottom: 5}}>
          <Text style={styles.BottomContent(language)}>
            {language === 'English'
              ? 'This is an approximate value and it may vary later.'
              : 'هذه قيمة تقريبية وقد تختلف لاحقًا.'}
          </Text>
          <Text style={styles.TermsText(language)}>
            {language === 'English'
              ? 'Terms and Conditions'
              : 'الأحكام والشروط'}
          </Text>
        </View>

        <View style={styles.BottomLayout(language)}>
          <CustomButton
            lable={language === 'English' ? 'Book Pickup' : 'كتاب بيك اب'}
            style={styles.BottomButton}
            onPress={()=>navigation.navigate('BookingSuccess')}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  BottomLayout: language => ({
    height: 110,
    backgroundColor: '#3579A3',
    width: wp('100%'),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    flexDirection: language === 'English' ? 'row' : 'row',
    justifyContent: 'space-around',
  }),

  BottomButton: {
    width: wp('90%'),
  },

  BottomTotalText: {
    marginBottom: 5,
    fontSize: 12,
    color: colors.textgray,
    fontFamily: fontfamily.fontRegular,
  },
  ButtomTotalRate: {
    fontSize: 12,
    color: colors.textwhite,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
  },
  ButtomTotalRateBold: {
    fontSize: 25,
    color: colors.textwhite,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
  },

  BottomContent: language => ({
    fontSize: 13,
    color: colors.textblack,
    fontFamily: fontfamily.fontRegular,
    lineHeight: 26,
    opacity: 0.6,
    marginRight: language === 'English' ? 0 : 25,
  }),
  TermsText: language => ({
    fontSize: 13,
    color: colors.lightcolor,
    fontFamily: fontfamily.fontRegular,
    lineHeight: 26,
    marginRight: language === 'English' ? 0 : 25,
  }),

  tableContainer: {
    backgroundColor: '#F2FAFF',
    flex: 1,
    padding: 15,
    height: 'auto',
    width: wp('92%'),
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: hp('25%'),
    borderRadius: 10,
  },
  tableRow: language => ({
    flex: 5,
    flexDirection:  language === 'English' ? 'row' : 'row-reverse' ,
    justifyContent: 'space-between',
    height: 40,
  }),
  tabledata:language => ({
    flex: 2,
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
    alignItems:  language === 'English' ? 'flex-end' : 'flex-start',
  }),
  tableHead: {
    fontFamily: fontfamily.fontBold,
    fontWeight: fontWeight.medium,
    color: colors.textblack,
    fontSize: 14,
  },

  tableDataContent: {
    fontFamily: fontfamily.fontRegular,
    color: colors.textgray,
    fontSize: 14,
  },
  TotalContent:language => ({
    flexDirection:  language === 'English' ? 'row-reverse' : 'row' ,
    marginBottom: 10,
    marginTop: 5,
  }),
  TotalPrice:  language => ({
    flexDirection:  language === 'English' ? 'row' : 'row-reverse' ,
  }),
  tableHeadProce: language => ({
    fontFamily: fontfamily.fontBold,
    fontWeight: fontWeight.medium,
    color: colors.textblack,
    fontSize: 14,
    marginLeft: language==="English" ? 20:0,
    marginRight: language==="English" ? 0:20,
  }),
});
