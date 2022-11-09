import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const DefaultLayout = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: width / 8,
  },
});

export default DefaultLayout;
