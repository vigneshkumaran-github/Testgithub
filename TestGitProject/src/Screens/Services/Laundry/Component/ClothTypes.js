import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useContext, useMemo, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../../../Constants/DesignContstants';
import {AuthContext} from '../../../../Context/AuthContext';

const LaundryClothData = [
  {
    id: 0,
    english_cloth_type: 'All',
    arabic_cloth_type: 'الجميع',
  
  },
  {
    id: 1,
    english_cloth_type: 'Arabic Clothes',
    arabic_cloth_type: 'ملابس عربية',
  },
  {
    id: 2,
    english_cloth_type: 'Top wear',
    arabic_cloth_type: 'توبوير',
  },
  {
    id: 3,
    english_cloth_type: 'Bottom wear',
    arabic_cloth_type: 'ارتداء القاع',
  },
];


const ListoutData = [
    {
      id: 1,
      english_cloth_name: 'Baby Dress',
      arabic_cloth_name: 'فستان اطفال',
      rate_qar: 30,
      cloth_category_id:1,
    },
    {
      id: 2,
      english_cloth_name: 'Musalla',
      arabic_cloth_name: 'مصلى',
      rate_qar: 30,
      cloth_category_id:1,
    },
    {
      id: 3,
      english_cloth_name: 'Blankets',
      arabic_cloth_name: 'البطانيات',
      rate_qar: 25,
      cloth_category_id:2,
    },
    {
      id: 4,
      english_cloth_name: 'Jeans Shirts',
      arabic_cloth_name: 'قمصان جينز',
      rate_qar: 40,
      cloth_category_id:2,
    },
    {
      id: 5,
      english_cloth_name: 'Sudithar',
      arabic_cloth_name: 'سوديثار',
      rate_qar: 15,
      cloth_category_id:3,
    },
    {
      id: 6,
      english_cloth_name: 'T Shirts',
      arabic_cloth_name: 'تي شيرت',
      rate_qar: 50,
      cloth_category_id:3,
    },
    {
      id: 7,
      english_cloth_name: 'Full Combo Dress',
      arabic_cloth_name: 'فستان كامل كومبو',
      rate_qar: 75,
      cloth_category_id:3,
    },
    {
      id: 8,
      english_cloth_name: 'Mens Dress',
      arabic_cloth_name: 'فستان اطفال',
      rate_qar: 20,
      cloth_category_id:2,
    },
    {
      id: 9,
      english_cloth_name: 'Ladies Dress',
      arabic_cloth_name: 'فستان اطفال',
      rate_qar: 25,
      cloth_category_id:1,
    },
    {
      id: 10,
      english_cloth_name: 'Adults Dress',
      arabic_cloth_name: 'فستان اطفال',
      rate_qar: 35,
      cloth_category_id:1,
    },
  
  ];



const ClothTypes = () => {
  const {language} = useContext(AuthContext);
  const navigation = useNavigation();
  const [categorySelected, setCategorySelected] = useState(0);
  const [clothList, setClothList] = useState(ListoutData);


  const filteredList = useMemo(
    () => {
       
      if (categorySelected === 0 ) return clothList
      return clothList.filter(item => categorySelected === item.cloth_category_id)
    },
    [categorySelected, clothList]
  )

  const MainCategorySelected = id => {

   
        setCategorySelected(id);
   
  };



const LaundryClothList =  () =>{
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.Container}>
        <View style={styles.SubContainer}>
      
        {filteredList && filteredList.map((item, index) => {
           return (
              <>
          <View style={styles.ListLayout(language)} key={index}>
            <View style={styles.ListItem}>
              <Text style={styles.clothName}>{language==="English" ? item.english_cloth_name : item.arabic_cloth_name}</Text>
              <Text style={styles.clothPrice}>
                {language==="English" ? "QAR" :"ريال قطري" } <Text style={styles.clothPriceBold}>20</Text>
              </Text>
            </View>
  
            <View style={styles.ListItemRight(language)}>
              <TouchableOpacity style={styles.PlusMinusButton}>
                <Text style={styles.DecrementIncreament}>-</Text>
              </TouchableOpacity>
              <Text style={styles.countText}>2</Text>
              <TouchableOpacity style={styles.PlusMinusButton}>
                <Text style={styles.DecrementIncreament}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: colors.textgray,
              borderBottomWidth: 1,
            }}
          />
          </>
          );
      })}
  
  
  
        </View>
      </View>
      </ScrollView>
    );
  }

  return (
    <>
    <View style={styles.containerMain}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginLeft: 10, marginTop: 20}}
        fadingEdgeLength={5}>
        {LaundryClothData &&
          LaundryClothData.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  MainCategorySelected(item.id);
                }}
                key={index}
                style={
                  categorySelected === item.id
                    ? styles.cateCardActive
                    : styles.cateCard
                }>
                <Text
                  style={
                    categorySelected === item.id
                      ? styles.MainCategoryActiveText
                      : styles.MainCategoryInActiveText
                  }>
                  {' '}
                  {language === 'English'
                    ? item.english_cloth_type
                    : item.arabic_cloth_type}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>

    <LaundryClothList/>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    width: wp('100%'),
    height: 'auto',
    //padding: 10,
    backgroundColor: colors.backgroundColor,
  },
  cateCard: {
    height: 'auto',
    borderRadius: 25,
    padding: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    overflow: 'hidden',
    borderColor: colors.primarycolor,
    borderWidth: 1,
    flexDirection: 'row',
  },
  cateCardActive: {
    height: 'auto',
    borderRadius: 25,
    padding: 8,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    overflow: 'hidden',
    borderColor: colors.primarycolor,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.primarycolor,
  },

  MainCategoryActiveText: {
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
    fontSize: 14,
    color: colors.textwhite,
  },
  MainCategoryInActiveText: {
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
    fontSize: 14,
    color: colors.primarycolor,
  },



  Container: {
    width: wp('100%'),
    alignItems: 'center',
    marginTop: 15,
  },
  SubContainer: {
    width: wp('95%'),
    paddingBottom:hp("16%")
    
  },
  ListLayout: language=>({
    flexDirection: language ==="English" ? 'row' : 'row-reverse',
    justifyContent: 'space-between',
    padding: 15,
  }),
  ListItem: {},
  ListItemRight: language=>({
    flexDirection: language ==="English" ? 'row' : 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  clothName: {
    fontSize: 16,
    fontFamily: fontfamily.fontBold,
    fontWeight: fontWeight.bold,
    color: colors.textblack,
  },
  clothPrice: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.regular,
    color: '#3191EA',
  },
  clothPriceBold: {
    marginTop: 4,
    fontSize: 12,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
    color: '#3191EA',
  },
  DecrementIncreament: {
    fontSize: 18,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.bold,
    color: colors.textblack,
  },

  countText: {
    fontSize: 14,
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.bold,
    color: colors.textblack,
    marginLeft: 15,
    marginRight: 15,
  },
  PlusMinusButton: {
    backgroundColor: colors.textwhite,
    borderWidth:1,
    borderColor:colors.primarycolor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});
export default ClothTypes;
