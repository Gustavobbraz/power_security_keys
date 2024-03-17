import React, { useState } from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Picker } from "@react-native-picker/picker";

import * as Animatable from 'react-native-animatable'
import {useNavigation} from "@react-navigation/native";
export default function RegistrarConta() {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('');
    const [showSpecificText, setShowSpecificText] = useState(false);

    const handleOptionChange = (itemValue) => {
        setSelectedOption(itemValue);
        // Verificar se a opção selecionada é a que deve mostrar o texto específico
        setShowSpecificText(itemValue === 'CriarNovo');
      };
 return (
    <View style={(styles.container)}>

        <Animatable.View  animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Registrar Conta</Text>

        </Animatable.View>

        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
            <Text style={styles.title}>Usuario ou E-mail</Text>
            <TextInput placeholder="Digite um usuario ou e-mail" style={styles.input}/>

            <Text style={styles.title}>Senha</Text>
            <TextInput placeholder="Digite sua senha" style={styles.input}/>

            <Text style={styles.title}> Grupos Existentes</Text>
            <Picker
                selectedValue={selectedOption}
                onValueChange={(itemValue) => handleOptionChange(itemValue)}
            >
                
                <Picker.Item label="Criar Grupo" value="CriarNovo" />
                <Picker.Item label="Opção 1" value="opcao1" />
                <Picker.Item label="Opção 2" value="opcao2" />
                <Picker.Item label="Opção 3" value="opcao3" />
            </Picker>

            {showSpecificText && ( 
            <View>
                <Text style={styles.title}>Adicionar Grupo</Text>
                <TextInput placeholder="Novo Grupo" style={styles.input}/>
                </View>
            )}

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Adicionar Conta </Text>
            </TouchableOpacity>

        </Animatable.View>

    </View>
 );

}

 const  styles = StyleSheet.create({
     container:{
         flex:1,
         backgroundColor:"#c40d0d",

     },

     containerHeader:{
         marginTop:"2%",
         marginBottom:"4%",
         paddingStart:"5%",
     },

     message:{
         fontSize:26,
         fontWeight:"bold",
         color:"#FFF",
     },

     containerForm:{
         backgroundColor:"#fcfcfc",
         flex:1,
         borderTopLeftRadius:25,
         borderTopRightRadius:25,
         paddingStart:"5%",
         paddingEnd:"5%",

     },

     title:{
         fontSize:20,
         marginTop:12,

     },

     input:{
         borderBottomWidth: 1,
         height: 40,
         marginBottom:12,
         fontSize:16,

     },

     button:{
         backgroundColor:"#c40d0d",
         width: "100%",
         borderRadius:4,
         paddingVertical: 8,
         marginTop: 14,
         justifyContent:"center",
         alignItems:"center",
     },

     buttonText:{
         color:"#fff",
         fontSize:18,
         fontWeight:"bold"
     },

     buttonRegister:{
         marginTop:14,
         alignSelf:"center"
     },

     resgisterText:{
         color:"#a1a1a1"
     },
 })

