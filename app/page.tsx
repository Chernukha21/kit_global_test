'use client';
import useSWR from 'swr';
import {getPosts} from '@/src/lib/posts';
import PostForm from "@/src/components/PostForm";
import PostList from "@/src/components/PostList";
import {Post} from "@/src/types";
import {useEffect} from "react";
import {usePostStore} from "@/src/store/usePostStore";
import Loading from "@/src/components/Loading";

export default function HomePage() {
    const {data: posts, error, isLoading} = useSWR<Post[]>('posts', getPosts);
    const setPosts = usePostStore((state) => state.setPosts);

    useEffect(() => {
        if (posts) {
            setPosts(posts);
        }
    }, [posts, setPosts]);

    if (isLoading) return <Loading extraClasses="fixed top-1/2 left-1/2 w-10 h-10" />;
    if (!posts && error) return <p>Failed to load posts.</p>;

    return (
        <div className="max-w-2xl mx-auto">
            <PostForm/>
            <hr className="my-6"/>
            <PostList />
        </div>
    );
}