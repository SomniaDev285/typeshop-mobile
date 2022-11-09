import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import React from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  deleteFromCart,
  removeFromCart,
} from '../../store/cart/cart';
import { useNavigation } from '@react-navigation/native';
import { getItemsPrice } from '../../utils/formater';
import Message from '../../components/UI/message';
import DefaultLayout from '../../components/layouts/default-layout';
import HeaderTitle from '../../components/UI/header-title';

const CartBasket = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onPress = () => {
    if (cartItems.length === 0) return;
    navigation.navigate('ShippingAddress');
  };

  return (
    <DefaultLayout>
      <HeaderTitle title={'Basket'} />
      <View className='flex-1 bg-gray-100 '>
        <ScrollView className='divide-y divide-gray-200 '>
          <Text className='bg-gray-200 px-3 py-3 font-bold text-gray-500'>
            Cart Summary
          </Text>
          {cartItems.length === 0 ? (
            <Message>Your basket is empty </Message>
          ) : (
            <>
              {cartItems.map((item) => (
                <View
                  key={item._id}
                  className=' relative  bg-white mx-2 mb-2 h-32'
                >
                  <View className='flex-row p-3 space-y-2'>
                    <Image
                      source={{ uri: item.image }}
                      className=' h-16 w-20 rounded mr-4'
                      resizeMode='stretch'
                    />
                    <View>
                      <Text className='text-xs'>{item?.name}</Text>
                      <View className='flex-row items-center space-x-2'>
                        <Text className='text-lg font-bold '>
                          ${item.price}
                        </Text>
                        <Text className='text-gray-400 text-xs'>
                          {item.brand}
                        </Text>
                        <Text className='text-gray-400 text-xs'>
                          {item.category}
                        </Text>
                      </View>
                      {/* <Text
                    style={{}}
                    className='text-gray-600 text-xs font-bold text-center'
                  >
                    ${item.price}
                  </Text> */}
                    </View>
                  </View>
                  <View className='flex-row absolute bottom-0 px-2 items-center mb-2 space-x-2 '>
                    <TouchableOpacity
                      className='flex-1 flex-row items-center space-x-2'
                      onPress={() => dispatch(deleteFromCart(item._id))}
                    >
                      <>
                        <TrashIcon color={'#e03a3c'} size={18} />
                        <Text className='text-[#e03a3c]'>Delete</Text>
                      </>
                    </TouchableOpacity>
                    <View className='flex-row'>
                      <TouchableOpacity
                        disabled={item.qty === 1}
                        className={`${
                          item.qty > 1 ? 'bg-[#e03a3c]' : 'bg-gray-400'
                        } rounded`}
                        onPress={() => dispatch(removeFromCart(item))}
                      >
                        <MinusIcon color='white' />
                      </TouchableOpacity>
                      <Text className='mx-4'>{item.qty}</Text>
                      <TouchableOpacity
                        className='bg-[#e03a3c] rounded'
                        onPress={() => dispatch(addToCart(item))}
                      >
                        <PlusIcon color={'white'} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </>
          )}
        </ScrollView>
        <View className='flex-row p-3 bg-white mt-2 items-center '>
          <Text className='text-lg font-bold mr-2'>
            ${getItemsPrice(cartItems)}
          </Text>
          <View className='flex-1 rounded'>
            <Button title='Checkout' color={'#e03a3c'} onPress={onPress} />
          </View>
        </View>
      </View>
    </DefaultLayout>
  );
};

export default CartBasket;
