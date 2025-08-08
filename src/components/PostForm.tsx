'use client';
import { createPost } from "@/src/lib/posts";
import { postSchema } from "@/src/lib/schemas";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import Loading from "@/src/components/Loading";

type FormData = z.infer<typeof postSchema>;

export default function PostForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<FormData>({
        resolver: zodResolver(postSchema),
    });

    const { trigger } = useSWRMutation<unknown, unknown, string, FormData>('posts', (_, { arg }) => createPost(arg));

    const onSubmit = async (data: FormData) => {
        await trigger(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4 shadow-md">
            <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                    type="text"
                    {...register("title")}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div>
                <label className="block mb-1 font-medium">Content</label>
                <textarea
                    {...register("content")}
                    className="w-full px-3 py-2 border rounded min-h-[120px]"
                />
                {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                {isSubmitting ? <Loading/> : "Create Post"}
            </button>
        </form>
    );
}