import { StyleSheet, Text, TextInput, View } from "react-native";

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>REGISTER</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    padding: 20,
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
  },
});

export default RegistrationScreen;
