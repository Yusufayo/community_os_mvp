const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.recommendCommunities = functions.https.onCall(async (data, context) => {
  const uid = data.uid || (context.auth && context.auth.uid);
  if (!uid) throw new functions.https.HttpsError('invalid-argument', 'uid required');

  const profileSnap = await db.collection('profiles').doc(uid).get();
  if (!profileSnap.exists) throw new functions.https.HttpsError('not-found', 'profile missing');

  const profile = profileSnap.data();
  const interests = profile.interests || [];
  const skills = profile.skills || [];

  const communitiesSnap = await db.collection('communities').get();
  const recommendations = [];
  communitiesSnap.forEach(doc => {
    const c = doc.data();
    const tags = c.tags || [];
    const overlap = tags.filter(t => interests.includes(t) || skills.includes(t));
    const score = overlap.length;
    if (score > 0) {
      recommendations.push({ id: doc.id, name: c.name, score, overlap });
    }
  });

  recommendations.sort((a,b) => b.score - a.score);
  const top = recommendations.slice(0, 6);

  await db.collection('recommendations').doc(uid).set({ uid, results: top, createdAt: admin.firestore.FieldValue.serverTimestamp() });

  return { results: top };
});