import { StyleSheet, FlatList, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//to render item
const FoodItem = ({ name, date, id, quant, image, handler }) => (
    <Pressable
        onLongPress={() => { handler({ id: id }) }}
        style={({ pressed }) => pressed && styles.pressed}
    >
        <View style={styles.card}>
            <Image source={{ uri: image }} style={styles.itemImage} />
            <Text style={styles.itemText}>{name}</Text>
            <Text style={ (date)-(Date.now())<7? styles.red: styles.itemText} >Expires on:{date !== null ? date.toLocaleDateString() : "No Date Input"}</Text>
            <Text style={styles.itemText}>Quantity:{quant}</Text>
        </View>
    </Pressable>
);


function PantryList({ food, navigation, deleteHandler }) {
    console.log('food', food)
    //display date according to expiry date
    sortDates = (food) => {
        return food.sort((a, b) => new Date(a.date) - new Date (b.date))
    };
    
    sortedData = sortDates(food);
    return (
        <FlatList
            data={sortedData}
            renderItem={({ item }) =>
                <FoodItem
                    name={item.item}
                    date={new Date(item.date)}
                    quant={item.quant}
                    id={item.id}
                    handler={deleteHandler}
                    navigation={navigation}
                    image={item.image}
                />}
            keyExtractor={(item) => item.id}
            numColumns={3}
        />
    );
}
export default PantryList;

const width = Dimensions.get("screen").width / 3 - 28

const styles = StyleSheet.create({
    tab: {
        flexDirection: 'column',
        backgroundColor: 'blue',
        width: "90%",
        padding: 15,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    pressed: {
        opacity: 0.75
    },
    itemImage: {
        width: 75,
        height: '50%',
        borderRadius: 10,
        //resizeMode: "contain",
        alignSelf: "center",
    },
    red: {
        marginTop: 0,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
        color: 'red'
    },
    itemText: {
        marginTop: 0,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
    card: {
        backgroundColor: "white",
        height: 150,
        width: width,
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        padding: 15,
        justifyContent: "center",
    }
});