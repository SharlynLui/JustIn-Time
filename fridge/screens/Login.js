import { React, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Image,
} from "react-native";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app, auth } from "../firebaseConfig";

export default function Login({ navigation }) {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Pantry");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150 }}
        source={require("../assets/food.png")}
      ></Image>

      <View style={styles.spacing}>
        <Text style={styles.titleText}>Welcome to JustinTime!</Text>
        <Text style={styles.subheading}>
          Organise your pantry in just a click
        </Text>
      </View>
      {/* <Text style={styles.subheading}> */}
      {/*} key in email and password*/}
      {/* </Text> */}

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        ></TextInput>
      </View>
      {/* <Text>next & about buttons</Text> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          //on press it will call a function that calls navigation.navigate that will move user to Pantry component
          // onPress={() => navigation.naviagate("Pantry")}
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          //on press it will call a function to register new user
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("About")}
          style={(styles.button, styles.buttonOutline)}
        >
          <Text style={styles.buttonOutlineText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 25,
    textAlign: "center",
    padding: 15,
  },
  subheading: {
    fontSize: 18,
    textAlign: "center",
  },
  spacing: {
    padding: 40,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#e28743",
    width: "70%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    padding: 15,
    marginTop: 5,
    borderColor: "#f1b873",
    borderWidth: 0,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
  buttonOutlineText: {
    color: "#f1b873",
    fontWeight: "700",
    fontSize: 18,
  },
});
