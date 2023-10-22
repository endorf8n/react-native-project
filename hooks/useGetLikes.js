import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useGetLikes = (id) => {
  const [allLikes, setAllLikes] = useState([]);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "posts", id);
      onSnapshot(collection(docRef, "likes"), (doc) => {
        const likes = doc.docs.map((like) => ({
          ...like.data(),
          id: like.id,
        }));

        setAllLikes(likes);
      });
    })();
  }, []);

  return [allLikes, setAllLikes];
};
