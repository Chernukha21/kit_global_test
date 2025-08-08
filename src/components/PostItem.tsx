import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { usePostStore } from "@/src/store/usePostStore";
import Modal from "./Modal";
import CommentForm from "./CommentForm";
import CommentList from "./CommentsList";
import { refreshPosts } from "@/src/lib/posts";
import Link from "next/link";
import {Post} from "@/src/types";

const PostItem = ({ post }: { post: Post }) => {
    const { updatePost, deletePost } = usePostStore();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newContent, setNewContent] = useState(post.content);

    const handleUpdate = async () => {
        updatePost(post.id, newContent);
        await refreshPosts();
        setIsEditModalOpen(false);
    };

    const handleDelete = async () => {
        deletePost(post.id);
        await refreshPosts();
        setIsDeleteModalOpen(false);
    };

    return (
        <li className="p-4 bg-gray-100 rounded shadow-md mb-4">
            <div className="flex items-center justify-between align-middle">
                <Link href={`/posts/${post.id}`}>
                    <h3 className="font-semibold text-lg hover:underline">{post.title}</h3>
                </Link>
                <div className="flex items-center">
                    <button
                        onClick={() => setIsDeleteModalOpen(true)}
                        className="hover:text-red-500 transition"
                    >
                        <MdDeleteForever size={24} />
                    </button>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="hover:text-blue-500 transition"
                    >
                        <FaEdit size={24} />
                    </button>
                </div>
            </div>
            <p>{post.content}</p>

            <CommentForm postId={post.id} onCommentAdded={refreshPosts} />
            <CommentList postId={post.id} />


            {isEditModalOpen && (
                <Modal isOpen onClose={() => setIsEditModalOpen(false)}>
                    <h2 className="text-lg font-semibold mb-4">Edit Post</h2>
                    <input
                        type="text"
                        className="border px-3 py-2 rounded w-full mb-4"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                </Modal>
            )}


            {isDeleteModalOpen && (
                <Modal isOpen onClose={() => setIsDeleteModalOpen(false)}>
                    <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
                    <p className="mb-6">Are you sure you want to delete this post?</p>
                    <div className="flex justify-end space-x-2">
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-2 rounded"
                            onClick={() => setIsDeleteModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            )}
        </li>
    );
};

export default PostItem;