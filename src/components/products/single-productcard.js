import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import React from 'react';
import Rating from '../UI/rating';
import { useNavigation } from '@react-navigation/native';
import { addToCart } from '../../store/cart/cart';
import { useDispatch } from 'react-redux';

const SingleProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const getRating = (reviews) => {
    const rating = reviews.reduce((acc, item) => acc + item.rating, 0);
    return Math.floor(rating / reviews.length);
  };

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className='bg-white shadow-xs p-1 flex-row  space-y-2 m-2 '
      onPress={() => navigation.navigate('ProductDetails', product)}
    >
      <Image
        source={{
          uri: product.image,
        }}
        className='h-24 w-28 mr-2'
        resizeMode='stretch'
      />
      <View className='ml-3 space-y-1'>
        <Text>{product.name.substring(0, 33)}</Text>

        <Text className=' font-bold'>${product.price}</Text>
        <Text className='rounded-sm my-1 p-1 flex-row'>
          <Rating value={getRating(product?.reviews) || 4} /> (
          {product.reviews.length})
        </Text>
        <View className='relative  left-24 py-1 rounded w-24'>
          <Button
            title='Buy Now'
            color={'red'}
            onPress={() => {
              dispatch(addToCart(product));
              navigation.navigate('CartBasket');
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleProductCard;
