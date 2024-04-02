import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";

export default function DetalhesContas(){
    const navigation = useNavigation();

    const data = [
        { id:'1', title: 'Item 1'},
        { id:'2', title: 'Item 2'},
        { id:'3', title: 'Item 3'},
        { id:'4', title: 'Item 4'},
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemClick(item.id)} style={styles.listItem}>
            <Text style={styles.textTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    const handleItemClick = (itemId) => {
        console.log("Item clicado: ", itemId);
        navigation.navigate('DetalheServico', { itemId: itemId});
    };


    return(
        <View styles={styles.container}>

            <View style={styles.list}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={1}
                />
            </View>

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
    },
    list: {
        marginTop:"10%",
        paddingStart:"10%",
        paddingEnd:"10%",
    },
    listItem: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        margin:10,
        bottom:10,
        height:60,
        borderWidth:2,
        borderRadius:20,
    },
    textTitle: {
        fontSize: 22,
    },

});