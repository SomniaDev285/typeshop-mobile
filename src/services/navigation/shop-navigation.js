import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import CartBasket from '../../screens/cart/cart-basket';
import Checkout from '../../screens/cart/payment';
import ShippingAddress from '../../screens/cart/shipping-address';

const Stack = createNativeStackNavigator();

const ShopNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='CartBasket'>
      <Stack.Screen
        name='CartBasket'
        options={{
          headerShown: false,
        }}
        component={CartBasket}
      />

      <Stack.Screen
        name='Checkout'
        options={{
          headerShown: false,
        }}
        component={Checkout}
      />
      <Stack.Screen
        name='ShippingAddress'
        options={{
          headerShown: false,
        }}
        component={ShippingAddress}
      />
    </Stack.Navigator>
  );
};

export default ShopNavigation;
