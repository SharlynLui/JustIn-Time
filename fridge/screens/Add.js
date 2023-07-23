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
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';


const exampleImage = require('../assets/food.png')
const exampleImageUri = Image.resolveAssetSource(exampleImage).uri


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

  //functions to fetch user inputs as user types in the sections
  function itemInputHandler(enteredItem) {
    setEnteredItem(enteredItem);
  }
  function quantInputHandler(enteredQuant) {
    setEnteredQuant(enteredQuant);
  }


  //function to output Entry
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
      setCameraPhoto(result.uri);
    }
    console.log(result.uri);
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
          <View >
          <Text>{enteredDate.toDateString()}</Text>
          </View>
          </View>
          {!isPickerShow ? (
            <View>
              <Button title ="Show Picker" color="black" onPress = {showPicker} />
              </View>
          ): (
        <DateTimePicker
          // style={styles.datePicker}
          // date={enteredDate}
          // mode="date"
          // placeholder="Select Date"
          // format="YYYY-MM-DD"
          // minDate="2023-01-01"
          // maxDate="2123-01-01"
          // confirmBtnText="Confirm"
          // cancelBtnText="Cancel"
          // onDateChange={(date) => dateInputHandler(date)}
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
        <Text style={styles.label}>Image: </Text>
      </View>

      <View style={styles.camera}>
        <TouchableOpacity
          onPress={() => openCamera()}
          style={styles.cameraButton}
        >
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/camera.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={openGallery} style={styles.cameraButton}>
          <Image
            style={{ width: 30, height: 30 }}
            source={require("../assets/gallery.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addEntryHandler();
          }}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  details: {
    height: "70%",
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
    height: "20%",
  },
  container: {
    backgroundColor: "#ebebeb",
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
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
    marginLeft: 115, //could not get button to align centre so padded manually, adjust if needed
    paddingTop: 10,
  },
  camera: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    height: "13%",
    alignItems: "center",
  },
  cameraButton: {
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  datePicker: {
    width: '100%'
  },
  pickedDateContainer: {
  },
  pickedDate: {

  },
  btnContainer: {

  },
});
