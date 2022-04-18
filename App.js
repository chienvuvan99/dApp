import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//screen

import HomeScreen from './frontend/screen/home';
import Assets from './frontend/screen/assets';
import Notifications from './frontend/screen/notification';
import Transfer from './frontend/screen/transfer';
import User from './frontend/screen/user';
import Wallet from './frontend/screen/walletConnect/AppWithProviders';

//component

import {AppTabBar} from './frontend/screen/tab/Tabar';

//icon

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <AppTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Assets"
        component={Assets}
        options={{
          title: 'Tài sản',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="bar-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Invest"
        component={HomeScreen}
        options={{
          title: 'Đầu tư',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          title: 'Thông báo',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={User}
        options={{
          title: 'Tài khoản',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitle: '',
          headerStyle: {backgroundColor: '#1F6CFF'},
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="Main" component={MainTabScreen} />
        <Stack.Screen name="Wallet" component={Wallet} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
