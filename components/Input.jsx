import { useState } from "react";
import { TextInput, StyleSheet } from "react-native";

export const Input = ({ placeholder = "", onFocus, secured = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={{
        ...styles.textInput,
        backgroundColor: isFocused ? "#ffffff" : "#f6f6f6",
        borderColor: isFocused ? "#ff6c00" : "#e8e8e8",
      }}
      placeholder={placeholder}
      placeholderTextColor="#bdbdbd"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      secureTextEntry={secured}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
});
