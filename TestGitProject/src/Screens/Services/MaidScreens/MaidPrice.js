import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import {
  colors,
  fontWeight,
  fontfamily,
  fontsize,
} from '../../../Constants/DesignContstants';

import { AuthContext } from '../../../Context/AuthContext';
import CustomHeader from '../../../CustomComponents/CustomHeader';

const MaidPrice = () => {
  const { language, MaidCost } = useContext(AuthContext)
  const [datas, setDatas] = useState()
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const apicall = async () => {
      setIsLoading(true)
      const result = await MaidCost();
      setDatas(result)
      setIsLoading(false)
    }
    apicall()
  }, [])
  return (
    <View style={styles.container}>
      <CustomHeader lableColor={colors.textwhite} lable={'Cost List'} />
      {!isLoading ? (
        <ScrollView>
          <View style={styles.headerview}>
            <Text style={styles.headtext}>
              {language === 'English'
                ? datas?.data?.duration_label
                : datas?.data?.translations[0]?.value}
            </Text>
            <Text style={styles.headtext}>
              {language === 'English'
                ? datas?.data?.cost_label
                : datas?.data?.translations[1]?.value}
            </Text>
          </View>

          {/* Line */}
          <View style={styles.line} />

          {/* List */}

          {datas?.data?.costs &&
            datas?.data?.costs.map((item, index) => (
              <View style={styles.headerview}>
                <Text style={styles.listtext}>
                  {language === 'English'
                    ? item?.duration
                    : item?.translations?.value}
                </Text>
                <Text style={styles.listtext}>{item?.service_charge}</Text>
              </View>
            ))}
        </ScrollView>
      ) : (
        <View>
          <ActivityIndicator
            size={'large'}
            color={colors.textwhite}
            style={{
              zIndex: 1,
              backgroundColor: 'rgba(0,0,0,0.2)',
              height: '100%',
            }}
          />
        </View>
      )}
    </View>
  );
};

export default MaidPrice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
  },
  headerview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 20,
  },
  headtext: {
    color: colors.textblack,
    fontSize: fontsize.subheading,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
  },
  line: {
    backgroundColor: colors.textblack,
    height: .6,
    marginHorizontal: 10,
    marginTop: 15,
  },
  listtext: {
    color: colors.textblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
  },
});
