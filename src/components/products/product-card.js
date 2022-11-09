import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className='bg-white mr-3 shadow my-2 rounded-lg w-40 h-44'
      onPress={() => navigation.navigate('ProductDetails', { id: product._id })}
    >
      <Image
        className=' h-24 w-28 rounded-sm mt-4 self-center '
        source={{ uri: product.image }}
        resizeMode='stretch'
      />
      <View className='px-3 pb-4'>
        <Text className=' pt-2 text-xs  whitespace-nowrap'>
          {product.name.substring(0, 20)}..
        </Text>
        <View className='flex-row justify-between items-center  space-x-1 mt-2'>
          <Text className=' text-xs'>{product?.category}</Text>
          <Text className='text-green-500 text-xs'>${product?.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
