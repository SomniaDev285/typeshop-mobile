import { ScrollView } from 'react-native';
import React from 'react';
import CategoryCard from './category-card';
import { categories } from '../../data/categories';

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
    >
      {categories.map((category) => (
        <CategoryCard key={category.name} category={category} />
      ))}
    </ScrollView>
  );
};

export default Categories;
