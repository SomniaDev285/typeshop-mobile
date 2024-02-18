import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setBrand, setCategory } from '../../store/products/filter-products';

const CategoryCard = ({ category }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className='mr-2 '
      onPress={() => {
        dispatch(setCategory(category?.name));
        dispatch(setBrand(''));
        navigation.navigate('ProductsScreen');
      }}
    >
      <Image
        className='w-16 h-16 rounded-lg'
        source={{ uri: category?.imgUrl }}
      />

      <Text className='self-center text-xs'>{category?.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
