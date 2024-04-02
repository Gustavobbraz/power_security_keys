import React, { useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

import { useNavigation } from "@react-navigation/native";
export default function Menu(){
    const navigation = useNavigation();

    const [mensagem, setMensagem] = useState('');
    const handlePressIn = () => {
        setMensagem('Registrar conta e senha');
    };

    const handlePressOut = () => {
      setMensagem('');
  };

  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    { id: '4', title: 'Item 4' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item.id)} style={styles.listItem}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleItemClick = (itemId) => {
    //Navegue para a tela desejada com base no item clicado
    console.log("Item clicado: ", itemId);
    // Adicionar a navegação depois
    // navigation.navigate('Detalhes', { itemId: itemId });
    navigation.navigate('DetalhesContas', { itemId: itemId });
  };
  
  return(
    <View style={styles.container}>
        <View style={styles.viewTop}>
         {/* Texto "Bem vindo(a)" no canto superior esquerdo */}
        <Text style={styles.message}>Bem vindo(a): Usuário</Text>

         {/* Botão no canto superior direito */}
         <TouchableOpacity style={styles.button}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={ () => navigation.navigate('RegistrarConta')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
          <Text style={styles.messageButton}>{mensagem}</Text>
        
          <View style={styles.list}>
            <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={2}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', // Cor de fundo da tela
    },
    viewTop:{
        marginTop:"1%",
        marginBottom:"20%",
        paddingStart:"5%",
    }, 
    message:{
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 16,
        fontWeight: "bold",
    },
    button: {
      position: 'absolute',
      top: 20, // Distância do topo da tela
      right: 20, // Distância da direita da tela
      borderWidth: 2,
      borderColor: '#000000',
      backgroundColor: 'white',
      paddingHorizontal: 6,
      borderRadius: 5,
    },
    buttonText: {
      color: '#c40d0d',
      fontWeight: 'bold',
      fontSize: 20,
    },
    messageButton: {
      position: 'absolute',
      bottom: 20,
      fontSize: 16,
      fontWeight: "bold",
    },
    list: {
      backgroundColor:"#fcfcfc",
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingStart:"5%",
        paddingEnd:"5%",
    },
    listItem: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 10,
      bottom: 10,
      height: 70, // Adjust the height as needed
      borderWidth: 2,
      borderRadius: 40,
    },
  });