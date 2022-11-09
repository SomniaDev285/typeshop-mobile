import { View, Text, Image, TextInput, Button } from 'react-native';
import React from 'react';
import DefaultLayout from '../layouts/default-layout';

const FormContainer = ({ children, title, img = true }) => {
  return (
    <DefaultLayout>
      <View className='flex-1'>
        {img && (
          <Image
            className='w-full h-40'
            source={{ uri: 'https://blog.hubspot.com/hubfs/ecommerce-1.png' }}
          />
        )}
        <View className='bg-white shadow-md mt-5 mx-5 rounded-md'>
          <Text className='text-center text-[#e03a3c] font-extrabold  text-2xl my-2'>
            {title}
          </Text>
          {children}
        </View>
      </View>
    </DefaultLayout>
  );
};

export default FormContainer;
