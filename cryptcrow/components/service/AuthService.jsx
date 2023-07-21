import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig.js";
import ValidationUtils from "../utils/ValidationUtils";
import * as Crypto from "expo-crypto";

export const login = async (email, password) => {
  try {
    // Validate the email format
    if (!ValidationUtils.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    // Retrieve the user's data from Firestore using email
    const usersCollectionRef = collection(FIREBASE_DB, "users");
    const querySnapshot = await getDocs(
      query(usersCollectionRef, where("email", "==", email))
    );
    const userData = querySnapshot.docs[0]?.data();

    if (!userData) {
      throw new Error("User not found");
    }

    if (password !== userData.password) {
      throw new Error("Incorrect password");
    }

    const userCredential = await signInWithEmailAndPassword(
      FIREBASE_AUTH,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    return { token, userData };
  } catch (error) {
    throw error;
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
    const usersCollectionRef = collection(FIREBASE_DB, "users");

    // Check if email already exists
    const emailSnapshot = await getDocs(
      query(usersCollectionRef, where("email", "==", email))
    );

    if (emailSnapshot.size > 0) {
      showMessage({
        message: "Email already exists. Please choose a different email.",
        type: "danger",
      });
      return { success: false, message: "Email already exists" };
    }

    // Check if username already exists
    const usernameSnapshot = await getDocs(
      query(usersCollectionRef, where("username", "==", username))
    );

    if (usernameSnapshot.size > 0) {
      showMessage({
        message: "Username already exists. Please choose a different username.",
        type: "danger",
      });
      return { success: false, message: "Username already exists" };
    }

    const hashedPassword = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password
    );

    // Log the hashed password after it is created
    console.log("Hashed Password:", hashedPassword);

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      hashedPassword
    );

    if (response.user) {
      const userRef = doc(usersCollectionRef, username);
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
        password: hashedPassword,
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
      message: "Oops, Registration failed" + error.message,
      type: "danger",
    });
    return { success: false, message: "" };
  }
};
