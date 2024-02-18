import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className='w-40 my-2 mr-3 bg-white rounded-lg shadow h-44'
      onPress={() =>
        navigation.navigate('ProductDetails', { id: product?._id })
      }
    >
      <Image
        className='self-center h-24 mt-4 rounded-sm w-28'
        source={{ uri: product?.image }}
        resizeMode='stretch'
      />
      <View className='px-3 pb-4'>
        <Text className='pt-2 text-xs whitespace-nowrap'>
          {product?.name.substring(0, 20)}..
        </Text>
        <View className='flex-row items-center justify-between mt-2 space-x-1'>
          <Text className='text-xs '>{product?.category}</Text>
          <Text className='text-xs text-green-500'>${product?.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
