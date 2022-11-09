import { useState } from 'react';

const useCategory = () => {
  const [selectCategory, setSelectCategory] = useState('');
  return { selectCategory, setSelectCategory };
};

export default useCategory;
