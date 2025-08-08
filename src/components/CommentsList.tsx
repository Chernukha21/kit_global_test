'use client';
import { useEffect, useState } from "react";
import { getCommentsForPost } from "@/src/lib/comments";

type Props = {
    postId: string;
};

export default function CommentList({ postId }: Props) {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadComments = async () => {
        setLoading(true);
        const data = await getCommentsForPost(postId);
        setComments(data);
        setLoading(false);
    };

    useEffect(() => {
        loadComments();
    }, [postId, loadComments]);

    return (
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Comments</h4>
            {loading && <p>Loading comments...</p>}
            {!loading && comments.length === 0 && <p>No comments yet.</p>}
            <ul className="space-y-2">
                {comments.map((comment) => (
                    <li key={comment.id} className="bg-gray-100 p-2 rounded">
                        <p className="text-sm text-gray-700">
                            <span className="font-semibold">{comment.author}:</span> {comment.content}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}