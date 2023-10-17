import { useEffect, useState } from "react";
import { Keyboard } from "react-native";

const useKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardOpen(true);
    });

    const listenerHide = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardOpen(false);
    });

    return () => {
      listenerShow.remove();
      listenerHide.remove();
    };
  }, []);

  return [isKeyboardOpen, setIsKeyboardOpen];
};

export default useKeyboardOpen;
