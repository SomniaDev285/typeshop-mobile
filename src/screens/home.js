import { View, ScrollView, Text, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import DefaultLayout from '../components/layouts/default-layout';
import Banner from '../components/banner';
import Categories from '../components/categories/categories';
import Products from '../components/products/products';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../store/products/product-list';
import Loader from '../components/UI/loader';
import ProductCard from '../components/products/product-card';
import BrandCard from '../components/brands/brand-card';
import { ShoppingCartIcon } from 'react-native-heroicons/solid';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { success } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch, success]);

  return (
    <DefaultLayout>
      <View className='bg-black pt-2 flex-row items-center justify-center '>
        <Text className='text-white text-center py-2 text-xl font-bold justify-center '>
          <Text className='text-[#e03a3c] '>Type</Text>
          <Text className=''>Shop</Text>
        </Text>
        <ShoppingCartIcon color={'white'} />
      </View>

      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          className='bg-gray-100 '
          contentContainerStyle={{
            paddingBottom: 100,
          }}
        >
          <Banner />

          <Categories />
          <View className='flex-1 items-center bg-[#e03a3c] py-2'>
            <Text className='text-center text-white'>Best products ever!</Text>
          </View>
          <Products products={products.slice(7, 12)} />
          <BrandCard />
          <View className='flex-1 items-center bg-[#e03a3c] py-2'>
            <Text className='text-center text-white'>Best brands</Text>
          </View>
          <Products products={products.slice(2, 7)} />

          <View className='flex-1 items-center bg-[#e03a3c] mt-2 py-2'>
            <Text className='text-center text-white'>Leasts Products</Text>
          </View>

          <FlatList
            numColumns={2}
            vertical
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              padding: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            keyExtractor={(item) => item._id}
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
          />
        </ScrollView>
      )}
    </DefaultLayout>
  );
};

export default Home;
