import {
  Animated,
  BackHandler,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../Context/AuthContext';
import NextButton from './NextButton';
import {OnboardApiCall} from '../../../Api-Services/Api/OnboardApi';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import {colors} from '../../../Constants/DesignContstants';
import {useNavigation} from '@react-navigation/native';

const onboardingData = [
  {
    id: 1,
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../../../assets/images/onboarding1.png'),
    backroundColor: '#D5A3EE',
  },
  {
    id: 2,
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../../../assets/images/onboarding2.png'),
    backroundColor: '#E9A2A6',
  },
  {
    id: 3,
    title: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: require('../../../../assets/images/onboarding3.png'),
    backroundColor: '#FFC392',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [onboarddatas, setOnboardDatas] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const flatList = useRef();
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const { Onboard } = useContext(AuthContext);

  useEffect(() => {
    const apicall = async () => {
      const onboarddata = await Onboard()
      setOnboardDatas(onboarddata);
    };
    apicall();
  }, []);
  
  const scrollTo = async () => {
    if (currentIndex < onboardingData.length - 1) {
      flatList.current.scrollToIndex({index: currentIndex + 1});
    } else {
      try {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        navigation.navigate('Login');
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{backgroundColor: colors.primarycolor}} />
      <FlatList
        data={onboarddatas}
        renderItem={({item}) => (
          <OnboardingItem
            backColor={item.color}
            image={item?.image}
            title={item.title}
            description={item.content}
            onPress={() => navigation.navigate('Login')}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={flatList}
      />
      <View style={styles.indicator}>
        <Paginator data={onboardingData} scrollX={scrollX} />
        <NextButton
          percentage={(currentIndex + 1) * (100 / onboardingData.length)}
          scrollTo={scrollTo}
        />
      </View>
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
