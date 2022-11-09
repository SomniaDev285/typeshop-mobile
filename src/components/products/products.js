import { View, Text, ScrollView } from 'react-native';
import ProductCard from './product-card';

const Products = ({ products }) => {
  return (
    <View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className='pt-4'
      >
        {products?.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Products;
