import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useContext, useEffect, useState} from 'react';
import { colors, fontWeight, fontfamily, fontsize } from '../../../Constants/DesignContstants';

import { AuthContext } from '../../../Context/AuthContext';
import CustomHeader from '../../../CustomComponents/CustomHeader';

const MepPrice = () => {
  const [selected, setSelected] = useState(4);
  const {language, MepCost} = useContext(AuthContext);
  const [datas, setDatas] = useState();
  const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      const apicall = async () => {
          setIsLoading(true)
            const result = await MepCost();
            setDatas(result)
        setSelected(result?.data?.mep_service[0]?.id);
        setIsLoading(false)
        }
        apicall()
    }, [])

  return (
    <View style={styles.container}>
      <CustomHeader lableColor={colors.textwhite} lable={'Cost List'} />
      {!isLoading ? (
        <>
          <View>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              {datas?.data?.mep_service &&
                datas?.data?.mep_service.map((item, index) => (
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      {
                        backgroundColor:
                          selected === item?.id
                            ? colors.primarycolor
                            : colors.backgroundColor,
                      },
                    ]}
                    onPress={() => {
                      setSelected(item?.id);
                      console.log(selected);
                    }}>
                    <Text
                      style={[
                        styles.btntext,
                        {
                          color:
                            selected === item?.id
                              ? colors.textwhite
                              : colors.primarycolor,
                        },
                      ]}>
                      {language === 'English'
                        ? item?.name
                        : item?.translations[0].value}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>

          <View>
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

              {datas?.data?.mep_service
                ?.filter(item => item?.id === selected)
                .map((item, index) =>
                  item?.costs.map((item, index) => (
                    <View style={styles.headerview}>
                      <Text style={styles.listtext}>
                        {language === 'English'
                          ? item?.duration
                          : item?.translations?.value}
                      </Text>
                      <Text style={styles.listtext}>
                        {item?.service_charge}
                      </Text>
                    </View>
                  )),
                )}
            </ScrollView>
          </View>
          {datas?.data?.mep_service
            ?.filter(item => item.id == selected)
            .map(item => (
              <>
                <Text style={styles.bluetext}>
                  {language === 'English'
                    ? item?.trial_label
                    : item?.translations[0]?.value}{' '}
                  !
                </Text>
                <Text style={styles.bluetext}>
                  {language === 'English'
                    ? item?.material_label
                    : item?.translations[1]?.value}{' '}
                  !
                </Text>
              </>
            ))}
        </>
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
}

export default MepPrice

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
    height: 0.6,
    marginHorizontal: 10,
    marginTop: 15,
  },
  listtext: {
    color: colors.textblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
  },
  btn: {
    backgroundColor: colors.backgroundColor,
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: colors.primarycolor,
  },
  btntext: {
    color: colors.textblack,
    fontSize: fontsize.para,
    fontWeight: fontWeight.medium,
    fontFamily: fontfamily.fontMedium,
  },
  bluetext: {
    color: colors.primarycolor,
    fontSize: fontsize.para,
    fontWeight: fontWeight.medium,
      fontFamily: fontfamily.fontMedium,
      alignSelf: 'center',
    marginTop:20
  },
});
