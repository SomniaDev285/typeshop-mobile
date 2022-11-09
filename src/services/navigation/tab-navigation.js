import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserNavigation from './user-navigation';
import HomeNavigation from './main-navigation';
import { useSelector } from 'react-redux';
import ProductsNavigation from './products-navigation';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const { isAuth } = useSelector((state) => state.login);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'ProductsScreen') {
            iconName = 'list';
          } else if (route.name === 'Profile' || 'Login') {
            iconName = 'user';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        tabBarActiveTintColor: '#e03a3c',
      })}
    >
      <Tab.Screen name='Home' component={HomeNavigation} />
      <Tab.Screen
        options={{
          title: 'Filter',
          tabBarActiveTintColor: 'red',
        }}
        name='ProductsScreen'
        component={ProductsNavigation}
      />
      <Tab.Screen
        name='Login'
        component={UserNavigation}
        options={{
          tabBarLabel: isAuth ? 'Profile' : 'Login',
          tabBarIconStyle: { backgroundColor: '#e03a3c', color: '#e03a3c' },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
