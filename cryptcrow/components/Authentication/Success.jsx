import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Background from "../Background";
import styles from "./SuccessStyles";

const Success = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("Home");
  };

  return (
    <Background>
      <View style={styles.container}>
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
      </View>
    </Background>
  );
};

export default Success;
