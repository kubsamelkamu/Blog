import { db } from './FirebaseService';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

const postsCollection = collection(db, 'posts');

export const createPost = async (postData) => {

  try {
    const docRef = await addDoc(postsCollection, postData);
    return docRef.id;
  } catch (error) {
    throw new Error('Failed to create post: ' + error.message);
  }
};

export const getPosts = async () => {
  try {
    const snapshot = await getDocs(postsCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error('Failed to fetch posts: ' + error.message);
  }
};

export const updatePost = async (postId, updatedData) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, updatedData);
  } catch (error) {
    throw new Error('Failed to update post: ' + error.message);
  }
};

export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, 'posts', postId);
    await deleteDoc(postRef);
  } catch (error) {
    throw new Error('Failed to delete post: ' + error.message);
  }
};
