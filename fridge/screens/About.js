import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text>About Us!</Text>
      <Text>This app aims to help you organise your fridge and never waste groceries again!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
});