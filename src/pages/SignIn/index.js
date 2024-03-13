import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

import * as Animatable from 'react-native-animatable'
export default function SignIn() { 
 return (
    <View style={(styles.container)}>

        <Animatable.View  animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Bem-vindo(a)</Text>

        </Animatable.View>

        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
            <Text style={styles.title}>Usuario ou E-mail</Text>
            <TextInput placeholder="Digite um usuario ou e-mail" style={styles.input}/>

            <Text style={styles.title}>Senha</Text>
            <TextInput placeholder="Digite sua senha" style={styles.input}/>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Acessar </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister}>
                <Text style={styles.registerText}> cadastre-se </Text>
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
         marginTop:"14%",
         marginBottom:"8%",
         paddingStart:"5%",
     },

     message:{
         fontSize:28,
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
         backgroundColor:"#a1a1a1"
     }
 })

