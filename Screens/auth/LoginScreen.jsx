import { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input } from "../../components/Input";
import { Password } from "../../components/Password";
import { ConfirmButton } from "../../components/ConfirmButton";
import { Redirection } from "../../components/Redirection";
import { Background } from "../../components/Background";
import useKeyboardOpen from "../../hooks/useKeyboardOpen";
import { handleCloseKeyboard } from "../../services/handleCloseKeyboard";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const [isKeyboardOpen, setIsKeyboardOpen] = useKeyboardOpen();

  const handleSubmit = () => {
    const data = { email, password };
    console.log(data);
    setEmail("");
    setPassword("");
    navigation.navigate("Home");
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
        <View style={styles.container}>
          <Text style={styles.title}>Увійти</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.inputContainer,
                marginBottom: isKeyboardOpen ? 100 : 43,
              }}
            >
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
          <ConfirmButton title="Увійти" onPress={handleSubmit} />
          <Redirection
            firstPart="Немає акаунту?"
            secondPart="Зареєструватися"
            navigateTo="Registration"
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
    paddingTop: 32,
    paddingBottom: 110,
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
    rowGap: 16,
  },
});

export default LoginScreen;
