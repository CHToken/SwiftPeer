import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require("../assets/images/homebg.jpg")}
      style={styles.backgroundImage}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default Background;
