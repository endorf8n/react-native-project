import { Alert, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";
import { DefaultScreen } from "./DefaultScreen";
import { logOutThunk } from "../../redux/auth/authOperations";

export const PostsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const PostsScreen = createStackNavigator();

  const handleLogOut = () => {
    dispatch(logOutThunk())
      .unwrap()
      .catch((error) => Alert.alert("Помилка виходу з акаунту", error));
  };

  return (
    <PostsScreen.Navigator
      initialRouteName="PostsDefault"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <PostsScreen.Screen
        name="PostsDefault"
        component={DefaultScreen}
        options={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.5}
              onPress={handleLogOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <PostsScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
        }}
      />
      <PostsScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
        }}
      />
    </PostsScreen.Navigator>
  );
};
