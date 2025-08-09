export type Post =  {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

export type Comment = {
    id: string;
    author: string;
    content: string;
    createdAt: string | null;
};
