import { StyleSheet, FlatList, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function FoodItem({ item, navigation, handler }) {

    function tabPressHandler() { //delete item and go back in this function
        handler({ id: item.id })
    }

    return (
        <Pressable
            onLongPress={tabPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.card}>
                <Image source={item.image} style={styles.itemImage} />
                <Text style={styles.itemText}>{item.name}</Text>
            </View>
        </Pressable>
    )
}

function PantryList({ food, navigation, deleteHandler }) {
    console.log(food)
    return (
        <FlatList
            nestedScrollEnabled={true}
            data={food}
            renderItem={({ item }) => <FoodItem item={item} handler={deleteHandler} navigation={navigation} />}
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
        width: 50,
        height: 50,
        resizeMode: "contain",
        alignSelf: "center",
    },
    itemText: {
        marginTop: 8,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
        resizeMode: "contain",
    },
    card: {
        backgroundColor: "white",
        height: 115,
        width:width,
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        padding: 15,
        justifyContent: "center",
    }
});