import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
const width = Dimensions.get("screen").width / 3 - 28;

const items = [
  {
    id: "1",
    name: "Fruits",
    image: require("../assets/fruit.png"),
  },
  {
    id: "2",
    name: "Beverages",
    image: require("../assets/water-bottle.png"),
  },
  {
    id: "3",
    name: "Meat",
    image: require("../assets/meat.png"),
  },
  {
    id: "4",
    name: "Condiments",
    image: require("../assets/condiments.png"),
  },
  {
    id: "5",
    name: "Vegetables",
    image: require("../assets/broccoli.png"),
  },
  // Add more items here
];

const renderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

export default function Freezer({ navigation }) {
  return (
    //top tab navigator
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.push("Pantry")}
          style={styles.fridgebutton}
        >
          <Text style={styles.sliderText}>Fridge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Freezer")}
          style={styles.freezerbutton}
        >
          <Text style={styles.sliderText}>Freezer</Text>
        </TouchableOpacity>
      </View>

      {/* flatlist */}
      <View style={styles.fridge}>
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          key={"."}
          numColumns={3}
        />

        {/* 'add' button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Add")}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  fridge: {
    flex: 4,
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#E0E6EC",
  },
  card: {
    backgroundColor: "white",
    height: 115,
    width,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
  },
  itemImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    alignSelf: "center",
  },
  itemText: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    resizeMode: "contain",
  },
  //for add button
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#e28743",
    width: "30%",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  //for slider bar
  topBar: {
    height: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  fridgebutton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 4,
  },
  freezerbutton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#e28743",
    borderBottomWidth: 4,
  },
  sliderText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});
