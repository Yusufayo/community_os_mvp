import { useEffect, useState } from "react";
import { listenToTownSquare } from "../lib/firebaseClient";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import Nav from "../components/Nav";

export default function Home({ user }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsub = listenToTownSquare(setPosts);
    return () => unsub && unsub();
  }, []);

  return (
    <div>
      <Nav user={user} />
      <main className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Town Square (Global)</h1>
        {user ? <CreatePost user={user} scope="global" /> : <p>Please sign in to post.</p>}
        <PostList posts={posts} />
      </main>
    </div>
  );
}