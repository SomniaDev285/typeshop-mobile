import { View, Text } from 'react-native';
import React from 'react';
import { StarIcon } from 'react-native-heroicons/solid';

const Rating = ({ value = 1, text, color = '#f8e825' }) => {
  return (
    <View className=' mb-2 flex-row'>
      {[...Array(value).keys()].map((x) => (
        <StarIcon color={color} size={15} />
      ))}
    </View>
  );
};

export default Rating;
