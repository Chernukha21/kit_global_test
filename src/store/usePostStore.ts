import { create } from 'zustand'
import { Post } from '@/src/types'
import {deletePostById, updatePost} from "@/src/lib/posts";

type SortType = 'newest' | 'oldest' | 'az' | 'za'

type PostStore =  {
    posts: Post[]
    sortType: SortType
    hasSorted: boolean
    setSortType: (type: SortType) => void
    addPost: (post: Post) => void
    deletePost: (id: string) => void
    setPosts: (posts: Post[]) => void
    updatePost: (id: string, data: string) => void
    getSortedPosts: () => Post[]
}

export const usePostStore = create<PostStore>((set, get) => ({
    posts: [],
    sortType: 'newest',
    hasSorted: false,
    setPosts: (posts) => set({ posts }),
    addPost: (post) => set({ posts: [post, ...get().posts] }),
    deletePost: async (id) => {
        await deletePostById(id);
        set((state) => ({ posts: state.posts.filter((p) => p.id !== id) }));
    },
    updatePost: async (id, data) => {
        await updatePost(id, data);
        set((state) => ({
            posts: state.posts.map((p) => (p.id === id ? { ...p, data } : p)),
        }));
    },
    setSortType: (type) =>
        set({
            sortType: type,
            hasSorted: true,
        }),
    getSortedPosts: () => {
        const { posts, sortType, hasSorted } = get();
        if (!hasSorted) return posts

        return [...posts].sort((a, b) => {
            switch (sortType) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                case 'az':
                    return a.title.localeCompare(b.title)
                case 'za':
                    return b.title.localeCompare(a.title)
                default:
                    return 0
            }
        })
    },
}))