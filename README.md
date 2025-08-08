# 📝 Single Page Blog App

A simple blog platform built with **Next.js 15**, **Firebase Firestore**, **Zustand**, **SWR**, **Zod**, and **Tailwind CSS**. Users can:

- View all blog posts
- Create new posts
- Edit and delete posts
- Add comments to posts
- View detailed post pages with comments

---

## ⚙️ Tech Stack

| Tool              | Purpose                                  |
|-------------------|-------------------------------------------|
| **Next.js 15**    | App Router with SSR, CSR, and routing     |
| **Firebase Firestore** | NoSQL database for posts & comments  |
| **Zustand**       | State management for posts, sorting, modals |
| **SWR**           | Data fetching for initial post load       |
| **Zod**           | Form validation for posts and comments    |
| **Tailwind CSS**  | Styling framework                         |
| **React Icons**   | UI icons (edit/delete)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Homepage (all posts)
│   └── posts/[id]/page.tsx       # Single post detail view
├── components/
│   ├── PostList.tsx              # Post sorting + list
│   ├── PostItem.tsx              # Each post with actions
│   ├── CommentForm.tsx           # Add comment
│   ├── CommentList.tsx           # View comments
│   └── Modal.tsx                 # Reusable modal
├── store/
│   └── usePostStore.ts           # Zustand post store
├── lib/
│   ├── firestore.ts              # Firebase config
│   ├── posts.ts                  # Firestore CRUD helpers
│   └── schemas.ts                # Zod validation schemas
├── types/
│   └── index.ts                  # Type definitions
```

---

## 🧠 Firestore Structure

### Collection: `posts`
```ts
{
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}
```

### Subcollection: `posts/{postId}/comments`
```ts
{
  author: string;
  content: string;
  createdAt: Timestamp;
}
```

---

## 🚀 Features

### ✅ Blog Posts
- List posts with optional sorting (newest, oldest, A–Z, Z–A)
- Create a new post (Zod validation)
- Edit a post (modal)
- Delete a post (confirmation modal)

### ✅ Comments
- Add comments with author + content fields
- View comments per post
- Comments stored in Firestore under `posts/{id}/comments`

### ✅ Detail View
- Route: `/posts/[id]`
- Displays full post content + comments
- Back link to homepage

---

## 🔄 State Management (Zustand)

```ts
{
  posts: Post[];
  setPosts(posts);
  updatePost(id, partialData);
  deletePost(id);
  sortType: 'newest' | 'oldest' | 'az' | 'za';
  setSortType(type);
  getSortedPosts();
}
```

- State used in `PostList`, `PostItem`, etc.
- Updated after actions using `refreshPosts()` helper

---

## 🧪 Validation (Zod)

### Post creation schema:
```ts
z.object({
  title: z.string().min(3),
  content: z.string().min(10),
})
```

### Comment schema:
```ts
z.object({
  author: z.string().min(2),
  content: z.string().min(5),
})
```

---

## 🔁 Refresh Strategy

SWR's `mutate()` is not used.  
Instead, we use:

```ts
// lib/posts.ts
export const refreshPosts = async () => {
  const posts = await getPosts();
  usePostStore.getState().setPosts(posts);
};
```

This guarantees data sync between Firestore and Zustand.

---

## 💡 Future Improvements

- 🔐 Firebase Auth (user-specific posts & comments)
- 📸 Upload post images via Firebase Storage
- 📶 Real-time updates via `onSnapshot`
- 🧭 Pagination using `startAfter + limit`
- 📄 SEO with `generateMetadata()` in post detail page
- 🔔 Toast feedback using `react-hot-toast` or similar

---

## 🛠 Getting Started

1. Clone the repo
2. Set up a Firebase project
3. Add your Firebase config in `lib/firestore.ts`
4. Install dependencies:
```bash
npm install
```

5. Run dev server:
```bash
npm run dev
```

---

## 🙌 Credits

Created by [Your Name] as a test task / blog showcase.