import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/layouts/default-layout";
import SearchBox from "../../components/search-box";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterProducts,
  setBrand,
  setCategory,
} from "../../store/products/filter-products";
import SingleProductCard from "../../components/products/single-productcard";
import Loader from "../../components/UI/loader";
import useDebounce from "../../hooks/useDebounce";
import { useCallback } from "react";
import SkeletonProductCard from "../../components/UI/product-skeleton";

const ProductsScreen = () => {
  const dispatch = useDispatch();
  const { filterProducts } = useSelector((state) => state);
  const { products, loading, categories, brands, brand, category, pages } =
    filterProducts;

  const [search, setSearch] = useState("");
  const { debouncedValue } = useDebounce(search, 300);
  const [curPage, setCurPage] = useState(1);

  const handleCategoryChange = useCallback(
    (itemValue, itemIndex) => dispatch(setCategory(itemValue)),
    [dispatch]
  );

  const handleBrandChange = useCallback(
    (itemValue, itemIndex) => dispatch(setBrand(itemValue)),
    [dispatch]
  );

  useEffect(() => {
    dispatch(
      getFilterProducts({
        n: curPage,
        b: brand,
        c: category,
        q: debouncedValue,
      })
    );
  }, [dispatch, search, category, curPage, brand]);
  return (
    <DefaultLayout>
      <View className="bg-gray-900 pt-2">
        <SearchBox setSearch={setSearch} />
      </View>
      <View className="bg-gray-900 flex-row border-t border-gray-100">
        <View className="w-[50%]">
          <Picker
            style={{
              color: "#fff",
            }}
            dropdownIconColor="#fff"
            selectedValue={category}
            onValueChange={handleCategoryChange}
          >
            <Picker.Item label="All Categories" value={""} />
            {categories.map((c) => (
              <Picker.Item label={c} value={c} key={c} />
            ))}
          </Picker>
        </View>
        <View className="w-[50%] border-l border-gray-100 ">
          <Picker
            dropdownIconColor="#fff"
            style={{ color: "#fff" }}
            itemStyle={{ color: "#fff" }}
            selectedValue={brand}
            onValueChange={handleBrandChange}
          >
            <Picker.Item label="All Brands" value={""} />
            {brands.map((c) => (
              <Picker.Item label={c} value={c} key={c} />
            ))}
          </Picker>
        </View>
      </View>
      {/* Products List */}
      {loading ? (
        <>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {[...Array(9).keys()].map((index) => (
              <SkeletonProductCard key={index} />
            ))}
          </View>
        </>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>
          {/* Card */}
          {products.map((product) => (
            <SingleProductCard key={product._id} product={product} />
          ))}
          {pages > 1 && (
            <View className="flex-row px-2">
              {[...Array(pages).keys()].map((x) => (
                <TouchableOpacity key={x} onPress={() => setCurPage(x + 1)}>
                  <Text
                    key={`page-${x}`}
                    className={`mr-2 p-1 w-7 h-7 text-center text-white rounded-full ${
                      curPage === x + 1 ? "bg-red-600 " : "bg-gray-300"
                    }`}
                  >
                    {x + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </DefaultLayout>
  );
};

export default ProductsScreen;
