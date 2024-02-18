import { TouchableOpacity, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { brands } from '../../data/categories';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setBrand, setCategory } from '../../store/products/filter-products';

const BrandCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {brands.map((brand) => (
        <TouchableOpacity
          className='mr-2 '
          onPress={() => {
            dispatch(setBrand(brand?.name));
            dispatch(setCategory(''));
            navigation.navigate('ProductsScreen');
          }}
        >
          <Image
            className='w-16 h-16 rounded-lg'
            source={{ uri: brand?.imgUrl }}
          />

          <Text className='self-center text-xs'>{brand?.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default BrandCard;
