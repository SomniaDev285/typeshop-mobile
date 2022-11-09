import { View, Text } from 'react-native';
import React from 'react';
import DefaultLayout from '../../../components/layouts/default-layout';
import HeaderTitle from '../../../components/UI/header-title';

const UserAddress = () => {
  return (
    <DefaultLayout>
      <HeaderTitle title={'My Address'} />
      <Text>UserAddress</Text>
    </DefaultLayout>
  );
};

export default UserAddress;
