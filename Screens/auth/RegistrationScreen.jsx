import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Input } from "../../components/Input.jsx";
import { Password } from "../../components/Password.jsx";
import { ConfirmButton } from "../../components/ConfirmButton.jsx";
import { Redirection } from "../../components/Redirection.jsx";
import { Background } from "../../components/Background.jsx";
import useKeyboardOpen from "../../hooks/useKeyboardOpen.js";
import { handleCloseKeyboard } from "../../services/handleCloseKeyboard.js";
import { registerThunk } from "../../redux/auth/authOperations.js";
import { storage } from "../../firebase/config.js";

const RegistrationScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const [isKeyboardOpen, setIsKeyboardOpen] = useKeyboardOpen();

  useEffect(() => {
    async () => {
      const mediaPermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();
      if (mediaPermission.status !== "granted") {
        console.log("No access to media library");
      }
    };
  }, []);

  const handleAvatarLoad = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const uploadImageToServer = async (imageUri) => {
    const uniqueAvatarId = nanoid();

    if (imageUri) {
      try {
        const response = await fetch(imageUri);
        const file = await response.blob();
        const imageRef = await ref(storage, `avatars/${uniqueAvatarId}`);

        await uploadBytes(imageRef, file);

        const downloadURL = await getDownloadURL(imageRef);
        return downloadURL;
      } catch (error) {
        console.warn("uploadImageToServer: ", error);
      }
    }
  };

  const handleSubmit = async () => {
    const photo = avatar
      ? await uploadImageToServer(avatar)
      : "https://shorturl.at/agwJW";

    const data = { name, email, password, photo };
    dispatch(registerThunk(data))
      .unwrap()
      .then(() => {
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Home");
      });
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: avatar }} />
            <TouchableOpacity
              style={styles.addBtn}
              activeOpacity={0.5}
              onPress={handleAvatarLoad}
            >
              <SimpleLineIcons
                name="plus"
                size={24}
                color="#ff6c00"
                style={styles.icon}
              />
            </TouchableOpacity>
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
              <Input placeholder="Логін" value={name} onChangeText={setName} />
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
    justifyContent: "center",
    alignItems: "center",
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

  image: {
    width: 120,
    height: 120,
  },

  addBtn: {
    position: "absolute",
    bottom: 14,
    right: -13,
  },

  icon: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },

  inputContainer: {
    rowGap: 16,
  },
});

export default RegistrationScreen;
