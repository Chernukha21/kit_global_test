import { usePostStore } from "@/src/store/usePostStore";
import { useShallow } from "zustand/react/shallow";
import { useState } from "react";
import PostItem from "./PostItem";

const PostList = () => {
    const [hasUserSorted, setHasUserSorted] = useState(false);

    const { sortType, setSortType, getSortedPosts, posts } = usePostStore(
        useShallow((s) => ({
            sortType: s.sortType,
            setSortType: s.setSortType,
            getSortedPosts: s.getSortedPosts,
            posts: s.posts,
        }))
    );

    const sortedPosts = hasUserSorted ? getSortedPosts() : posts;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Posts</h2>
                <select
                    value={sortType}
                    onChange={(e) => {
                        setSortType(e.target.value as any);
                        setHasUserSorted(true);
                    }}
                    className="border px-2 py-1 rounded"
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="az">A–Z</option>
                    <option value="za">Z–A</option>
                </select>
            </div>

            <ul className="space-y-2">
                {sortedPosts.map((post) => (
                    <PostItem key={post.id} post={post} />
                ))}
            </ul>
        </div>
    );
};

export default PostList;