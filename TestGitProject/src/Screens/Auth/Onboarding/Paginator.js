import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native'
import React from 'react'



const { width } = Dimensions.get('window')
const Paginator = ({ data, scrollX }) => {
    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                })
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View key={i.toString()} style={[styles.dot, { width: dotWidth, opacity }]} />
            })}
        </View>
    )
}

export default Paginator

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: '#157DA2',
        marginHorizontal: 4
    }


})