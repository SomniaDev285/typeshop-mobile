import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color="#e03a3c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: height,
    width: width,
  },
});

export default Loader;
