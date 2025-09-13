import { useState } from "react";
import { signUpWithEmail, uploadAvatar } from "../lib/firebaseClient";
import { useRouter } from "next/router";

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    const profileData = {
      displayName,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      interests: interests.split(',').map(s => s.trim()).filter(Boolean)
    };
    const user = await signUpWithEmail(email, password, profileData);
    if (avatarFile) {
      const url = await uploadAvatar(avatarFile, user.uid);
      await fetch('/api/profile/updateAvatar', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ uid: user.uid, avatar: url }) });
    }
    await fetch('/api/recommend', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ uid: user.uid }) });
    router.push('/');
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Sign up & Onboard</h1>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="Display name" value={displayName} onChange={e=>setDisplayName(e.target.value)} className="w-full p-2 border rounded"/>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 border rounded"/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded"/>
        <input placeholder="Skills (comma separated)" value={skills} onChange={e=>setSkills(e.target.value)} className="w-full p-2 border rounded"/>
        <input placeholder="Interests (comma separated)" value={interests} onChange={e=>setInterests(e.target.value)} className="w-full p-2 border rounded"/>
        <input type="file" onChange={e=>setAvatarFile(e.target.files[0])}/>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create account</button>
      </form>
    </div>
  );
}