import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  Animated,
  Image,
  TouchableOpacity,
  Easing,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import styles from "./WelcomeScreenStyles";
import Background from "../components/Background";

const WelcomeScreen = () => {
  const [fontsLoaded] = useFonts({
    "Font-Bold": require("../assets/fonts/Millik.ttf"),
    Regular: require("../assets/fonts/DMSans-Regular.ttf"),
    "Font-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
    "Font-Bolds": require("../assets/fonts/DMSans-Bold.ttf"),
  });

  const titleAnimation = useRef(new Animated.Value(0)).current;
  const buttonAnimation = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(titleAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      buttonAnimation.setValue(1);
    }, [])
  );

  if (!fontsLoaded) {
    return null;
  }

  const handleButtonPress = () => {
    Animated.timing(buttonAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    }).start(() => {
      navigation.navigate("Login");
    });
  };

  const buttonScale = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  const titleOpacity = titleAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Background>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <LinearGradient
          colors={["transparent", "transparent"]}
          style={styles.content}
        >
          <Image
            source={require("../assets/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
            CryptCrow
          </Animated.Text>
          <Text style={styles.subtitle}>
            Unleash the Power of Instant{"\n"}Crypto Sales
          </Text>
          <TouchableOpacity
            style={[
              styles.slideButton,
              { opacity: buttonAnimation, transform: [{ scale: buttonScale }] },
            ]}
            onPress={handleButtonPress}
            activeOpacity={0.8}
          >
            <Text style={styles.slideButtonText}>Get Started</Text>
            <Icon name="arrow-right" size={20} color="#000" />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Background>
  );
};

export default WelcomeScreen;
