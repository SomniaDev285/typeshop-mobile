export const authNavigation = (navigation, isAuth, navigate) => {
  if (isAuth) {
    navigation.navigate(navigate);
  } else {
    navigation.navigate('Login');
  }
};
