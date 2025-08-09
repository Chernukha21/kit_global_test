'use client';
import { useEffect, useState } from "react";
import { getCommentsForPost } from "@/src/lib/comments";
import { Comment } from "@/src/types";
import Loading from "@/src/components/Loading";

type Props = {
    postId: string;
};

export default function CommentList({ postId }: Props) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const loadComments = async () => {
        setLoading(true);
        const data = await getCommentsForPost(postId);
        setComments(data);
        setLoading(false);
    };

    useEffect(() => {
       void loadComments();
    }, [postId]);


    return (
        <div className="mt-4">
            <h4 className="font-semibold mb-2">Comments</h4>
            {loading && <Loading/>}
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