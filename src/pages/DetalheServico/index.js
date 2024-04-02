import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function DetalheServico(){
    const navigation = useNavigation();

    const data = [
        {id:'1', title: 'Item 1'},
        {id:'2', title: 'Item 2'},
        {id:'3', title: 'Item 3'},
        {id:'4', title: 'Item 4'},
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.listItem}>{item.title}</Text>
            </View>
    );

    return(
        <View styles={styles.list}>
                <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={1}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
            flex:1,
            backgroundColor:'#fff',
            paddingTop:"10%",
    },
    list: {
        paddingBottom:'10%',
        

    },
    listItem: {
        fontSize:30,
        marginLeft: 30,
        
    },
    itemContainer: {
        backgroundColor:'#fff',
        alignItems:'flex-start',
        justifyContent:'center',
        flex:1,
        borderWidth:2,
        borderRadius:30,
        top:10,
        marginBottom:20,
    },
});