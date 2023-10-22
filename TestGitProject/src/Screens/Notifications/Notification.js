import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  backbtnsvg,
  cancelledsvg,
  confirmsvg,
  onthewaysvg,
  outdeliverysvg,
} from '../../../assets/svg/Svg';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../Constants/DesignContstants';

import {AuthContext} from '../../Context/AuthContext';
import CustomHeader from '../../CustomComponents/CustomHeader';
import EmptyNotify from './Components/EmptyNotify';
import LinearGradient from 'react-native-linear-gradient';
import OneSignal from 'react-native-onesignal';
import {SvgXml} from 'react-native-svg';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window');
const height = Dimensions.get('window');

const Notification = () => {
  const navigation = useNavigation();
  const {language, Notification} = useContext(AuthContext);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false)
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const shimmerdata=[1,2,3,4,5,6,7,8,9,10]

  const getNotification = async () => {
    setIsLoading(true)
    const result = await Notification();
    console.log(result);
    setData(result?.data);
    setIsLoading(false)
  };

  useEffect(() => {
    getNotification();
  }, []);

  const backbtnhandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={colors.primarycolor}
      />
      <SafeAreaView style={{ backgroundColor: colors.backgroundColor }} />
      
       {/* Header Area */}
       <CustomHeader
        lable={language === 'English' ? 'Notifications' :'الاخطارات'}
      />
      <ScrollView>
        {/* Component Switch */}

        {!isLoading ? (
          (data?.today && data?.today.length !== 0) ||
          (data?.yesterday && data?.yesterday.length !== 0) ||
          (data?.earlier && data?.earlier.length !== 0) ? (
            <>
              <View style={styles.subcontainer(language)}>
                {data?.today && data?.today.length !== 0 && (
                  <Text style={styles.datetext}>{data?.today_label}</Text>
                )}
                {data?.today &&
                  data?.today?.length !== 0 &&
                  data?.today?.map((val, index) => (
                    <View key={index} style={styles.card}>
                      <View style={styles.cardsubcontainer(language)}>
                        <Text style={styles.order_id}>{val?.title}</Text>
                        <Text style={styles.datetimetext}>
                          {val?.created_at}
                        </Text>
                      </View>
                      <Text style={styles.contenttext}>{val.description}</Text>
                    </View>
                  ))}

                {data?.yesterday && data?.yesterday.length !== 0 && (
                  <Text style={styles.datetext}>{data?.yesterday_label}</Text>
                )}
                {data?.yesterday &&
                  data?.yesterday?.length !== 0 &&
                  data?.yesterday?.map((val, index) => (
                    <View key={index} style={styles.card}>
                      <View style={styles.cardsubcontainer(language)}>
                        <Text style={styles.order_id}>{val?.title}</Text>
                        <Text style={styles.datetimetext}>
                          {val?.created_at}
                        </Text>
                      </View>
                      <Text style={styles.contenttext}>{val?.description}</Text>
                    </View>
                  ))}

                {data?.earlier && data?.earlier.length !== 0 && (
                  <Text style={styles.datetext}>{data?.earlier_label}</Text>
                )}
                {data?.earlier &&
                  data?.earlier?.length !== 0 &&
                  data?.earlier?.map((val, index) => (
                    <View key={index} style={styles.card}>
                      <View style={styles.cardsubcontainer(language)}>
                        <Text style={styles.order_id}>{val?.title}</Text>
                        <Text style={styles.datetimetext}>
                          {val?.created_at}
                        </Text>
                      </View>
                      <Text style={styles.contenttext}>{val.description}</Text>
                    </View>
                  ))}
              </View>
            </>
          ) : (
            <EmptyNotify />
          )
        ) : (
          shimmerdata.map((item, index) => (
            <View key={index}>
              <ShimmerPlaceholder
                style={{
                  width: '90%',
                  height: 70,
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginTop:10
                }}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  header: language => ({
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: language === 'English' ? 'row' : 'row',
  }),
  backbtn: {
    height: 50,
    width: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primarycolor,
  },
  title: {
    color: colors.textblack,
    fontWeight: fontWeight.regular,
    fontFamily: fontfamily.fontMedium,
    fontSize: fontsize.bigheading,
    alignSelf: 'center',
    marginHorizontal: 20,
  },
  subcontainer: language => ({
    marginTop: 20,
    marginHorizontal: 15,
    alignItems: language === 'English' ? 'flex-start' : 'flex-start',
  }),
  datetext: {
    color: colors.primarycolor,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
    fontSize: fontsize.heading,
    letterSpacing: 8,
    marginVertical: 5,
  },
  card: {
    backgroundColor: '#E3F3FF',
    marginVertical: 7,
    borderRadius: 10,
    paddingVertical: 15,
    alignSelf: 'center',
    paddingHorizontal: 10,
    width: '100%',
  },

  cardsubcontainer: language => ({
    flexDirection: language === 'English' ? 'row' : 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }),
  order_id: {
    color: colors.textblack,
    fontWeight: fontWeight.bold,
    fontFamily: fontfamily.fontBold,
    fontSize: fontsize.para,
    marginHorizontal: 5,
    width: '60%',
    flexWrap: 'wrap',
  },
  datetimetext: {
    color: colors.textgray,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
    fontSize: fontsize.paragraph,
    position: 'absolute',
    right: 0,
  },
  statustext: {
    color: colors.textblack,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontBold,
    fontSize: fontsize.para,
    alignSelf: 'auto',
  },
  contenttext: {
    color: colors.textgray,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
    fontSize: fontsize.para,
    marginHorizontal: 8,
    marginTop: 5,
  },
});
