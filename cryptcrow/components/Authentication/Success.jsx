import React from "react";
import { useFonts } from "expo-font";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Background from "../Background";
import styles from "./SuccessStyles";

const Success = () => {
  const [fontsLoaded] = useFonts({
    "Font-Bolds": require("../../assets/fonts/DMSans-Bold.ttf"),
  });
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("Home");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIconContainer}>
            <MaterialIcons name="check" size={85} color="white" />
          </View>
          <Text style={styles.title}>Registration Successful!</Text>
          <Text style={styles.subtitle}>
            Congratulations!{"\n"}You Have Successfully Registered
          </Text>
          <TouchableOpacity onPress={handleContinue}>
            <Text style={styles.continueButton}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Background>
  );
};

export default Success;
