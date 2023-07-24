import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(12, 9, 10, 0.4)",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  logo: {
    width: "60%",
    marginBottom: 10,
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    fontFamily: "Font-Bolds",
    fontSize: 60,
    fontWeight: "500",
    letterSpacing: -0.03,
    lineHeight: 60,
    marginBottom: 18,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "Font-Bolds",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: -0.03,
    lineHeight: 30,
    marginBottom: 100,
    textAlign: "center",
    color: "#cbcbcb",
  },
  slideButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 100,
    marginLeft: -100,
    width: 200,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#90EE90",
    borderLeftColor: "skyblue",
    borderRightColor: "skyblue",
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    boxSizing: "border-box",
  },
  slideButtonText: {
    fontFamily: "Font-Bolds",
    fontSize: 20,
    fontWeight: "500",
    letterSpacing: -0.03,
    color: "#000",
    marginRight: 10,
  },
});

export default styles;
