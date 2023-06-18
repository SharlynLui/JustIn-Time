import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

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
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );
};

export default function Pantry({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        key={"#"}
        numColumns={4}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Add")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    margin: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  itemText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
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
});
