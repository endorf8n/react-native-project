import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import { Input } from "./Input";

export const Password = ({ placeholder = "" }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.passwordContainer}>
      <Input placeholder={placeholder} secured={!isPasswordVisible} />
      <Pressable
        style={styles.show}
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <Text style={styles.showText}>
          {isPasswordVisible ? "Сховати" : "Показати"}
        </Text>
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
