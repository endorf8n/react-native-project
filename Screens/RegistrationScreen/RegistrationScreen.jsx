import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { PlusIcon } from "../../components/icons/PlusIcon.jsx";
import { Input } from "../../components/Input.jsx";
import { Password } from "../../components/Password.jsx";
import { ConfirmButton } from "../../components/ConfirmButton.jsx";
import { Redirection } from "../../components/Redirection.jsx";

const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <PlusIcon />
      </View>
      <Text style={styles.title}>Реєстрація</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.inputContainer}>
          <Input placeholder="Логін" />
          <Input placeholder="Адреса електронної пошти" />
          <Password placeholder="Пароль" />
        </View>
      </KeyboardAvoidingView>
      <ConfirmButton title="Зареєструватися" />
      <Redirection firstPart="Вже є акаунт?" secondPart="Увійти" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "70%",
    paddingHorizontal: 16,
    paddingTop: 92,
    paddingBottom: 74,
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },

  imageContainer: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#f6f6f6",
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

export default RegistrationScreen;
