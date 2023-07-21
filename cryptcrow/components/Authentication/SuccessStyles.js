import { Dimensions } from "react-native";

const windowHeight = Dimensions.get("window").height;

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successContainer: {
    width: "97%",
    height: windowHeight * 0.9,
    borderRadius: 35,
    borderColor: "#888",
    borderWidth: 3,
    backgroundColor: "rgba(12, 9, 10, 0.8)",
    marginTop: windowHeight * 0.3,
    marginBottom: windowHeight * 0.3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: "white",
    borderWidth: 7,
    marginBottom: 50,
    backgroundColor: "#00C859",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Font-Bold",
    marginTop: 10,
    color: "#fff",
  },
  subtitle: {
    marginTop: 15,
    fontSize: 16,
    color: "#b4b1b1",
    fontFamily: "Font-Bold",
    letterSpacing: 0.23,
    alignSelf: "center",
    textAlign: "center",
  },
  continueButton: {
    marginTop: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 25,
    textDecorationLine: "none",
    fontFamily: "Font-Bold",
    fontSize: 20,
    fontWeight: "300",
    color: "black",
  },
};

export default styles;
