import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductsScreen from '../../screens/products/products-screen';

const Stack = createNativeStackNavigator();

const ProductsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={'ProductsScreen'}>
      <Stack.Screen
        options={{ headerShown: false }}
        name='ProductsScreen'
        component={ProductsScreen}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigation;
