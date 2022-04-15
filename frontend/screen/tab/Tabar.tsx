import React from 'react';
import {ImageBackground, Text, TouchableOpacity, View} from 'react-native';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import tw from 'twrnc';

export const AppTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const centerButtonIndex = Math.floor(state.routes.length / 2);
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
            <TouchableOpacity
              key={index}
              style={tw`flex-1 h-18 items-center justify-center shadow-lg`}
              accessibilityRole="button"
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
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
