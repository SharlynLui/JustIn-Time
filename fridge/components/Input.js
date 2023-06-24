import { StyleSheet, Text, TextInput, View} from 'react-native';


//custom component for text inputs in Add page
function Input ({label, textInputConfig}) {
    return(
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput value='abc' style={styles.input} {...textInputConfig} />
      </View>
    );
  }

  export default Input;

  const styles = StyleSheet.create({
    inputContainer: {
      marginHorizontal: 4,
      marginVertical: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    label: {
      fontSize: 15,
      marginBottom: 4
    },
    input: {
      //backgroundColor: 'white',
      padding: 40,
      borderRadius: 6,
      width: '100%',
      height: 20,
      fontSize: 15,
      // justifyContent: 'flex-start',
      // alignItems: 'flex-start'
    }
  });

  // borderWidth: 1,
  // borderColor: 'black',
  // width: '80%',
  // height: '25%',
  // justifyContent: 'center',
  // alignItems: 'center'