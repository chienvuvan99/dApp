import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
const HomeScreen = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <View
          style={tw`w-31 h-31 bg-[#17D85C] justify-center items-center rounded-100`}
        >
          <Ionicons name="checkmark-sharp" size={70} color={'white'} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
