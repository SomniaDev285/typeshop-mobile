import React from "react";
import { View, Text, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

const SkeletonProductCard = () => {
  return (
    <View className="bg-white shadow-xs p-1 flex-row  w-full space-y-2 m-2">
      <View className="w-28 h-24 mr-2 bg-gray-200 rounded-sm" />
      <View className="flex-1 ml-3 space-y-1">
        <View className="w-5/6 h-5 bg-gray-300 rounded-sm" />
        <View className="w-2/3 h-4 bg-gray-300 rounded-sm" />
        <View className="rounded-sm my-1 p-1 flex-row items-center">
          <Feather name="star" size={16} color="#ffd700" />
          <Feather name="star" size={16} color="#ffd700" />
          <Feather name="star" size={16} color="#ffd700" />
          <Feather name="star" size={16} color="#ffd700" />
          <Feather name="star" size={16} color="#ccc" />
          <Text className="ml-1 text-gray-400">(0)</Text>
        </View>
        <View className="relative left-24 py-1 rounded h-4 w-24 bg-red-600" />
      </View>
    </View>
  );
};

export default SkeletonProductCard;
