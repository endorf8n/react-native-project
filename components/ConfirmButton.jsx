import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ConfirmButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 16,
    padding: 16,
    height: 51,
    backgroundColor: "#ff6c00",
    borderRadius: 100,
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#ffffff",
  },
});
