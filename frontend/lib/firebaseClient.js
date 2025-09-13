import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  getDoc
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

let app;
if (!getApps().length) app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const googleProvider = new GoogleAuthProvider();

export async function signUpWithEmail(email, password, profileData) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCred.user.uid;
  await setDoc(doc(db, "profiles", uid), {
    uid,
    email,
    displayName: profileData?.displayName || "",
    avatar: profileData?.avatar || null,
    skills: profileData?.skills || [],
    interests: profileData?.interests || [],
    onboarded: false,
    createdAt: serverTimestamp()
  });
  return userCred.user;
}

export async function uploadAvatar(file, uid) {
  const storageRef = ref(storage, `avatars/${uid}/${file.name}`);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

/* Posts and town square */
export const createPost = async ({ authorId, content, communityId = null, subCommunityId = null, isTownSquare = false }) => {
  const docRef = await addDoc(collection(db, "posts"), {
    authorId, content, communityId, subCommunityId, isTownSquare, createdAt: serverTimestamp(), likeCount: 0
  });
  return docRef.id;
};

export const listenToTownSquare = (cb) => {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => {
    const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    cb(items);
  });
};

export function onAuth(cb) {
  return onAuthStateChanged(auth, cb);
}