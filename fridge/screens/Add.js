
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  PermissionsAndroid,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation, route }) {
  //useState calls the function to change the variable stated
  const [enteredItem, setEnteredItem] = useState('');
  const [enteredExp, setEnteredExp] = useState('');
  const [enteredQuant, setEnteredQuant] = useState('');
  const [entriesAdded, outputEntry] = useState([]);
  const [cameraPhoto, setCameraPhoto] = useState('');
  const [galleryPhoto, setGalleryPhoto] = useState('');

  //functions to fetch user inputs as user types in the sections
  function itemInputHandler(enteredItem) {
    setEnteredItem(enteredItem);
  }
  function expInputHandler(enteredExp) {
    setEnteredExp(enteredExp);
  }
  function quantInputHandler(enteredQuant) {
    setEnteredQuant(enteredQuant);
  }
  //function to output Entry
  function addEntryHandler() {
    const newEntry = {
      item: enteredItem,
      exp: enteredExp,
      quant: enteredQuant,
      image: cameraPhoto ? cameraPhoto : galleryPhoto ? galleryPhoto : '',
      id: route.params.id
    }
    console.log(newEntry) //for debugging
    route.params.handler({ newEntry: newEntry })
    navigation.goBack()
  }

  let options = {
    saveToPhotos: true,
    mediaType: "photo",
  };

  async function openCamera() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setCameraPhoto(result.uri);
    }
  }

  async function openGallery() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setCameraPhoto(result.uri);
    }
    console.log(result.uri)
  }


  return (
    /* addContainer containers entire screen and splitted into 2 components, 
    the topRow containing the done button and the inputContainer. The inputContainer
    contains the component to add image and the details container for the rest.
    */
    <View style={styles.addContainer}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.button}
          onPress={
            () => { addEntryHandler() }
            }
            >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Item:</Text>
        <View style={styles.inputContainer}>
        <TextInput placeholder="Type here..." value={enteredItem} style={styles.input} onChangeText={itemInputHandler} />
        </View>
        <Text style={styles.label}>Expiry Date:</Text>
        <View style={styles.inputContainer}>
        <TextInput placeholder="Type here..." value={enteredExp} style={styles.input} onChangeText={expInputHandler} />
        </View>
        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.inputContainer}>
        <TextInput placeholder="Type here..." value={enteredQuant} style={styles.input} onChangeText={quantInputHandler} />
        </View>
        <Text style={styles.label}>Image: </Text>
      </View>
      <View style={styles.camera}>
        <TouchableOpacity onPress={() => openCamera()} style={styles.button}>
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery} style={styles.button}>
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  details: {
    height: '70%'
  },
  label: {
    fontSize: 20,
    marginLeft: 20
  },
  input: {
    padding: 5,
    fontSize: 20
  },
  inputContainer: {
    backgroundColor: 'white',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    height: '20%'
  },
  container: {
    backgroundColor: "#ebebeb",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: '#e28743',
    padding: 15,
    margin: 5,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: "#ebebeb",
    fontWeight: "bold",
    justifyContent: 'centre'
  },
  addContainer: {
    flexDirection: 'column',
    padding: 5,
  },
  topRow: {
    width: "40%",
    marginLeft: 115, //could not get button to align centre so padded manually, adjust if needed
    paddingTop: 10
  }
});
