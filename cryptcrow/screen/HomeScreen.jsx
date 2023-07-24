import React, { useState, useEffect } from "react";
import { useFonts } from "expo-font";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import Background from "../components/Background";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../components/hooks/useAuth";
import ListItem from "../components/marketdata/ListItem";
import { getMarketData } from "../components/service/CryptoService";

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    "Font-Bolds": require("../assets/fonts/DMSans-Bold.ttf"),
  });
  const { userData } = useAuth();
  const [data, setData] = useState([]);
  const [activeIcon, setActiveIcon] = useState("home");

  // const ListHeader = () => (
  //   <>
  //     <View style={styles.titleWrapper}>
  //       <Text style={styles.largeTitle}>Markets</Text>
  //     </View>
  //     <View style={styles.divider} />
  //   </>
  // );

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    };

    fetchMarketData();
  }, []);

  const handleIconPress = (iconName) => {
    setActiveIcon(iconName);
    // Add any logic you want to execute when an icon is pressed
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.topBar}>
          {/* <Image source={require("../assets/icon.png")} style={styles.logo} /> */}
          <Text style={styles.welcomeText}>
            Hello {userData && userData.username},{"\n"}&nbsp;
            <Text style={styles.welcomeText2}>&nbsp;Welcome Back!</Text>
          </Text>
          <TouchableOpacity onPress={() => handleIconPress("profile")}>
            <FontAwesome name="user-circle" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.Card}>
          <View style={styles.CardConts}>
            <View style={styles.cardContainer}>
              <View style={styles.cryptoInfo}>
                <Text style={styles.cardTitle}>
                  Buy Sell Crypto{"\n"}{" "}
                  <Text style={styles.cardSubtitle}>Trade</Text>
                </Text>
              </View>
              <Image
                source={require("../assets/images/swap.png")}
                style={styles.cryptoLogo}
              />
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.cryptoInfo}>
                <Text style={styles.cardTitle}>
                  Fast Funding{"\n"}{" "}
                  <Text style={styles.cardSubtitle}>Deposit</Text>
                </Text>
              </View>
              <Image
                source={require("../assets/images/purse.png")}
                style={styles.cryptoLogo}
              />
            </View>
          </View>
          <View style={styles.containers}>
            <View style={styles.titleWrapper}>
              <Text style={styles.largeTitle}>Markets</Text>
            </View>
            <View style={styles.divider} />
            <FlatList
              keyExtractor={(item) => item.id}
              data={data}
              renderItem={({ item }) => (
                <ListItem
                  name={item.name}
                  symbol={item.symbol}
                  currentPrice={item.current_price}
                  priceChangePercentage7d={
                    item.price_change_percentage_7d_in_currency
                  }
                  logoUrl={item.image}
                />
              )}
              // ListHeaderComponent={<ListHeader />}
            />
          </View>
          {/* <View style={styles.topText}></View> */}
          <View style={styles.iconsContainer}>
            <TouchableOpacity
              onPress={() => handleIconPress("home")}
              style={styles.iconButton}
            >
              <Feather
                name="home"
                size={25}
                color={activeIcon === "home" ? "#000" : "green"}
              />
              <Text style={styles.Text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIconPress("repeat")}
              style={styles.iconButton}
            >
              <Feather
                name="repeat"
                size={25}
                color={activeIcon === "repeat" ? "#000" : "green"}
              />
              <Text style={styles.Text}>Trade</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIconPress("notifications-outline")}
              style={styles.iconButton}
            >
              <Ionicons
                name="notifications-outline"
                size={25}
                color={
                  activeIcon === "notifications-outline" ? "#000" : "green"
                }
              />
              <Text style={styles.Text}>Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleIconPress("settings")}
              style={styles.iconButton}
            >
              <AntDesign
                name="setting"
                size={25}
                color={activeIcon === "settings" ? "#000" : "green"}
              />
              <Text style={styles.Text}>Setting</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 10,
    paddingTop: 50,
  },
  Card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    flex: 1,
    justifyContent: "space-between",
  },
  CardConts: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardContainer: {
    borderRadius: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#eaeaea",
    marginBottom: 5,
    width: 180,
    height: 60,
  },
  cardTitle: {
    fontSize: 12,
    color: "#000",
    fontFamily: "Font-Bolds",
    marginBottom: 5,
  },
  cardSubtitle: {
    color: "#000",
    fontSize: 15,
    fontFamily: "Font-Bolds",
    fontWeight: "bold",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: 5,
    marginTop: 0,
    paddingBottom: 15,
  },
  cryptoLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  cryptoInfo: {
    flex: 1,
    justifyContent: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#eaeaea",
    borderRadius: 15,
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
  },
  Text: {
    color: "black",
    paddingTop: 5,
    textTransform: "capitalize",
    fontFamily: "Font-Bolds",
    fontWeight: "800",
    fontSize: 12,
  },
  welcomeText: {
    fontSize: 20,
    color: "#6aff80",
    height: 50,
    width: 150,
    fontWeight: "bold",
    fontFamily: "Font-Bolds",
  },
  welcomeText2: {
    fontSize: 12,
    color: "#e4e4e4",
    fontFamily: "Font-Bolds",
    fontWeight: "100",
  },
  // new style
  containers: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  titleWrapper: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default HomeScreen;
