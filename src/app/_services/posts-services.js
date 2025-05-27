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
      }, { merge: true });
      console.log("User added to database successfully!");
    } catch (e) {
      console.error("Error adding user to database: ", e);
    }
  };


{/* CRUD FOR POSTS */}
/**
 * Adds a post to the user's posts subcollection
 * @param {string} review - The text of the post
 * @param {string} userId - The ID of the user to add the post to
 */
export const addPost = async (title, review, userId, comicId) => {
  if (!title || !review || !userId || !comicId) {
    console.error("addPost called with missing data:", { title, review, userId, comicId });
    return;
  }
  try {
    const postsCollectionRef = collection(db, "users", userId, "posts");
    await addDoc(postsCollectionRef, {
      title,
      review,
      comicId,
      createdAt: new Date()
    });
    console.log("Post added successfully!");
  } catch (e) {
    console.error("Error adding post: ", e);
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
