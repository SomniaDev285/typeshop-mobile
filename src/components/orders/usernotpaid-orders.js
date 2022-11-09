import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { dateFormater } from '../../utils/formater';
import { useNavigation } from '@react-navigation/native';

const UserPaidOrders = ({ orders }) => {
  const picker = (o) => Math.floor(Math.random() * o.cartItems.length);
  const navigation = useNavigation();
  return (
    <>
      {orders.map((order) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetails', order)}
          key={order._id}
          className='bg-white shadow-xs p-3 flex-row  space-y-2 m-1'
        >
          <Image
            source={{
              uri: order.cartItems[picker(order)].image,
            }}
            className='h-20 w-20 mr-2'
            resizeMode='contain'
          />
          <View className='ml-3'>
            <Text className='text-xs'>
              {order.cartItems[picker(order)].name}
            </Text>

            <Text style={{ fontSize: 10 }} className='flex-1'>
              Order #{order._id}
            </Text>
            <Text
              style={{ fontSize: 10 }}
              className={` text-white w-12  text-center rounded-sm p-1 ${
                order.isPaid ? 'bg-green-500 ' : 'bg-red-500'
              } `}
            >
              {order.isPaid ? 'Paid' : 'Not Paid'}
            </Text>
            <Text style={{ fontSize: 10 }}>
              the {dateFormater(order?.createdAt)}
            </Text>
            {order.cartItems.length > 1 && (
              <Text className='self-end' style={{ fontSize: 10 }}>
                {order.cartItems.length} more items
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
};

export default UserPaidOrders;
