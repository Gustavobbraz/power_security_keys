import React, { useState } from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import {useNavigation} from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CriarItem() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleName = (text) =>{
        setName(text);
    };
 
    const handleEmail = (text) =>{
        setEmail(text);
    };

    const handleSenha = (text) =>{
        setSenha(text);
    };

    const handleSubmit = async () => {
        try {
            //Recuperar o token armazenado localmente
            const token = await AsyncStorage.getItem('token');
            console.log("token no Criar:", token)

            //Enviar os dados para a lista de API com autenticação
            const resposta = await axios.post('http://192.168.0.38:8080/product', {
                name:name,
                email:email,
                senha:senha
            }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });

            //Logica após o envio bem-sucedido (navegação, etc.)
            console.log('Dados enviados com sucesso:', resposta.data);
            navigation.navigate('DetalhesDaConta', { refresh: true });
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
            Alert.alert('Erro','Erro ao enviar dados. Verifique e tente novamente.');
        }
    };


    return(
        <View>
            <Text>Serviço: </Text>
            <TextInput
                placeholder="Ex: Steam, Facebook..."
                value={name}
                onChangeText={handleName}
            />

            <Text>Usuário ou E-mail:</Text>
            <TextInput
                value={email}
                onChangeText={handleEmail}
            />
            
            <Text>Senha: </Text>
            <TextInput
                value={senha}
                onChangeText={handleSenha}
            />
            <Button title="Enviar" onPress={handleSubmit}/>
        </View>
    );

};
