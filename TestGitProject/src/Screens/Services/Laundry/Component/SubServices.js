import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useContext, useState} from 'react';
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
import { AuthContext } from '../../../../Context/AuthContext';

const LaundrycategoryData = [
  {
    id: 1,
    english_category_name: 'Dry Cleaning',
    arabic_category_name: 'التنظيف الجاف',
  },
  {
    id: 2,
    english_category_name: 'Laundry',
    arabic_category_name: 'مغسلة',
  },
  {
    id: 3,
    english_category_name: 'Ironing',
    arabic_category_name: 'كى الملابس',
  },
  {
    id: 4,
    english_category_name: 'Washing',
    arabic_category_name: 'غسلg',
  },

];

const SubServices = () => {
  const {language} = useContext(AuthContext);
  const navigation = useNavigation();
  const [categorySelected, setCategorySelected] = useState();


  const MainCategorySelected = id => {

    if(id!==categorySelected){
      setCategorySelected(id);
    }else{
      setCategorySelected("")
    }
 
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{marginLeft: 10, marginTop: 20}}
        fadingEdgeLength={5}>
        {LaundrycategoryData.map((item, index) => {
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
                {language==="English" ? item.english_category_name:item.arabic_category_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: 'auto',
     //padding: 10,
    backgroundColor: colors.backgroundColor,
  },
  cateCard: {
    height: 'auto',
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginVertical: 10,
    overflow: 'hidden',
    borderColor: colors.primarycolor,
    borderWidth: 1,
    flexDirection: 'row',
  },
  cateCardActive: {
    height: 'auto',
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    marginVertical: 10,
    overflow: 'hidden',
    borderColor: colors.primarycolor,
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: colors.primarycolor,
  },

  MainCategoryActiveText: {
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
    fontSize: 17.5,
    color: colors.textwhite,
  },
  MainCategoryInActiveText: {
    fontFamily: fontfamily.fontRegular,
    fontWeight: fontWeight.medium,
    fontSize: 17.5,
    color: colors.primarycolor,
  },
});
export default SubServices;
