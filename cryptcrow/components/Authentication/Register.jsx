import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Background from "../Background";
import styles from "./RegisterStyles";
import { registerUser } from "../service/AuthService";

const Register = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);

    // Register the user
    const registrationResponse = await registerUser(
      email,
      username,
      password,
      confirmPassword
    );

    setIsLoading(false);

    // Handle the registration response
    if (registrationResponse.success) {
      navigation.navigate("Success", { name: username });
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.backIconContainer}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.titlepart}>
            <Text style={styles.loginTitle}>{"\n"}Welcome to CryptCrow!</Text>
            <Text style={styles.loginSubTitle}>
              Register to create your first account and start trading!
            </Text>
          </View>
          <Text style={styles.label}>
            <MaterialIcons name="email" size={16} /> Email
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            <MaterialIcons name="person" size={16} /> Username
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            <MaterialIcons name="lock" size={16} /> Password
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.showPasswordButton}
              onPress={togglePasswordVisibility}
            >
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={25}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            <MaterialIcons name="lock" size={16} /> Confirm Password
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.showPasswordButton}
            onPress={togglePasswordVisibility}
          >
            <MaterialIcons
              name={showPassword ? "visibility-off" : "visibility"}
              size={25}
              color="#888"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="green" />
          ) : (
            <Text style={styles.registerLink}>Register</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.alternateText}>
          Already have an account?{" "}
          <Text style={styles.linkText} onPress={handleLogin}>
            <Text style={styles.span}>Log In </Text>
          </Text>
        </Text>
      </View>
    </Background>
  );
};

export default Register;
