import { StyleSheet, Text, View } from "react-native";

export const Redirection = ({ firstPart = "", secondPart = "" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{firstPart}</Text>
      <Text style={styles.text}>{secondPart}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 3,
    justifyContent: "center",
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#1b4371",
    textAlign: "center",
  },
});
