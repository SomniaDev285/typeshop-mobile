import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Login from '../../screens/auth/login';
import Profile from '../../screens/auth/profile/profile';
import Register from '../../screens/auth/register';
import UserOrderList from '../../screens/orders/userorder-list';

const Stack = createNativeStackNavigator();

const UserNavigation = () => {
  const { isAuth } = useSelector((state) => state.login);
  return (
    <Stack.Navigator initialRouteName={isAuth ? 'Account' : 'Login'}>
      {isAuth ? (
        <Stack.Screen
          name='Profile'
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <Stack.Screen
          name='Login'
          component={Login}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name='UserOrders'
        options={{ headerShown: false }}
        component={UserOrderList}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default UserNavigation;
