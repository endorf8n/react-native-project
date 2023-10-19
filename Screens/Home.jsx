import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feather, Fontisto } from "@expo/vector-icons";
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
          headerShown: false,
          tabBarIcon: () => <Feather name="grid" size={24} color="#212121cc" />,
        }}
      />
      <Tab.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{
          tabBarStyle: { display: "none" },
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
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              activeOpacity={0.5}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="##212121CC" />
            </TouchableOpacity>
          ),
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
