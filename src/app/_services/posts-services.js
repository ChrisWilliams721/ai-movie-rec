import React from 'react'
import { collection, addDoc, getDocs,updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../_utils/firebase';

export const addPost = async (review, stars, userId) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            userId: userId,
            review: review,
            stars: stars,
        });
        console.log("Document written with ID: ", docRef.id);
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
        await updateDoc(docRef, {
            readlist: [comicId],
        });
    } catch (e) {
        console.error("Error updating document: ", e);
    }
};
