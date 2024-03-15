import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable';
import { useNavigation } from "@react-navigation/native";
export default function Menu(){
    const navigation = useNavigation();
  return(
    <View style={styles.container}>
         {/* Texto "Bem vindo(a)" no canto superior esquerdo */}
        <Text style={styles.message}>Bem vindo(a): Usuário</Text>

         {/* Botão no canto superior direito */}
         <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <View>
            <Text>Teste</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff', // Cor de fundo da tela
      position: 'relative',
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
  });