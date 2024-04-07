import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Menu(){
  const navigation = useNavigation();
  const [items, setItems] = useState('');
  
  useEffect(() => {
    //Função para carregar os itens da API
    const carregarItens = async () => {
      try { 
        const token = await AsyncStorage.getItem('token');
        const resposta = await axios.get('http://192.168.0.38:8080/product', {
          headers: {
            Authorization: 'Bearer ${token}'
          }
        });
        setItems(resposta.data.map(item => ({id: item.id, name:item.name , email:item.email, senha:item.senha})));
      } catch (error) {
        console.error('Erro ao carregar lista:',error);
        Alert.alert('Erro', 'Erro ao carregar lista. Tente novamente mais tarde.');
      }
    };
    carregarItens();

  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemClick(item.id)} style={styles.listItem}>
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <Text>{item.senha}</Text>
    </TouchableOpacity>
  );

  const handleItemClick = (itemId) => {
    //Navegue para a tela desejada com base no item clicado
    console.log("Item clicado: ", itemId);
    // Adicionar a navegação depois
    // navigation.navigate('Detalhes', { itemId: itemId });
    navigation.navigate('DetalhesDaConta', { itemId: itemId });
  };
  
  return(
    <View style={styles.container}>
        <View style={styles.viewTop}>
         {/* Texto "Bem vindo(a)" no canto superior esquerdo */}
        <Text style={styles.message}>Bem vindo(a): Usuário</Text>

         {/* Botão no canto superior direito */}
         <TouchableOpacity style={styles.button}
            onPress={ () => navigation.navigate('RegistrarConta')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        
          <View style={styles.list}>
            <FlatList
            data={items}
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