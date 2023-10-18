import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../Screens/auth/LoginScreen.jsx";
import RegistrationScreen from "../Screens/auth/RegistrationScreen.jsx";
import { Home } from "../Screens/Home.jsx";

const MainStack = createStackNavigator();

export const selectRoute = (isAuth) => {
  return (
    <MainStack.Navigator initialRouteName="Login">
      {!isAuth ? (
        <>
          <MainStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="Registration"
            component={RegistrationScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <MainStack.Screen name="Home" component={Home} />
      )}
    </MainStack.Navigator>
  );
};
