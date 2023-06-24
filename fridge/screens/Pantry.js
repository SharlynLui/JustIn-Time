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
  ScrollView
} from "react-native";
import PantryList from "../components/PantryList";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const width = Dimensions.get("screen").width / 3 - 28;

function Pantry({ navigation }) {
  //entriesAdded is the list of items to be displayed
  const [entriesAdded, outputEntry] = useState([]);

  useEffect(() => {
    getUser()
  }, []);

  async function handler({ newEntry }) {
    const updatedEntries = [...entriesAdded, newEntry]
    outputEntry(oldEntry => [...oldEntry, newEntry]);
    console.log('handler', entriesAdded)
    await storeUser(updatedEntries)
  }

  async function deleteHandler({ id }) {
    const filteredData = entriesAdded.filter(item => item.id !== id);
    console.log('deleteHandler', filteredData)
    console.log('id', id)
    outputEntry(filteredData)
    await storeUser(filteredData)
  }

  // storing data
  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value ? value : []));
    } catch (error) {
      console.log(error);
    }
  };

  // getting data
  const getUser = async () => {
    try {
      const userData = JSON.parse(await AsyncStorage.getItem("user"))
      //console.log(userData)
      outputEntry(userData ? userData : [])
      console.log(entriesAdded)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.push("Pantry")}
          style={styles.fridgebutton} >
          <Text style={styles.sliderText}>Fridge</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push("Freezer")}
          style={styles.freezerbutton}
        >
          <Text style={styles.sliderText}>Freezer</Text>
        </TouchableOpacity>
      </View>
      <View>
        {/* 'add' button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={
              () => { navigation.navigate("Add", { handler: handler, id: entriesAdded.length == 0 ? 0 : entriesAdded[entriesAdded.length - 1].id + 1 }); }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* flatlist */}
        <View style={styles.fridge}>
          <View>
            <PantryList
              food={entriesAdded}
              deleteHandler={deleteHandler} />
          </View>


        </View>
      </View>
    </View>
  )
}


export default Pantry;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    padding: 16,
    backgroundColor: "white"
  },
  fridge: {
    //flex: 4,
    height: '75%',
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
    //resizeMode: "contain",
  },
  //for add button
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    height: '15%'
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
    height: '10%',
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  fridgebutton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#e28743",
    borderBottomWidth: 4,
    borderTopLeftRadius: 4,
  },
  freezerbutton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    borderBottomWidth: 4,
  },
  sliderText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  }
});
