export default function Nav({ user }) {
  return (
    <nav className="bg-white shadow p-3 mb-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Community OS</div>
        <div>
          {user ? <span className="text-sm">Signed in</span> : <a href="/signup" className="text-sm text-blue-600">Sign up</a>}
        </div>
      </div>
    </nav>
  );
}