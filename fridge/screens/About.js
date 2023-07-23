import React from "react";
import { StyleSheet, View, Text } from "react-native";

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        About <Text style={styles.justintime}>Justin Time</Text>
      </Text>
      <Text style={styles.paragraph}>
        Groceries are often forgotten when they are hidden away deep in the
        fridge/cabinet, leaving them to spoil and thrown away upon expiry,
        resulting in food wastage.
      </Text>
      <Text style={styles.paragraph}>
        JustIn Time allows users to keep track of their perishables, through
        reminders when nearing expiry, providing recipes and replenishment
        recommendations based on available groceries and consumption habits.
      </Text>
      <Text style={styles.paragraph}>
        To add: Key in items, expiry date and select photos from library or just take a picture!
      </Text>
      <Text style={styles.paragraph}>
        To delete: Long press on item to remove it from the pantry hassle free!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 14,
    padding: 10,
    //textAlign: "center",
  },
  justintime: {
    color: "#e28743",
  },
});

export default About;

// export default function About() {
//   return (
//     <View style={styles.container}>
//       <Text>About Justin Time</Text>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 24,
//   },
// });
