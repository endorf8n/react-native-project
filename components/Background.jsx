import {
  ImageBackground,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { handleCloseKeyboard } from "../services/handleCloseKeyboard";
import BGImage from "../assets/images/BGImage.jpg";

export const Background = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={handleCloseKeyboard}>
      <ImageBackground source={BGImage} style={styles.bgImage}>
        {children}
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});
