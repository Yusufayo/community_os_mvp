import { useState } from "react";
import { createPost } from "../lib/firebaseClient";

export default function CreatePost({ user, communityId = null, subCommunityId = null, scope = "global" }) {
  const [content, setContent] = useState("");
  const submit = async () => {
    if (!content.trim()) return;
    await createPost({
      authorId: user.uid,
      content,
      communityId: scope === "community" ? communityId : null,
      subCommunityId: subCommunityId,
      isTownSquare: scope === "global"
    });
    setContent("");
  };
  return (
    <div className="mb-4">
      <textarea value={content} onChange={e => setContent(e.target.value)} className="w-full p-2 border rounded" placeholder="Share something..." />
      <button onClick={submit} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Post</button>
    </div>
  );
}