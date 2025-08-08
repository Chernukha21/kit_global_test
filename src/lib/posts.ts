import {collection, getDocs, query, orderBy, addDoc, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { db } from "./firestore";
import {Post} from '@/src/types';
import {PostInput} from "@/src/lib/schemas";
import {serverTimestamp} from "@firebase/database";
import {usePostStore} from "@/src/store/usePostStore";

export const getPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as Post[];
};


export const createPost = async (data: PostInput) => {
    await addDoc(collection(db, "posts"), {
        ...data,
        createdAt: serverTimestamp(),
    });
};

export const deletePostById = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
};


export const updatePost = async (id: string, updatedContent: string) => {
    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, {
        content: updatedContent,
        updatedAt: new Date()
    });
};

export const addCommentToPost = async (
    postId: string,
    comment: { author: string; content: string }
) => {
    await addDoc(collection(db, "posts", postId, "comments"), {
        ...comment,
        createdAt: serverTimestamp(),
    });
};

export const refreshPosts = async () => {
    const posts = await getPosts();
    usePostStore.getState().setPosts(posts);
};