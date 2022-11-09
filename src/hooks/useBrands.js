import { useState } from 'react';

const useBrands = () => {
  const [selectBrand, setSelectBrand] = useState('');
  return { selectBrand, setSelectBrand };
};

export default useBrands;
