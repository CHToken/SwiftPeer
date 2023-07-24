import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig.js";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserData(user.uid);
      } else {
        setUser(null);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId) => {
    const usersCollectionRef = collection(FIREBASE_DB, "users");
    const userRef = doc(usersCollectionRef, userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      setUserData(userSnapshot.data());
    } else {
      setUserData(null);
    }
  };

  return { user, userData };
};
