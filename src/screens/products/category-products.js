import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import DefaultLayout from '../../components/layouts/default-layout';
import SearchBox from '../../components/search-box';
import { categories } from '../../data/categories';
import { useNavigation } from '@react-navigation/native';

const CategoryProducts = () => {
  const [press, setPress] = useState(false);
  const navigation = useNavigation();

  return (
    <DefaultLayout>
      <View className='bg-gray-900 pt-2'>
        <SearchBox />
      </View>
      <View className='flex-row mt-2  '>
        <View className='bg-white p-3'>
          {categories.map((category, index) => (
            <TouchableOpacity
              onPress={() => setPress(!press)}
              key={category.name}
              className={`${press && 'border-l-2 border-orange-500 pb-1'} `}
            >
              <Text className='py-3  ml-2 '>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className='flex-1 mx-2'>
          <TouchableOpacity
            className='bg-white p-2'
            onPress={() => navigation.navigate('ProductsScreen')}
          >
            <Text>ALL THE PRODUCTS</Text>
          </TouchableOpacity>
          <View className='bg-white'>
            <Text>Brands</Text>
            <ScrollView>
              <View className='flex-1'>
                <TouchableOpacity className='border border-gray-200 w-1/3 '>
                  <Image
                    className='w-20 h-20'
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYt8ovy242JGHJYNyZiQUKCDoztXtPc1AKREBQEX9XN_e5aRUD9PPRhmpSY7Kgij9mIo&usqp=CAU',
                    }}
                  />
                  <Text className='text-center'>Msi</Text>
                </TouchableOpacity>
                <TouchableOpacity className='border border-gray-200 w-1/3 mx-2 '>
                  <Image
                    className='w-20 h-20'
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYt8ovy242JGHJYNyZiQUKCDoztXtPc1AKREBQEX9XN_e5aRUD9PPRhmpSY7Kgij9mIo&usqp=CAU',
                    }}
                  />
                  <Text className='text-center'>Msi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className='border border-gray-200 w-1/3 '
                  onPress={() => setSelectBrand('Msi')}
                >
                  <Image
                    className='w-20 h-20'
                    source={{
                      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxYt8ovy242JGHJYNyZiQUKCDoztXtPc1AKREBQEX9XN_e5aRUD9PPRhmpSY7Kgij9mIo&usqp=CAU',
                    }}
                  />
                  <Text className='text-center'>Msi</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </DefaultLayout>
  );
};

export default CategoryProducts;
