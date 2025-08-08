'use client';
import { useState } from "react";
import { addCommentToPost } from "@/src/lib/posts";

type Props = {
    postId: string;
    onCommentAdded?: () => void;
};

export default function CommentForm({ postId, onCommentAdded }: Props) {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!author || !content) return;

        setLoading(true);
        await addCommentToPost(postId, { author, content });
        setContent("");
        setAuthor("");
        setLoading(false);
        onCommentAdded?.();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2 mt-4">
            <input
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full border px-2 py-1 rounded"
            />
            <textarea
                placeholder="Add a comment..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border px-2 py-1 rounded min-h-[60px]"
            />
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
                {loading ? "Posting..." : "Comment"}
            </button>
        </form>
    );
}