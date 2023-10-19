import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { CommentsScreen } from "./CommentsScreen";
import { MapScreen } from "./MapScreen";
import { DefaultScreen } from "./DefaultScreen";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const PostsScreen = createStackNavigator();

  return (
    <PostsScreen.Navigator
      initialRouteName="PostsDefault"
      screenOptions={{ headerTitleAlign: "center" }}
    >
      <PostsScreen.Screen
        name={PostsDefault}
        component={DefaultScreen}
        opteions={{
          title: "Публікації",
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <PostsScreen.Screen name="Comments" component={CommentsScreen} />
      <PostsScreen.Screen name="Map" component={MapScreen} />
    </PostsScreen.Navigator>
  );
};
