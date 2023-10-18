import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Redirection = ({
  firstPart = "",
  secondPart = "",
  navigateTo = "Registration",
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{firstPart}</Text>
      <Text
        style={{ ...styles.text, textDecorationLine: "underline" }}
        onPress={() => navigation.navigate(navigateTo)}
      >
        {secondPart}
      </Text>
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
