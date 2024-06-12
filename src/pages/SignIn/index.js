import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


import { useNavigation } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';

export default function SignIn() {

    const navigation = useNavigation();
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');

    const fazerlogin = async () => {
        try {
            const resposta = await axios.post('https://www.authpsk-api.shop/auth/login',{
                login:usuario,
                password: senha
            });  

            const { token,nome } = resposta.data;
            //guardar token e navegar para outra tela se deu certo
            console.log('Token recebido sing in:', token); // Adicione esta linha para imprimir o token.

            // Armazenar o token localmente
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('nome', nome);

            // Navegar para a próxima página ou fazer outras ações após o login bem-sucedido
            navigation.navigate('DetalhesDaConta');

        } catch (error) {
            console.error('Erro ao fazer login',error);
            Alert.alert('Erro','Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    }
 return (
    <View style={(styles.container)}>

        <Animatable.View  animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Bem-vindo(a)</Text>

        </Animatable.View>

        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
            <Text style={styles.title}>E-mail</Text>

            <TextInput 
                placeholder="Digite seu E-mail" 
                style={styles.input}
                onChangeText={text => setUsuario(text)}
                value={usuario}
                />

            <Text style={styles.title}>Senha</Text>
            <TextInput 
                placeholder="Digite sua senha" 
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={fazerlogin}>
                <Text style={styles.buttonText}> Acessar </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister}
                              onPress={ () => navigation.navigate('RegistrarUser')}>
                <Text style={styles.resgisterText}> Ainda nao tem uma conta ? cadastre-se </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister}
                    onPress={() => navigation.navigate('RecuperarConta')}>
                    <Text style={styles.resgisterText}> Esqueceu sua senha? Recupere aqui </Text>
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
         color:"#a1a1a1"
     },
 })

