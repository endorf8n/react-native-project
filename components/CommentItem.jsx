import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { formatDate } from "../services/formateDate";
import { selectUser } from "../redux/auth/authSelectors";

export const CommentItem = ({ data }) => {
  const user = useSelector(selectUser);

  const { comment, userAvatar, date, userId } = data;

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.commentContainer,
          flexDirection: user.id === userId ? "row" : "row-reverse",
        }}
      >
        <View
          style={{
            ...styles.textContainer,
            borderTopLeftRadius: user.id === userId ? 6 : 0,
            borderTopRightRadius: user.id === userId ? 0 : 6,
          }}
        >
          <Text style={styles.text}>{comment}</Text>
          <Text
            style={{
              ...styles.date,
              textAlign: user.id === userId ? "left" : "right",
            }}
          >
            {formatDate(date)}
          </Text>
        </View>
        <Image style={styles.image} source={{ uri: userAvatar }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  commentContainer: {
    gap: 16,
    marginBottom: 24,
  },

  textContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "##00000008",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  text: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },

  date: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    color: "#bdbdbd",
    textAlign: "right",
  },

  image: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
});
