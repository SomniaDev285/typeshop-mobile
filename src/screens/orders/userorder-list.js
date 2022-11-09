import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userOrders } from '../../store/orders/user-orders';
import Loader from '../../components/UI/loader';
import { useNavigation } from '@react-navigation/native';
import UserPaidOrders from '../../components/orders/userpaid-orders';
import UserNotPaidOrders from '../../components/orders/userpaid-orders';
import DefaultLayout from '../../components/layouts/default-layout';
import HeaderTitle from '../../components/UI/header-title';

const UserOrderList = () => {
  const { orders, loading, error } = useSelector((state) => state.userOrders);
  const dispatch = useDispatch();
  const [paidOrders, setPaidOrders] = useState(true);
  const [notPaidOrders, setNotPaidOrders] = useState(false);
  const navigation = useNavigation();

  const selectPaidOrders = orders.filter((order) => order.isPaid === true);
  const selectNotPaidOrders = orders.filter((order) => order.isPaid === false);

  useEffect(() => {
    dispatch(userOrders());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <HeaderTitle title={'My Orders'} />
      <View className='bg-gray-100'>
        <View className='flex-row justify-between items-center shadow bg-white p-3 mb-2 '>
          <TouchableOpacity
            className=' w-36 '
            onPress={() => {
              setNotPaidOrders(false);
              setPaidOrders(!paidOrders);
            }}
          >
            <Text
              className={
                paidOrders &&
                'text-orange-500  border-b-2 border-orange-500 pb-1'
              }
            >
              ORDERS SUCCESSED
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='w-36'
            onPress={() => {
              setPaidOrders(false);
              setNotPaidOrders(!notPaidOrders);
              
            }}
          >
            <Text
              className={
                notPaidOrders &&
                'text-orange-500  border-b-2 border-orange-500 pb-1 '
              }
            >
              ORDERS SUCCESSED
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 280 }}>
          {paidOrders && <UserPaidOrders orders={selectPaidOrders} />}
          {notPaidOrders && <UserNotPaidOrders orders={selectNotPaidOrders} />}
        </ScrollView>
      </View>
    </DefaultLayout>
  );
};

export default UserOrderList;
