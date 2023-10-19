import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PlusIcon } from "../../components/icons/PlusIcon.jsx";
import { Input } from "../../components/Input.jsx";
import { Password } from "../../components/Password.jsx";
import { ConfirmButton } from "../../components/ConfirmButton.jsx";
import { Redirection } from "../../components/Redirection.jsx";
import { Background } from "../../components/Background.jsx";
import useKeyboardOpen from "../../hooks/useKeyboardOpen.js";
import { handleCloseKeyboard } from "../../services/handleCloseKeyboard.js";

const RegistrationScreen = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const [isKeyboardOpen, setIsKeyboardOpen] = useKeyboardOpen();

  const handleSubmit = () => {
    const data = { login, email, password };
    console.log(data);

    setLogin("");
    setEmail("");
    setPassword("");
    navigation.navigate("Home");
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <PlusIcon />
          </View>
          <Text style={styles.title}>Реєстрація</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.inputContainer,
                marginBottom: isKeyboardOpen ? 120 : 43,
              }}
            >
              <Input
                placeholder="Логін"
                value={login}
                onChangeText={setLogin}
              />
              <Input
                placeholder="Адреса електронної пошти"
                value={email}
                onChangeText={setEmail}
              />
              <Password
                placeholder="Пароль"
                value={password}
                onChangeText={setPassword}
              />
            </View>
          </KeyboardAvoidingView>
          <ConfirmButton title="Зареєструватися" onPress={handleSubmit} />
          <Redirection
            firstPart="Вже є акаунт?"
            secondPart="Увійти"
            navigateTo="Login"
          />
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
    rowGap: 16,
  },
});

export default RegistrationScreen;
