import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FormContainer from '../../components/UI/form-container';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, userLogin } from '../../store/users/login';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/UI/loader';
import Message from '../../components/UI/message';

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.login);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <FormContainer title={'Login Your Account'}>
        {error && (
          <Message onPress={() => dispatch(resetError())}>{error}</Message>
        )}
        {loading && <Loader />}
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
              />
            )}
            name='password'
          />
          {errors.password && (
            <Text className='text-red-600'>password is required.</Text>
          )}
          <View className='flex-row items-center'>
            <Text>Don't have an Account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              className='ml-1'
            >
              <Text className='text-red-600'>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className='mx-4 mt-5 py-2'>
          <Button
            color={'#e03a3c'}
            title='Login'
            className='w-full '
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </FormContainer>
    </ScrollView>
  );
};

export default Login;
