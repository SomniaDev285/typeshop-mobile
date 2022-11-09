import React from 'react';
import { Dimensions, StyleSheet, View, Image } from 'react-native';
import Swiper from 'react-native-swiper/src';

let { width } = Dimensions.get('window');
export const images = [
  'https://www.e-marketing.fr/Assets/Img/BREVE/2021/10/365617/agence-heaven-lance-son-offre-Gaming-F.jpg',
  'https://storage-asset.msi.com/event/2019/il-gearpack-bundle/images/kv-m.jpg',
  'https://cdn.futura-sciences.com/buildsv6/images/wide1920/4/4/7/44703dbc84_50183415_black-friday-smartphone.jpg',
];
const Banner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <Swiper
          className='h-64 items-center mt-5 rounded'
          showButtons={false}
          autoplay={true}
          autoplayTimeout={5}
        >
          {images.map((item) => (
            <Image
              style={styles.imageBanner}
              key={item}
              source={{ uri: item }}
              resizeMode='contain'
            />
          ))}
        </Swiper>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    width: width,
    alignItems: 'center',
    height: width / 3 + 15,
    padding: 10,
    backgroundColor: 'white',
  },
  imageBanner: {
    height: width / 3 + 5,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
export default Banner;
