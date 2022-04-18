import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Animated,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import tw from 'twrnc';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const {width: DevicesWidth, height: DevicesHeight} = Dimensions.get('window');

export const AppTabBar = ({state, descriptors, navigation}) => {
  const centerButtonIndex = Math.floor(state.routes.length / 2);
  mode = new Animated.Value(0);
  buttonSize = new Animated.Value(1);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(buttonSize, {
        useNativeDriver: false,
        toValue: 1,
      }),
      Animated.timing(mode, {
        toValue: mode._value === 0 ? 1 : 0,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const thermometerX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -100],
  });

  const thermometerY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const timeX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, -24],
  });

  const timeY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -150],
  });

  const pulseX = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-24, 50],
  });

  const pulseY = mode.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, -100],
  });

  const rotation = mode.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const sizeStyle = {
    transform: [{scale: buttonSize}],
  };
  return (
    <ImageBackground
      style={tw.style('flex-row w-full h-24', {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
      })}
      source={require('../../images/menu_bg.png')}
    >
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        if (index === centerButtonIndex) {
          return (
            <>
              <View
                style={{
                  position: 'absolute',
                  bottom: DevicesHeight * 0.074,
                  left: DevicesWidth * 0.5,
                }}
              >
                <Animated.View
                  style={{
                    position: 'absolute',
                    left: thermometerX,
                    top: thermometerY,
                  }}
                >
                  <TouchableOpacity style={styles.button}>
                    <Feather name="repeat" size={24} color="#FFF" />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{position: 'absolute', left: timeX, top: timeY}}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Wallet')}
                  >
                    <Ionicons name="wallet-outline" size={24} color="#FFF" />
                  </TouchableOpacity>
                </Animated.View>
                <Animated.View
                  style={{position: 'absolute', left: pulseX, top: pulseY}}
                >
                  <TouchableOpacity style={styles.button}>
                    <Feather name="activity" size={24} color="#FFF" />
                  </TouchableOpacity>
                </Animated.View>
              </View>
              <TouchableOpacity
                key={index}
                style={tw`flex-1 h-18 items-center justify-center shadow-lg`}
                accessibilityRole="button"
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={handlePress}
              >
                <View
                  style={tw.style(
                    '-mt-8 rounded-full w-15 h-15 justify-center items-center shadow-lg',
                    {backgroundColor: '#1F6CFF'},
                  )}
                ></View>
                <Text style={tw`text-xs font-normal mt-2 text-blue-700`}>
                  {label}
                </Text>
              </TouchableOpacity>
            </>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            style={tw`flex-1 h-18 items-center justify-center`}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {options.tabBarIcon
              ? options.tabBarIcon({
                  focused: isFocused,
                  color: isFocused
                    ? 'rgba(255, 153, 0, 1)'
                    : 'rgba(180, 180, 180, 1)',
                  size: 24,
                })
              : undefined}
            <Text style={tw`text-xs font-normal mt-1`}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1F6CFF',
  },
});
