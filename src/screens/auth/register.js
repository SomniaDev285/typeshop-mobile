import {
  View,
  Text,
  Button,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FormContainer from '../../components/UI/form-container';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { publicAxios } from '../../lib/fetech';
import { setError } from '../../utils/error';
import Message from '../../components/UI/message';
import Loader from '../../components/UI/loader';

const Register = () => {
  const { isAuth } = useSelector((state) => state.login);
  const navigation = useNavigation();
  const [err, setErr] = useState(null);
  const [registred, setRegistred] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmP: '',
    },
  });

  const onSubmit = (data) => {
    if (!data.email.includes('@'))
      return setErr('email must be a valid email!');

    if (data.password !== data.confirmP)
      return setErr('password does not match');
    setLoading(true);
    publicAxios
      .post('/users/register', data)
      .then((res) => {
        Alert.alert('You have been registred please login');
        setLoading(false);
        setRegistred(true);
        navigation.navigate('Login');
      })
      .catch((e) => {
        setLoading(false);
        setErr(setError(e));
      });
  };
  useEffect(() => {
    if (isAuth) navigation.navigate('Profile');
    if (registred) navigation.navigate('Login');
  }, [isAuth, registred]);
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <FormContainer title={'Register For Free'}>
        {err && (
          <Message onPress={() => setErr(null)} color='bg-red-500'>
            {err}
          </Message>
        )}
        {loading && <Loader />}

        <View className='px-4'>
          <Text>Username</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 4,
              maxLength: 255,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className={`border-2 ${
                  errors.name ? 'border-red-600 ' : 'border-gray-300 '
                } my-2 bg-gray-100 pl-2 py-1 rounded`}
                placeholder='john doe'
                autoCapitalize='none'
                textContentType='username'
              />
            )}
            name='name'
          />
          {errors.name && (
            <Text className='text-red-600'>username is required.</Text>
          )}
        </View>
        <View className='px-4'>
          <Text>Email</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 8,
              maxLength: 255,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className={`border-2 ${
                  errors.email ? 'border-red-600 ' : 'border-gray-300 '
                } my-2 bg-gray-100 pl-2 py-1 rounded`}
                placeholder='john@email.com'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
              />
            )}
            name='email'
          />
          {errors.email && (
            <Text className='text-red-600'>email is required.</Text>
          )}
        </View>
        <View className='px-4'>
          <Text>Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 5,
              maxLength: 50,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`border-2 ${
                  errors.password ? 'border-red-600 ' : 'border-gray-300 '
                } my-2 bg-gray-100 pl-2 py-1 rounded`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='********'
                secureTextEntry={true}
                autoCapitalize='none'
                textContentType='password'
              />
            )}
            name='password'
          />
          {errors.password && (
            <Text className='text-red-600'>password is required.</Text>
          )}
        </View>
        <View className='px-4'>
          <Text>Confirm Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              minLength: 5,
              maxLength: 50,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={`border-2 ${
                  errors.confirmP ? 'border-red-600 ' : 'border-gray-300 '
                } my-2 bg-gray-100 pl-2 py-1 rounded`}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='********'
                secureTextEntry={true}
                autoCapitalize='none'
                textContentType='password'
              />
            )}
            name='confirmP'
          />
          {errors.confirmP && (
            <Text className='text-red-600'>confirm password is required.</Text>
          )}
        </View>
        <View className='flex-row items-center'>
          <Text>Already have an Account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className='ml-1'
          >
            <Text className='text-red-600'>Login</Text>
          </TouchableOpacity>
        </View>
        <View className='mx-4 mt-5 py-2'>
          <Button
            color={'#e03a3c'}
            title='Register'
            className='w-full '
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </FormContainer>
    </ScrollView>
  );
};

export default Register;
