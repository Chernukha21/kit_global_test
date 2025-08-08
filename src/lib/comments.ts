import {
    addDoc,
    collection,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firestore";


export const addCommentToPost = async (
    postId: string,
    comment: { author: string; content: string }
) => {
    const commentsRef = collection(db, "posts", postId, "comments");
    await addDoc(commentsRef, {
        ...comment,
        createdAt: serverTimestamp(),
    });
};


export const getCommentsForPost = async (postId: string) => {
    const q = query(
        collection(db, "posts", postId, "comments"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};