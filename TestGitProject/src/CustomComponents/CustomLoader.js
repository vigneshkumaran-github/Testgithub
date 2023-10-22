import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

const Loader = () => {
  return (
    <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
      {/* <ActivityIndicator size={"large"} color={colors.primarycolor}/> */}

      <Lottie source={require('../../assets/json/loader.json')} loader
            autoPlay
            loop
            style={{ width: 100, height: 100 }} />
    </View>
  )
}

export default Loader