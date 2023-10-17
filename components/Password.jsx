import { View, Text, Pressable, StyleSheet } from "react-native";

import { Input } from "./Input";

export const Password = ({ placeholder = "", onFocus }) => {
  return (
    <View style={styles.passwordContainer}>
      <Input placeholder={placeholder} />
      <Pressable style={styles.show}>
        <Text style={styles.showText}>Показати</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    position: "relative",
  },
  show: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  showText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1B4371",
  },
});
