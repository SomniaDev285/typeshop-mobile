import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { authNavigation } from '../../../utils/navigation';
import DefaultLayout from '../../../components/layouts/default-layout';
import { reset } from '../../../store/cart/cart';
import { userLogout } from '../../../store/users/login';
import { profileItems } from '../../../data/profile-items';
import HeaderTitle from '../../../components/UI/header-title';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, isAuth } = useSelector((state) => state.login);
  const navigation = useNavigation();

  const onLogout = () => {
    dispatch(userLogout());
    dispatch(reset());
  };

  return (
    <DefaultLayout>
      <HeaderTitle title={'Profile'} />
      <View className='bg-black py-3 space-y-1 px-2 '>
        <Text className='text-[#e03a3c]'>Welcome {userInfo.name}!</Text>
        <Text className='text-white text-xs'>{userInfo.email}</Text>
      </View>

      <Text className='px-3 py-3 font-bold text-gray-500'>
        MY TYPE SHOP ACCOUNT
      </Text>
      <View className='bg-white p-3 mx-2 space-y-3 '>
        {profileItems.map((item) => (
          <TouchableOpacity
            onPress={() => authNavigation(navigation, isAuth, item.link)}
            key={item.name}
            className='flex-row justify-between py-2'
          >
            <View className='flex-row items-center'>
              <Icon className='opacity-70' name={item.icon} size={18} />
              <Text className='pl-2 text-xs'> {item.name}</Text>
            </View>
            <ChevronRightIcon color={'black'} size={15} />
          </TouchableOpacity>
        ))}
      </View>
      <Text className=' px-3 py-3 font-bold text-gray-500'>MY SETTINGS</Text>
      <View className='bg-white p-3 mx-2 space-y-3 '>
        <TouchableOpacity
          className='flex-row justify-between py-2'
          onPress={() => authNavigation(navigation, isAuth, 'UserAddress')}
        >
          <View className='flex-row items-center'>
            <Text className='pl-2 text-xs'> My Address</Text>
          </View>
          <ChevronRightIcon color={'black'} size={15} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between py-2'>
          <View className='flex-row items-center'>
            <Text className='pl-2 text-xs'> Change Password</Text>
          </View>
          <ChevronRightIcon color={'black'} size={15} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between py-2'>
          <View className='flex-row items-center'>
            <Text className='pl-2 text-xs'>Close</Text>
          </View>
          <ChevronRightIcon color={'black'} size={15} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity className=' px-3 py-3 font-bold ' onPress={onLogout}>
        <Text className='text-center text-[#e03a3c]  font-bold'>LOGOUT</Text>
      </TouchableOpacity>
    </DefaultLayout>
  );
};

export default Profile;
