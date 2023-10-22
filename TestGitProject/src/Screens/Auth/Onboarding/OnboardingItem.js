import { Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors, fontWeight, fontfamily, fontsize } from '../../../Constants/DesignContstants'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'

import React from 'react'

const {width} = Dimensions.get('window')
const height = Dimensions.get('window').height
const OnboardingItem = (item) => {
  return (
    <View style={styles.container}>
        <SafeAreaView />
        {/* <TouchableOpacity style={styles.SkipButton} onPress={item.onPress}>
        <Text style={styles.SkipText}>Skip</Text>
        </TouchableOpacity> */}
       <View style={styles.TopContainer(item.backColor)}>
        <View style={styles.imagebox}>
      <Image source={{uri:item.image}} style={styles.image}/>
        </View>
        </View>
      <View style={styles.textbox}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        </View>
    </View>
  )
}

export default OnboardingItem

const styles = StyleSheet.create({
    container: {
        flex:1,
        // marginTop:Platform.OS === 'ios' ? 10 : 20,
    },

    TopContainer: color=>({
        alignItems:"center",
         justifyContent:'center',
        backgroundColor:color,
        width:wp("100%"),
        height:hp("45%"),
        borderBottomLeftRadius: 70,
        borderBottomRightRadius: 70,
    }),
    imagebox:{
        width:237,
        height:237,
        // justifyContent:'center',
        // alignItems:'center',
        
    },
    image:{
        width:237,
        height:237,
        resizeMode:'contain',
    },
    textbox:{
        width:width,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        marginTop:20
    },
    title:{
        fontSize:24,
        fontWeight:fontWeight.medium,
        marginBottom:20,
        fontFamily:fontfamily.fontMedium,
        color :'#157DA2'
    },
    description:{
        fontSize:14,
        color:'#000000',
        opacity:0.6,
        lineHeight:22,
        fontFamily:fontfamily.fontRegular,
    },
    SkipButton:{
        fontSize:14,
        lineHeight:22,
        position:'absolute',
        right:20,
        padding:10,
    },
    SkipText:{
        fontSize:14,
        lineHeight:22,
        color:'#000000',
        fontFamily:fontfamily.fontRegular,
        marginTop:10
    }

})