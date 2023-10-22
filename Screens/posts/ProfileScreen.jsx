import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  SimpleLineIcons,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { updateProfile } from "firebase/auth";
import { Background } from "../../components/Background";
import { UserPostItem } from "../../components/UserPostItem";
import { selectUser } from "../../redux/auth/authSelectors";
import { logOutThunk } from "../../redux/auth/authOperations";
import { auth, db } from "../../firebase/config";
import { uploadImageToServer } from "../../services/uploadImageToServer";
import { updateAvatar } from "../../redux/auth/authSlice";

export const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [avatar, setAvatar] = useState(null);

  const navigation = useNavigation();

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "posts"), where("userId", "==", user.id));
      onSnapshot(q, (doc) => {
        const allPosts = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);
        setUserPosts(allPosts);
      });

      const mediaPermission =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (mediaPermission.status !== "granted") {
        console.log("No access to media library");
      }
    })();
  }, []);

  const handleLogOut = () => {
    dispatch(logOutThunk);
  };

  const handleUpdateAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.canceled) {
      return;
    }

    const newAvatar = result.assets[0].uri;

    setAvatar(newAvatar);

    const photo = await uploadImageToServer({
      imageUri: newAvatar,
      folder: "avatars",
    });

    const currentUser = auth.currentUser;

    dispatch(updateAvatar({ photo }));

    await updateProfile(currentUser, {
      photoURL: photo,
    });
  };

  const handleNavigate = () => {
    navigation.navigate("Create");
  };

  return (
    <Background>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.logOutBtn}
          activeOpacity={0.5}
          onPress={handleLogOut}
        >
          <Feather name="log-out" size={24} color="#bdbdbd" />
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: avatar ? avatar : user.avatar }}
          />
          <TouchableOpacity
            style={styles.changeBtn}
            activeOpacity={0.5}
            onPress={handleUpdateAvatar}
          >
            <SimpleLineIcons
              name="close"
              size={25}
              color="#e8e8e8"
              style={styles.avatarIcon}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        {userPosts.length ? (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <UserPostItem post={item} />}
          />
        ) : (
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.5}
            onPress={handleNavigate}
          >
            <Text style={styles.addText}>Додайте перший пост</Text>
            <MaterialCommunityIcons
              name="file-image-plus"
              size={50}
              color="#ff6c00"
            />
          </TouchableOpacity>
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "80%",
    paddingHorizontal: 16,
    paddingTop: 22,
    paddingBottom: 70,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: "#ffffff",
  },

  logOutBtn: {
    alignSelf: "flex-end",
    marginBottom: 46,
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
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  changeBtn: {
    position: "absolute",
    right: -12,
    bottom: 14,
  },

  avatarIcon: {
    borderRadius: 50,
    backgroundColor: "#ffffff",
  },

  userName: {
    marginBottom: 32,
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.3,
    textAlign: "center",
    color: "#212121",
  },

  addBtn: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 12,
    marginTop: 30,
  },

  addText: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    color: "#212121cc",
  },
});
