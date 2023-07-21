import { getDatabase, ref, set } from "firebase/database";
import { FIREBASE_APP } from "../../firebaseConfig.js";

export const setUserRole = async (userId, role) => {
  const db = getDatabase(FIREBASE_APP);
  const userRef = ref(db, `users/${userId}/role`);

  try {
    // Validate the provided role
    const validRoles = [
      "user",
      "premiumUser",
      "Vendor",
      "VerifiedVendor",
      "moderator",
      "admin",
    ];
    if (!validRoles.includes(role)) {
      console.error("Invalid user role:", role);
      return false;
    }

    await set(userRef, role);
    return true;
  } catch (error) {
    console.error("Failed to set user role:", error);
    return false;
  }
};

export const setPermissionLimit = async (userId, permission, limit) => {
  const db = getDatabase(FIREBASE_APP);
  const permissionRef = ref(db, `users/${userId}/permissions/${permission}`);

  try {
    await set(permissionRef, limit);
    return true;
  } catch (error) {
    console.error("Failed to set permission limit:", error);
    return false;
  }
};
