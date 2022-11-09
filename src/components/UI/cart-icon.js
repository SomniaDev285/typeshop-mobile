import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { ShoppingCartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className='relative mx-2'
      onPress={() => navigation.navigate('CartBasket')}
    >
      <Text
        style={{ position: 'absolute', left: 15, top: -12, zIndex: 100 }}
        className='rounded-full bg-[#e03a3c] text-white px-2 py-1 text-xs'
      >
        {cartItems.length}
      </Text>
      <ShoppingCartIcon color={'white'} />
    </TouchableOpacity>
  );
};

export default CartIcon;
