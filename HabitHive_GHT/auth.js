import { setDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";

async function createUserDocument(user) {
  const userDocRef = doc(db, "users", user.uid);

  await setDoc(userDocRef, {
    name: user.displayName,
    email: user.email,
    badges: {
      firstLog: false,
      threeDays: false,
      sevenDays: false,
      transportMaster: false,
      habitMaster: false,
      planetSaver: false
    }
  });
}
