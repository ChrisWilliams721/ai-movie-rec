import React from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../_utils/firebase";

{/* CRUD FOR USERS */}
export const addUser = async (user) => {
    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        readlist: [],
      }, { merge: true });
      console.log("User added to database successfully!");
    } catch (e) {
      console.error("Error adding user to database: ", e);
    }
  };


{/* CRUD FOR POSTS */}
export const addPost = async (review, userId) => {
  try {
    const docRef = doc(db, "users", userId);
    const postsCollectionRef = collection(docRef, "posts");
    await addDoc(postsCollectionRef, {
      review,
    });
    console.log("Document added successfully!");
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts;
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
};

export const saveComic = async (comicId, userId) => {
  try {
    const docRef = doc(db, "users", userId);
    await setDoc(docRef, {
        readlist: arrayUnion(comicId),
    }, { merge: true });
    console.log("Document updated successfully!");
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};
