
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
import Input from '../components/Input';
import { useNavigation } from "@react-navigation/native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
var ImagePicker = require("react-native-image-picker");

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

  const openCamera = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const result = await ImagePicker.launchCamera(options);
      setCameraPhoto(result.assets[0].uri);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibrary(options);
    setGalleryPhoto(result.assets[0].uri);
  };

  return (
    /* addContainer containers entire screen and splitted into 2 components, 
    the topRow containing the done button and the inputContainer. The inputContainer
    contains the component to add image and the details container for the rest.
    */
    <View style={styles.addContainer}>
      <View style={styles.topRow}>
        <Button title="Done"
          onPress={
            () => { addEntryHandler() }
          }
        />
      </View>
      <View>
          <Text style={styles.label}>Item</Text>
          <TextInput value={enteredItem} style={styles.input} onChangeText={itemInputHandler} />
        </View>
        <View>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput value={enteredExp} style={styles.input} onChangeText={expInputHandler} />
        </View>     
        <View>
          <Text style={styles.label}>Quant</Text>
          <TextInput value={enteredQuant} style={styles.input} onChangeText={quantInputHandler} />
        </View>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openGallery} style={styles.button}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ebebeb",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#233f49",
    paddingHorizontal: 50,
    paddingVertical: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#ebebeb",
    fontWeight: "bold",
  },
  imageStyle: {
    height: 150,
    width: 150,
    marginTop: 20,
    borderRadius: 5,
  },
  addContainer: {
    flexDirection: 'column',
    padding: 5,
  },
  topRow: {
    width: "30%",
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '90%',
    // borderColor: 'black',
    // borderWidth: 2,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '25%',
    backgroundColor: '#cccccc',
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  details: {
    backgroundColor: 'blue',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    height: '75%',
    //paddingBottom: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
});
