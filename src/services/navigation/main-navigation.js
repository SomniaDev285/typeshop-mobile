import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Login from '../../screens/auth/login';
import Home from '../../screens/home';
import OrderDetails from '../../screens/orders/order-details';
import ProductDetails from '../../screens/products/product-details';
import ShopNavigation from './shop-navigation';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const { isAuth } = useSelector((state) => state.login);
  return (
    <Stack.Navigator initialRouteName={'Home'}>
      <Stack.Screen
        options={{ headerShown: false }}
        name='Home'
        component={Home}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='ProductDetails'
        component={ProductDetails}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
        name='CartBasket'
        component={ShopNavigation}
      />

      <Stack.Screen
        name='OrderDetails'
        options={{
          headerShown: false,
          presentation: 'fullScreenModal',
        }}
        component={isAuth ? OrderDetails : Login}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
