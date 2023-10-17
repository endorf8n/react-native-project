import { StyleSheet, Text, View } from "react-native";
import { Input } from "../../components/Input";
import { Password } from "../../components/Password";
import { ConfirmButton } from "../../components/ConfirmButton";
import { Redirection } from "../../components/Redirection";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Увійти</Text>
      <View style={styles.inputContainer}>
        <Input placeholder="Адреса електронної пошти" />
        <Password placeholder="Пароль" />
      </View>
      <ConfirmButton title="Увійти" />
      <Redirection firstPart="Немає акаунту?" secondPart="Зареєструватися" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "60%",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  title: {
    marginBottom: 33,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.3,
    textAlign: "center",
    color: "#212121",
  },
  inputContainer: {
    marginBottom: 43,
    rowGap: 16,
  },
});

export default LoginScreen;
