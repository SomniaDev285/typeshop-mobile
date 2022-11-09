import { View, ActivityIndicator } from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <View className=' justify-center items-center'>
      <ActivityIndicator size={'large'} color='#e03a3c' />
    </View>
  );
};

export default Loader;
