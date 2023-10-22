import { useCallback, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Feather, Fontisto } from "@expo/vector-icons";
import { PostsScreen } from "./posts/PostsScreen";
import { CreatePostScreen } from "./posts/CreatePostScreen";
import { ProfileScreen } from "./posts/ProfileScreen";

const Tab = createBottomTabNavigator();

export const Home = () => {
  const [isProfileActive, setIsProfileActive] = useState(false);

  const navigation = useNavigation();

  const ProfileScreenWrapper = () => {
    useFocusEffect(
      useCallback(() => {
        setIsProfileActive(true);
        return () => {
          setIsProfileActive(false);
        };
      }, [])
    );

    return <ProfileScreen />;
  };

  return (
    <Tab.Navigator
      id="home"
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
          tabBarStyle: {
            display: "flex",
          },
          headerShown: false,
          tabBarIcon: () => <Feather name="grid" size={24} color="#212121cc" />,
        }}
      />
      {isProfileActive ? (
        <>
          <Tab.Screen
            name="Profile"
            component={ProfileScreenWrapper}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Feather name="user" size={24} color="#ffffff" />
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
            name="Create"
            component={CreatePostScreen}
            options={{
              tabBarStyle: { display: "none" },
              title: "Створити публікацію",
              tabBarIcon: () => (
                <Fontisto name="plus-a" size={18} color="#212121cc" />
              ),
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 16 }}
                  activeOpacity={0.5}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Feather name="arrow-left" size={24} color="#212121cc" />
                </TouchableOpacity>
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Create"
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
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Feather name="arrow-left" size={24} color="#212121cc" />
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreenWrapper}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <Feather name="user" size={24} color="#212121cc" />
              ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};
