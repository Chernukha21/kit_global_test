import {doc, getDoc} from "firebase/firestore";
import {db} from "@/src/lib/firestore";
import CommentForm from "@/src/components/CommentForm";
import CommentList from "@/src/components/CommentsList";
import Link from "next/link";
import {Post} from "@/src/types";

export default async function PostDetailPage({ params }: { params: { id: string } }) {
    const postId = params.id;


    const postDoc = await getDoc(doc(db, "posts", postId));

    if (!postDoc.exists()) {
        return <div className="p-4">Post not found</div>;
    }

    const post = { id: postDoc.id, ...postDoc.data() } as Post;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <Link href="/" className="text-blue-500 underline mb-4 inline-block">← Back</Link>

            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <p className="text-gray-700 mb-6">{post.content}</p>

            <h2 className="text-lg font-semibold mb-2">Comments</h2>
            <CommentForm postId={postId} />
            <CommentList postId={postId} />
        </div>
    );
}