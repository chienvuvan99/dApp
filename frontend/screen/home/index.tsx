import {StyleSheet, Text, View, Button, Image, Pressable} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  Extrapolate,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';

const Pulse = ({delay = 0, repeat}) => {
  const animation = useSharedValue(0);
  useEffect(() => {
    animation.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 2000,
          easing: Easing.linear,
        }),
        repeat ? -1 : 1,
        false,
      ),
    );
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      animation.value,
      [0, 1],
      [0.6, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity: opacity,
      transform: [{scale: animation.value}],
    };
  });
  return <Animated.View style={[styles.circle, animatedStyles]} />;
};

const HomeScreen = () => {
  const [pulse, setPulse] = useState([1]);
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Pressable
          style={styles.innerCircle}
          onPress={() => {
            setPulse(prev => [...prev, Math.random()]);
          }}
        >
          <Image
            style={styles.innerCircle}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
        </Pressable>
        {pulse.map((item, index) => (
          <Pulse repeat={index === 0} />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  circle: {
    width: 300,
    borderRadius: 150,
    height: 300,
    position: 'absolute',
    borderColor: '#e91e63',
    borderWidth: 4,
    backgroundColor: '#ff6090',
  },
  innerCircle: {
    width: 80,
    borderRadius: 40,
    height: 80,
    zIndex: 100,
    position: 'absolute',
    backgroundColor: 'white',
  },
});
