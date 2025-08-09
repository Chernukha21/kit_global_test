import {
    addDoc, collection, getDocs, orderBy, query, serverTimestamp,
    Timestamp,
} from "firebase/firestore";
import { db } from "./firestore";
import { Comment } from "@/src/types";
import { pickCreatedISO } from "@/src/lib/time";

type CommentDoc = {
    author: string;
    content: string;
    createdAt?: Timestamp | null;
    createdAtClient?: Timestamp | null;
};

export async function addCommentToPost(
    postId: string,
    comment: { author: string; content: string }
): Promise<Comment> {
    const clientDate = new Date();

    await addDoc(collection(db, "posts", postId, "comments"), {
        author: comment.author,
        content: comment.content,
        createdAt: serverTimestamp(),
        createdAtClient: clientDate,
    });

    return {
        id: crypto.randomUUID?.() ?? `${Date.now()}`,
        author: comment.author,
        content: comment.content,
        createdAt: clientDate.toISOString(),
    };
}

export async function getCommentsForPost(postId: string): Promise<Comment[]> {
    const q = query(
        collection(db, "posts", postId, "comments"),
        orderBy("createdAt", "desc")
    );

    const snap = await getDocs(q);

    return snap.docs.map((d) => {
        const x = d.data() as CommentDoc;

        return {
            id: d.id,
            author: x.author ?? "",
            content: x.content ?? "",
            createdAt: pickCreatedISO(x),
        };
    });
}
