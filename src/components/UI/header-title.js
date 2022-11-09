import { View, Text } from 'react-native';
import React from 'react';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const HeaderTitle = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View className='bg-black flex-row items-center justify-between px-2 text-white space-x-2  h-16'>
      <View className='flex-row  items-center'>
        <ArrowLeftIcon color={'white'} onPress={navigation.goBack} />
        <Text className='text-white text-xl ml-5'>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderTitle;
