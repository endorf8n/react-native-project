import { useState } from "react";
import { UseSelector, useSelector } from "react-redux";
import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useGetComments } from "../hooks/useGetComments";
import { useGetLikes } from "../hooks/useGetLikes";
import { selectUser } from "../redux/auth/authSelectors";
import { db } from "../firebase/config";

export const PostItem = ({ post }) => {
  const { id, imageUrl, location, title, locationCoords, userId, date } = post;
  const navigation = useNavigation();

  const user = useSelector(selectUser);
  const [allComments] = useGetComments(id);
  const [allLikes] = useGetLikes(id);

  const commentsNumber = allComments.length;
  const likesNumber = allLikes.length;
  const userLike = allLikes.find((like) => like.userId === user.id);

  const handleCommentsClick = () => {
    navigation.navigate("Comments", { id, imageUrl });
  };

  const handleLocation = () => {
    navigation.navigate("Map", { locationCoords });
  };

  const toggleLike = async () => {
    if (userLike) {
      const docRef = doc(db, "posts", id, "likes", userLike.id);
      await deleteDoc(docRef);
    } else {
      const docRef = doc(db, "posts", id);
      await addDoc(collection(docRef, "likes"), {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.descrContainer}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.commentsBtn}
            activeOpacity={0.5}
            onPress={handleCommentsClick}
          >
            {commentsNumber ? (
              <FontAwesome
                name="comment"
                size={24}
                color="#ff6c00"
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              />
            ) : (
              <FontAwesome5
                name="comment"
                size={24}
                color="#bdbdbd"
                style={{
                  transform: [{ scaleX: -1 }],
                }}
              />
            )}
            <Text
              style={{
                ...styles.commentsNumber,
                color: commentsNumber ? "#212121" : "#bdbdbd",
              }}
            >
              {commentsNumber}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={toggleLike}
            style={styles.commentsBtn}
          >
            <Feather
              name="thumbs-up"
              size={24}
              color={userLike ? "#ff6c00" : "#bdbdbd"}
            />
            <Text
              style={{
                ...styles.commentsNumber,
                color: likesNumber ? "#ff6c00" : "#bdbdbd",
              }}
            >
              {likesNumber}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.locationBtn}
          activeOpacity={0.5}
          onPress={handleLocation}
        >
          <Feather name="map-pin" size={24} color="#bdbdbd" />
          <Text style={styles.locationTitle}>{location}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 32,
  },

  image: {
    height: 240,
    borderRadius: 8,
  },

  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
  },

  descrContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },

  btnContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
  },

  commentsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  commentsNumber: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },

  locationBtn: {
    maxWidth: 230,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  locationTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
    textDecorationLine: "underline",
  },
});
