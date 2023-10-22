import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const useGetComments = (id) => {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "posts", id);
      onSnapshot(collection(docRef, "comments"), (doc) => {
        const comments = doc.docs
          .map((comment) => ({
            ...comment.data(),
            id: comment.id,
          }))
          .sort((a, b) => a.date - b.date);

        setAllComments(comments);
      });
    })();
  }, []);

  return [allComments, setAllComments];
};
