import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Background from "../components/Background";

const HomeScreen = () => {
  useEffect(() => {
    // Add any initialization or data fetching logic here
  }, []);

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../assets/icon.png")} style={styles.logo} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>BUY</Text>
            <Text style={styles.buttonText}>SELL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Top Trader</Text>
          <Text style={styles.subtitle}>
            Trade cryptocurrencies securely and conveniently.
          </Text>
          <TouchableOpacity style={styles.getStartedButton}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={styles.statsValue}>25k</Text>
            <Text style={styles.statsLabel}>Total Users</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsValue}>95%</Text>
            <Text style={styles.statsLabel}>Positive Feedback</Text>
          </View>
          <View style={[styles.statsBox, styles.lastStatsBox]}>
            <Text style={styles.statsValue}>4.9</Text>
            <Text style={styles.statsLabel}>Average Rating</Text>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  button: {
    backgroundColor: "#FF6347",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
  },
  getStartedButton: {
    backgroundColor: "#FF6347",
    borderRadius: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  getStartedButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  statsBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#90EE90",
    borderRadius: 10,
    padding: 10,
  },
  lastStatsBox: {
    marginLeft: 10,
  },
  statsValue: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  statsLabel: {
    color: "#FFFFFF",
    fontSize: 14,
  },
});

export default HomeScreen;
