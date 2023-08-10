import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const exampleImage = require('../assets/food.png');
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri;


export default function Add({ navigation, route }) {
  //useState calls the function to change the variable stated
  const [enteredItem, setEnteredItem] = useState("");
  const [enteredQuant, setEnteredQuant] = useState("0");
  const [cameraPhoto, setCameraPhoto] = useState('');
  const [galleryPhoto, setGalleryPhoto] = useState('');
  const [enteredDate, setEnteredDate] = useState(new Date(Date.now()));
  const [isPickerShow, setIsPickerShow] = useState(false);

  const showPicker = () => {
    setIsPickerShow(true);
  }

  const onDateChange = (event, value) => {
    setEnteredDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  //functions to fetch user inputs as user types in the containers
  function itemInputHandler(enteredItem) {
    setEnteredItem(enteredItem);
  }
  function quantInputHandler(enteredQuant) {
    setEnteredQuant(enteredQuant);
  }


  //function to store new entry
  function addEntryHandler() {
    const newEntry = {
      item: enteredItem,
      date: enteredDate,
      quant: enteredQuant,
      image: cameraPhoto ? cameraPhoto : galleryPhoto ? galleryPhoto : exampleImageUri,
      id: route.params.id,
    };
    console.log(newEntry); //for debugging
    route.params.handler({ newEntry: newEntry });
    navigation.goBack();
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
      setGalleryPhoto(result.uri);
    }
    console.log(result.uri);
  }

  return (
    <ScrollView style={styles.addContainer}>
      <View style={styles.icons}>
        <View>
        <TouchableOpacity style={styles.cameraButton}
          onPress={() => openCamera()}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/camera.png")}
          ></Image>
        </TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={openGallery} style={styles.cameraButton}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/gallery.png")}
          ></Image>
        </TouchableOpacity>
      </View></View>
      <View style={styles.details}>
        <Text style={styles.label}>Item:</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Type here..." value={enteredItem} style={styles.input} onChangeText={itemInputHandler} />
        </View>
        <Text style={styles.label}>Expiry Date:</Text>
        <View style={styles.inputContainer}>
          <View >
          <Text>{enteredDate.toDateString()}</Text>
          </View>
          </View>
          {!isPickerShow ? (
            <View>
              <TouchableOpacity onPress={showPicker} style={styles.button}><Text style={styles.buttonText}>Show Picker</Text></TouchableOpacity>
              </View>
          ): (
        <DateTimePicker
          value={enteredDate}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
          )}
        <Text style={styles.label}>Quantity:</Text>
        <View style={styles.inputContainer}>

          <TextInput
            placeholder="Type here..."
            value={enteredQuant}
            style={styles.input}
            onChangeText={quantInputHandler}
          />
        </View>
      </View>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.button}
          onPress={
            () => { addEntryHandler() }
          }
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  details: {
    //height: "70%",
  },
  label: {
    fontSize: 20,
    marginLeft: 20,
  },
  input: {
    padding: 5,
    fontSize: 20,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    height: 90,
  },
  button: {
    backgroundColor: "#e28743",
    padding: 15,
    margin: 5,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "#ebebeb",
    fontWeight: "bold",
    justifyContent: 'center'
  },
  addContainer: {
  flexDirection: "column",
    padding: 5,
  },
  topRow: {
    width: "40%",
    marginLeft: 110, //could not get button to align centre so padded manually, adjust if needed
    paddingTop: 10,
  },
  icons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  cameraButton: {
    padding: 15,
    margin: 5,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    alignItems: "center",
  }
});