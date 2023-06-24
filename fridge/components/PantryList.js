import { StyleSheet, FlatList, Text, View, Pressable, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const FoodItem=({ name, exp, id, quant, navigation, image, handler }) => (
        <Pressable
            onLongPress={() => {handler({id:id})}}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.card}>
                <Image source={{ uri: image }} style={styles.itemImage} />
                <Text style={styles.itemText}>{name}</Text>
                <Text style={styles.itemText}>{exp}</Text>
                <Text style={styles.itemText}>{quant}</Text>                
            </View>
        </Pressable>
);

function PantryList({ food, navigation, deleteHandler }) {
    console.log('food', food)
    return (
        <FlatList
            data={food}
            renderItem={({ item }) => <FoodItem 
            name={item.item} 
            exp={item.exp} 
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
    itemText: {
        marginTop: 8,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
        //resizeMode: "contain",
    },
    card: {
        backgroundColor: "white",
        height: 150,
        width:width,
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 10,
        padding: 15,
        justifyContent: "center",
    }
});