import { View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PostsScreen } from "./posts/PostsScreen";
import { CreatePostScreen } from "./posts/CreatePostScreen";
import { ProfileScreen } from "./posts/ProfileScreen";

const Tab = createBottomTabNavigator();

export const Home = () => {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { position: "absolute", height: 70 },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
          letterSpacing: -0.408,
          color: "#212121",
        },
      }}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          title: "Публікації",
          tabBarIcon: () => <Feather name="grid" size={24} color="#212121cc" />,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 16 }}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#bdbdbd" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          title: "Створити публікацію",
          tabBarIcon: () => (
            <Fontisto name="plus-a" size={18} color="#ffffff" />
          ),
          tabBarItemStyle: {
            alignSelf: "center",
            height: 40,
            maxWidth: 70,
            borderRadius: 20,
            backgroundColor: "#ff6c00",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Feather name="user" size={24} color="#212121cc" />,
        }}
      />
    </Tab.Navigator>
  );
};
