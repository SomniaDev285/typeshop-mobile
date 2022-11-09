import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { XCircleIcon } from 'react-native-heroicons/solid';

const Message = ({ children, onPress, color = 'bg-red-500' }) => {
  return (
    <View
      className={`${color} flex-row justify-between items-center rounded-md my-2 px-3 py-1 mx-4`}
    >
      <Text className=' text-white '>{children}</Text>
      <TouchableOpacity onPress={onPress}>
        <XCircleIcon color={'white'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default Message;
