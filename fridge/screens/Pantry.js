import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import PantryList from "../components/PantryList";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth, signOut } from "firebase/auth";
import { app, auth } from "../firebaseConfig";

const width = Dimensions.get("screen").width / 3 - 28;

function Pantry({ navigation }) {
  //entriesAdded is the list of items to be displayed
  const [entriesAdded, outputEntry] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  async function handler({ newEntry }) {
    const updatedEntries = [...entriesAdded, newEntry];
    outputEntry((oldEntry) => [...oldEntry, newEntry]);
    console.log("handler", entriesAdded);
    await storeUser(updatedEntries);
  }

  async function deleteHandler({ id }) {
    const filteredData = entriesAdded.filter((item) => item.id !== id);
    console.log("deleteHandler", filteredData);
    console.log("id", id);
    outputEntry(filteredData);
    await storeUser(filteredData);
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
      const userData = JSON.parse(await AsyncStorage.getItem("user"));
      //console.log(userData)
      outputEntry(userData ? userData : []);
      console.log(entriesAdded);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxId = () => {
    id = 0
    for (let i = 0; i < entriesAdded.length; i++) {
      if (entriesAdded[i].id >= id){
        id = entriesAdded[i].id+1
      }
    }
    return id
  }

  const auth = getAuth(app);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View>
        {/* 'add' button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Add", {
                handler: handler,
                id: getMaxId(),
              });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* flatlist */}
        <View style={styles.fridge}>
          <View>
            <PantryList food={entriesAdded} deleteHandler={deleteHandler} />
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutbutton}>
        <Image
          style={{ width: 30, height: 30 }}
          source={require("../assets/logout.png")}
        ></Image>
      </TouchableOpacity>
    </View>
  );
}

export default Pantry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "white",
  },
  fridge: {
    //flex: 4,
    height: "75%",
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
    height: "15%",
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
    height: "10%",
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
  },
  signOutbutton: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 10,
    padding: 12, //how to shift this left a bit...
  },
});
