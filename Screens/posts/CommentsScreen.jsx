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
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import useKeyboardOpen from "../../hooks/useKeyboardOpen";
import { handleCloseKeyboard } from "../../services/handleCloseKeyboard";
import { db } from "../../firebase/config";
import { selectUser } from "../../redux/auth/authSelectors";
import { CommentItem } from "../../components/CommentItem";
import { useGetComments } from "../../hooks/useGetComments";

export const CommentsScreen = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [comment, setComment] = useState("");

  const user = useSelector(selectUser);
  const route = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [allComments] = useGetComments(route.params.id);
  const [isKeyboardOpen, setIsKeyboardOpen] = useKeyboardOpen();

  useEffect(() => {
    if (route.params) {
      setPhotoUrl(route.params.imageUrl);
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

  const handleSendComment = async () => {
    const data = {
      comment,
      userAvatar: user.avatar,
      date: Date.now(),
      userId: user.id,
    };

    const docRef = doc(db, "posts", route.params.id);
    await addDoc(collection(docRef, "comments"), data);
    setComment("");
  };

  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <View style={styles.container}>
        {photoUrl && <Image style={styles.image} source={{ uri: photoUrl }} />}
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CommentItem data={item} />}
        />
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
            <TouchableOpacity
              style={styles.sendBtn}
              onPress={handleSendComment}
            >
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
    marginBottom: 32,
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
