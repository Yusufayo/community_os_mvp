export default function PostList({ posts }) {
  if (!posts) return null;
  return (
    <div className="space-y-4">
      {posts.map(p => (
        <div key={p.id} className="border rounded p-3 bg-white">
          <div className="text-sm text-gray-500 mb-1">{p.authorId} • {p.createdAt?.toDate ? p.createdAt.toDate().toLocaleString() : ""}</div>
          <div>{p.content}</div>
        </div>
      ))}
    </div>
  );
}