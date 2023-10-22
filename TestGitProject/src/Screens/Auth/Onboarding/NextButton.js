import { StyleSheet, Text, View,TouchableOpacity,Animated} from 'react-native'
import React, { useRef,useEffect } from 'react'
import Svg, {Circle,G} from 'react-native-svg';
import Icon from 'react-native-vector-icons/Entypo'
import { colors } from '../../../Constants/DesignContstants';
import LinearGradient from 'react-native-linear-gradient';
  

const NextButton = ({percentage,scrollTo}) => {
    const size = 80
    const strokeWidth = 2
    const center = size/2
    const radius = size/2 - strokeWidth/2
    const circumference = 2 * Math.PI * radius
    const progressAnimation = useRef(new Animated.Value(0)).current;
    const progressRef = useRef(null);
    const animation = (toValue) => {
        return Animated.timing(progressAnimation,{
            toValue,
            duration:250,
            useNativeDriver:true
        }).start()
    }

    useEffect(() => {
        animation(percentage)
    },[percentage])

    useEffect(() => {
        progressAnimation.addListener((value) => {
            const strokeDashoffset = circumference - (circumference * value.value) / 100;
            if(progressRef?.current){
                progressRef.current.setNativeProps({
                    strokeDashoffset
                })
            }
        })
        return () => {
            progressAnimation.removeAllListeners()
        }
    },[percentage])

  return (
    <View style={styles.container}>
        {/* <Svg width={size} height={size} fill={'none'}>
            <Circle stroke='#D5EEF7' cx={center} cy={center} r={radius} strokeWidth={strokeWidth}/>
            <G rotation='-90' origin={center}>
                <Circle
                    ref={progressRef}
                    stroke='#157DA2'
                    cx={center}
                    cy={center}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
            
                />
            </G>
        </Svg> */}
        <TouchableOpacity   style={styles.button}  onPress={scrollTo}>
        <LinearGradient 
                colors={[colors.secondarycolor, colors.secondarycolor1]}
                style={styles.button}>
                 <Icon name='chevron-small-right' size={35} color={colors.textwhite}/>
              </LinearGradient>
           
        </TouchableOpacity> 


      
    </View>
  )
}

export default NextButton

const styles = StyleSheet.create({
    container: {
        position:'absolute',
        bottom:0,
        right:20,
        width:80,
        height:80,
        justifyContent:'center',
        alignItems:'center'
        
    },
    button:{
        position:'absolute',
        width:60,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center',
       
    }


})