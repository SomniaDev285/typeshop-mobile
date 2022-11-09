import { View, Text, Button, ScrollView } from 'react-native';
import FormGroup from '../../components/UI/form-group';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../store/cart/cart';
import { useNavigation } from '@react-navigation/native';
import { authNavigation } from '../../utils/navigation';
import DefaultLayout from '../../components/layouts/default-layout';
import HeaderTitle from '../../components/UI/header-title';

const ShippingAddress = () => {
  const dispatch = useDispatch();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { isAuth } = useSelector((state) => state.login);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: shippingAddress?.address,
      city: shippingAddress?.city,
      postalCode: shippingAddress?.postalCode,
      country: shippingAddress?.country,
      phone: shippingAddress?.phone,
    },
  });

  const onSubmit = (data) => {
    dispatch(saveShippingAddress(data));
    navigation.navigate('Checkout');
    authNavigation(navigation, isAuth, 'Checkout');
  };

  return (
    <DefaultLayout>
      <HeaderTitle title={'Shipping Address'} />
      <ScrollView contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}>
        <View className='flex-1'>
          <View className='bg-white shadow-md mx-5 rounded-md'>
            <Text className='text-center text-[#e03a3c] font-extrabold  text-2xl my-2'>
              Your Address
            </Text>
            <FormGroup
              errors={errors.address}
              control={control}
              label='Address'
              name='address'
              placeholder='Current Address'
              textContentType={'streetAddressLine1'}
              autoComplete='street-address'
            />
            <FormGroup
              errors={errors.city}
              control={control}
              label='City'
              name='city'
              placeholder='Current City'
              textContentType={'addressCity'}
              autoComplete='postal-code'
            />
            <FormGroup
              errors={errors.postalCode}
              control={control}
              label='Postal Code'
              name='postalCode'
              textContentType={'postalCode'}
              placeholder='Postal Code'
              autoComplete='postal-code'
            />
            <FormGroup
              errors={errors.phone}
              control={control}
              label='Phone'
              name='phone'
              keyboardType='numeric'
              placeholder='Your Phone Number'
              textContentType={'phone'}
              autoComplete='tel'
            />
            <FormGroup
              errors={errors.country}
              control={control}
              label='Country'
              placeholder='Current Country'
              name='country'
              textContentType={'countryName'}
            />
            <View className='mx-4 mt-3 py-2'>
              <Button
                color={'#e03a3c'}
                title='Go To Checkout'
                className='w-full '
                onPress={handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default ShippingAddress;
