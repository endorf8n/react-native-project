import Svg, { Path } from "react-native-svg";
import { View, StyleSheet } from "react-native";

export const PlusIcon = () => {
  return (
    <View style={styles.icon}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="25"
        height="25"
        viewBox="0 0 50 50"
        fill="#FF6C00"
        stroke="#FF6C00"
      >
        <Path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    bottom: 14,
    right: -12,
    backgroundColor: "$ffffff",
    borderRadius: 50,
  },
});
