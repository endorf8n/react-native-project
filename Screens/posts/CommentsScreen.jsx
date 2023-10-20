import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import useKeyboardOpen from "../../hooks/useKeyboardOpen";
import { handleCloseKeyboard } from "../../services/handleCloseKeyboard";

export const CommentsScreen = () => {
  const [photoUri, setPhotoUri] = useState("");
  const [comment, setComment] = useState("");
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useKeyboardOpen();

  useEffect(() => {
    if (route.params) {
      setPhotoUri(route.params.photoUri);
    }
  }, [route.params]);

  useEffect(() => {
    if (isFocused) {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation?.getParent("home")?.setOptions({
        tabBarStyle: { position: "absolute", height: 70 },
      });
    }
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        {photoUri && <Image style={styles.images} source={{ uri: photoUri }} />}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            marginTop: "auto",
            marginBottom: isKeyboardOpen ? 30 : 0,
          }}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати"
              placeholderTextColor="#bdbdbd"
              value="comment"
              onChangeText={setComment}
            />
            <TouchableOpacity style={styles.sendBtn}>
              <AntDesign name="arrowup" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 16,
    backgroundColor: "#ffffff",
  },

  image: {
    height: 240,
    borderRadius: 8,
  },

  inputContainer: {
    height: 50,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#f6f6f6",
    borderRadius: 25,
  },

  input: {
    width: "85%",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#bdbdbd",
    paddingLeft: 8,
  },

  sendBtn: {
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff6c00",
    borderRadius: 50,
  },
});
