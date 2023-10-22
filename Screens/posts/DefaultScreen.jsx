import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, FlatList, StyleSheet, Image, Text } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { PostItem } from "../../components/PostItem";
import { selectUser } from "../../redux/auth/authSelectors";

export const DefaultScreen = () => {
  const [posts, setPosts] = useState([]);

  const user = useSelector(selectUser);

  useEffect(() => {
    (async () => {
      onSnapshot(collection(db, "posts"), (doc) => {
        const allPosts = doc.docs
          .map((post) => ({ ...post.data(), id: post.id }))
          .sort((a, b) => b.date - a.date);

        setPosts(allPosts);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Image style={styles.image} source={{ uri: user.avatar }} />
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostItem post={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    paddingTop: 32,
  },

  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },

  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    color: "#212121",
  },

  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "#212121cc",
  },
});
