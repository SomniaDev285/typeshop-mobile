import { View, TextInput } from 'react-native';
import React from 'react';
import { SearchIcon } from 'react-native-heroicons/solid';
import CartIcon from './UI/cart-icon';

const SearchBox = ({ setSearch }) => {
  return (
    <View className='flex-row items-center space-x-2 mx-4 py-2 '>
      <View className='flex-row flex-1 space-x-2  bg-gray-200 p-3 '>
        <SearchIcon color={'gray'} size={20} />

        <TextInput
          className='rounded h-5'
          onChangeText={(text) => setSearch(text)}
          placeholder='Search with Product Name'
          keyboardType='default'
        />
      </View>
      <CartIcon />
    </View>
  );
};

export default SearchBox;
