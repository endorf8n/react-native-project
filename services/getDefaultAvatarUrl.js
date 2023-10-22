import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/config";

export async function getDefaultAvatarUrl() {
  const imageRef = ref(storage, "default-avatar/default-avatar.jpg");
  try {
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("Помилка отримання посилання на дефолтний аватар:", error);
    return null;
  }
}
