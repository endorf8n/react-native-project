import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { selectStateChanged } from "../redux/auth/authSelectors";
import { refreshUser } from "../redux/auth/authSlice";
import { selectRoute } from "../services/router";

export const AppNavigation = () => {
  const stateChanged = useSelector(selectStateChanged);
  const dispatch = useDispatch();

  const routing = selectRoute(stateChanged);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          user: {
            name: user.displayName,
            email: user.email,
            id: user.uid,
            avatar: user.photoURL,
          },
          stateChanged: true,
        };
        dispatch(refreshUser(data));
      } else {
        return;
      }
    });
  }, []);

  return <NavigationContainer>{routing}</NavigationContainer>;
};
