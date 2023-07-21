import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { showMessage } from "react-native-flash-message";
import { forgotPassword } from "../service/AuthService";
import ValidationUtils from "../utils/ValidationUtils";
import Background from "../Background";
// import styles from "./PasswordResetStyles";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordResetRequest = async () => {
    // Validate input fields
    if (!ValidationUtils.isValidEmail(email)) {
      showMessage({
        message: "Please enter a valid email",
        type: "danger",
      });
      return;
    }
    setIsLoading(true);

    try {
      await forgotPassword(email);
      showMessage({
        message: "Password reset email sent. Please check your inbox.",
        type: "success",
      });
    } catch (error) {
      showMessage({
        message: "Password reset failed: " + error.message,
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>
          Please enter your email address to reset your password.
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handlePasswordResetRequest}
          disabled={isLoading}
        >
          <Text style={styles.resetButtonText}>
            {isLoading ? "Sending..." : "Reset Password"}
          </Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(12, 9, 10, 0.8)",
    paddingHorizontal: 10,
    color: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "200",
    marginBottom: 10,
    fontFamily: "Font-Bold",
    color: "#fff",
  },
  logo: {
    width: "30%",
    height: "15%",
    marginBottom: 50,
    backgroundColor: "black",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 50,
    textAlign: "center",
    fontFamily: "Font-Bold",
    color: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    color: "#fff",
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 2,
    color: "#fff",
    fontFamily: "Font-Bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    color: "white",
    margin: 10,
    fontFamily: "Font-Bold",
    paddingHorizontal: 10,
  },
  resetButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: "#000",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#90EE90",
    borderLeftColor: "skyblue",
    borderRightColor: "skyblue",
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
  },
  resetButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "200",
    fontFamily: "Font-Bold",
  },
});

export default PasswordReset;
