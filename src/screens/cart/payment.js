import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TrashIcon } from 'react-native-heroicons/solid';
import { publicAxios } from '../../lib/fetech';
import { setError } from '../../utils/error';
import { getItemsPrice } from '../../utils/formater';
import Loader from '../../components/UI/loader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import { deleteFromCart } from '../../store/cart/cart';
import DefaultLayout from '../../components/layouts/default-layout';
import HeaderTitle from '../../components/UI/header-title';

const Checkout = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { userInfo, isAuth } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const itemsPrice = getItemsPrice(cartItems);
  const taxPrice = Number(itemsPrice * 0.05).toFixed(2);
  const deliveryFee = Number(itemsPrice >= 1000 ? 0 : 30);
  const totalPrice = Number(
    itemsPrice + Number(taxPrice) + Number(deliveryFee)
  );

  const createOrder = () => {
    const newOrder = {
      totalPrice,
      cartItems,
      shippingAddress,
    };
    setLoading(true);
    publicAxios
      .post('/orders', newOrder, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        const order = res.data;
        setLoading(false);
        navigation.navigate('OrderDetails', order);

        toast.show(
          'Your order has been created successfully please continue the payment process',
          {
            duration: 5000,
            type: 'success',
          }
        );
      })
      .catch((e) => {
        setLoading(false);
        toast.show(setError(e), {
          type: 'danger',
        });
      });
  };

  useFocusEffect(() => {
    if (!isAuth) {
      navigation.navigate('Login');
    }
  });

  return (
    <DefaultLayout>
      <HeaderTitle title={'Checkout'} />
      <ScrollView
        className='divide-y divide-gray-200 '
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <View>
          <Text className='bg-gray-200 px-3 py-3 font-bold text-gray-500'>
            Basket
          </Text>
          {cartItems.map((item) => (
            <View
              key={item._id}
              className='flex-row items-center space-x-3 bg-white shadow px-2 mt-2'
            >
              <Image
                source={{ uri: item.image }}
                className='h-12 w-12 rounded-lg'
              />
              <View className='flex-row items-center space-x-3'>
                <Text className='w-36'>{item?.name}</Text>
                <Text className=''>x {item.qty}</Text>
                <Text className='text-gray-600 font-bold pl-2'>
                  ${item.price}
                </Text>
              </View>
              <TouchableOpacity
                className='pl-2'
                onPress={() => dispatch(deleteFromCart(item._id))}
              >
                <TrashIcon color={'red'} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View className='bg-white my-2 space-y-2 p-2'>
          <Text className='bg-gray-200 px-3 py-3 font-bold text-gray-500'>
            Address
          </Text>
          <View className='flex-row items-center justify-between px-3'>
            <Text>Address</Text>
            <Text>{shippingAddress?.address}</Text>
          </View>
          <View className='flex-row items-center justify-between px-3'>
            <Text>City</Text>
            <Text>{shippingAddress?.city}</Text>
          </View>
          <View className='flex-row items-center justify-between px-3'>
            <Text>Postal Code</Text>
            <Text>{shippingAddress?.postalCode}</Text>
          </View>
          <View className='flex-row items-center justify-between px-3'>
            <Text>Phone</Text>
            <Text>{shippingAddress?.phone}</Text>
          </View>
          <View className='flex-row items-center justify-between px-3'>
            <Text>Country</Text>
            <Text>{shippingAddress?.country}</Text>
          </View>
        </View>
        <Text className='bg-gray-200 px-3 py-3 font-bold text-gray-500'>
          Price
        </Text>
        {loading ? (
          <Loader />
        ) : (
          <View className='p-5 bg-white  space-y-4 '>
            <View className='flex-row justify-between'>
              <Text className='text-gray-400'>Delivery Fee</Text>
              <Text className='text-gray-400'>${deliveryFee}</Text>
            </View>
            <View className='flex-row justify-between'>
              <Text className='text-gray-400'>Tax</Text>
              <Text className='text-gray-400'>${taxPrice}</Text>
            </View>
            <View className='flex-row justify-between '>
              <Text className='text-xl'>Subtotal</Text>
              <Text className='text-xl'>${totalPrice}</Text>
            </View>
            <TouchableOpacity
              onPress={createOrder}
              disabled={!cartItems.length || !shippingAddress}
              className='rounded-lg bg-[#e03a3c] p-2'
            >
              <Text className='text-center text-white text-lg font-bold'>
                Placeorder
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </DefaultLayout>
  );
};

export default Checkout;
