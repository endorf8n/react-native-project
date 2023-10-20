import { Image, Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export const PostItem = ({ post }) => {
  const { photoUri, location, title, locationCoords } = post;

  const navigation = useNavigation();

  const handleCommentsClick = () => {
    navigation.navigate("Comments", { photoUri });
  };

  const handleLocation = () => {
    navigation.navigate("Map", { locationCoords });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: photoUri }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.descrContainer}>
        <TouchableOpacity
          style={styles.commentsBtn}
          activeOpacity={0.5}
          onPress={handleCommentsClick}
        >
          <Feather
            name="message-circle"
            size={24}
            color="#bdbdbd"
            style={{ transform: [{ rotate: "270deg" }] }}
          />
          <Text style={styles.commentsNumber}>0</Text>
        </TouchableOpacity>
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

  commentsBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  commentsNumber: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#bdbdbd",
  },

  locationBtn: {
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
