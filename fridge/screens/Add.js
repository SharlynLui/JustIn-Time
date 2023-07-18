
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
import DatePicker from 'react-native-datepicker';

export default function Add({ navigation, route }) {
  //useState calls the function to change the variable stated
  const [enteredItem, setEnteredItem] = useState('');
  const [enteredExp, setEnteredExp] = useState('');
  const [enteredQuant, setEnteredQuant] = useState('');
  const [entriesAdded, outputEntry] = useState([]);
  const [cameraPhoto, setCameraPhoto] = useState('');
  const [galleryPhoto, setGalleryPhoto] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  //functions to fetch user inputs as user types in the sections
  function itemInputHandler(enteredItem) {
    setEnteredItem(enteredItem);
  }
  function quantInputHandler(enteredQuant) {
    setEnteredQuant(enteredQuant);
  }
  function dateInputHandler(enteredDate) {
    setEnteredDate(enteredDate);
    console.log('dateInputHandler', enteredDate)
  }

  //function to output Entry
  function addEntryHandler() {
    const newEntry = {
      item: enteredItem,
      date: enteredDate,
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
    if (!result.canceled) {
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
    if (!result.canceled) {
      setCameraPhoto(result.uri);
    }
    console.log(result.uri)
  }



  return (
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
          <DatePicker
            style={styles.datePicker}
            date={enteredDate}
            mode="date"
            placeholder="Select Date"
            format="YYYY-MM-DD"
            minDate="2023-01-01"
            maxDate="2123-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => dateInputHandler(date)}
          />
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
    alignItems: 'center',
    //justifyContent: 'center',
  },
  button: {
    backgroundColor: '#e28743',
    padding: 10,
    margin: 5,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 15,
    color: "#ebebeb",
    fontWeight: "bold",
    justifyContent: 'center'
  },
  addContainer: {
    flexDirection: 'column',
    padding: 5,
  },
  topRow: {
    width: "40%",
    marginLeft: 115, //could not get button to align centre so padded manually, adjust if needed
    paddingTop: 10
  },
  datePicker: {
    width: '100%'
  }
});
