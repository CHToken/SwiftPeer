import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig.js";
import ValidationUtils from "../utils/ValidationUtils";

export const login = async (email, password) => {
  if (!email || !password) {
    showMessage({
      message: "Please fill in all fields",
      type: "danger",
    });
    return { error: "Please fill in all fields" };
  }

  if (!ValidationUtils.isValidEmail(email)) {
    showMessage({
      message: "Please enter a valid email",
      type: "danger",
    });
    return { error: "Please enter a valid email" };
  }

  try {
    const auth = getAuth();
    const response = await signInWithEmailAndPassword(auth, email, password);

    if (response.user) {
      const token = await response.user.getIdToken();
      // Fetch the user data from Firestore based on the UID.
      const userRef = doc(FIREBASE_DB, "users", response.user.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = {
          email: response.user.email,
          uid: response.user.uid,
          ...userSnapshot.data(),
        };
        return { token, userData };
      }
    }
  } catch (error) {
    console.log(error.message);
    showMessage({
      message: "Oops, Login failed: " + error.message,
      type: "danger",
    });
    return { error: "Login failed" };
  }
};

export const forgotPassword = async (email) => {
  try {
    // Check if the email exists in the database
    const usersCollectionRef = collection(FIREBASE_DB, "users");
    const userSnapshot = await getDocs(
      query(usersCollectionRef, where("email", "==", email))
    );

    if (userSnapshot.empty) {
      throw new Error("User not found");
    }

    const userDocId = userSnapshot.docs[0].id;
    // Send the password reset email
    await sendPasswordResetEmail(FIREBASE_AUTH, email);
    return { success: true, message: "Password reset email sent" };
  } catch (error) {
    console.log(error.message);
    throw new Error("Password reset failed: " + error.message);
  }
};

export const registerUser = async (
  email,
  username,
  password,
  confirmPassword
) => {
  if (!email || !username || !password || !confirmPassword) {
    showMessage({
      message: "Please fill in all fields",
      type: "danger",
    });
    return { success: false };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || !email.includes(".")) {
    showMessage({
      message: "Please enter a valid email",
      type: "danger",
    });
    return { success: false };
  }

  if (password !== confirmPassword) {
    showMessage({
      message: "Passwords do not match",
      type: "danger",
    });
    return { success: false };
  }

  try {
    const auth = FIREBASE_AUTH;
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (response.user) {
      const usersCollectionRef = collection(FIREBASE_DB, "users");
      const userRef = doc(usersCollectionRef, response.user.uid);

      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        showMessage({
          message: "Oops, Registration failed. User already exists.",
          type: "danger",
        });
        return { success: false, message: "User already exists" };
      }

      const userData = {
        email: email,
        username: username,
        name: "",
        royaltyreward: {
          rewardpoints: 0,
        },
        role: "user",
      };

      await setDoc(userRef, userData);
      const token = await response.user.getIdToken();
      return { success: true, userId: response.user.uid, token };
    }
  } catch (error) {
    console.log(error.message);
    showMessage({
      message: "Oops, Registration failed: " + error.message,
      type: "danger",
    });
    return { success: false, message: "" };
  }
};
