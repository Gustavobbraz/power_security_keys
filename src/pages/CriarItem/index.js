import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import React, { useState } from "react";
import { Alert, Button, Text, TextInput, View,StyleSheet, TouchableOpacity } from "react-native";

export default function CriarItem() {
    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [grupo, setGrupo] = useState('');

    const handleName = (text) =>{
        setName(text);
    };
 
    const handleEmail = (text) =>{
        setEmail(text);
    };

    const handleSenha = (text) =>{
        setSenha(text);
    };

    const handleGrupo = (text) =>{
        setGrupo(text);
    };

    const handleSubmit = async () => {
        try {
            //Recuperar o token armazenado localmente
            const token = await AsyncStorage.getItem('token');
            console.log("token no Criar:", token)

            //Enviar os dados para a lista de API com autenticação
            const resposta = await axios.post('http://ec2-3-88-108-42.compute-1.amazonaws.com:8081/product', {
                name:name,
                email:email,
                senha:senha,
                grupo:grupo
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
        <View style={styles.box}>
            <Text style={styles.Text}>Serviço: </Text>
            <TextInput
                style={styles.TextBox}
                placeholder="Ex: Steam, Facebook..."
                value={name}
                onChangeText={handleName}
            />

            <Text style={styles.Text}>Usuário ou E-mail:</Text>
            <TextInput
                style={styles.TextBox}
                value={email}
                onChangeText={handleEmail}
            />
            
            <Text style={styles.Text}>Senha: </Text>
            <TextInput
                style={styles.TextBox}
                value={senha}
                onChangeText={handleSenha}
            />

            <Text style={styles.Text}>Grupo: </Text>
            <TextInput
                style={styles.TextBoxBottom}
                value={grupo}
                onChangeText={handleGrupo}
            />
            <Button 
                style={styles.Button}
                title="Enviar" 
                onPress={handleSubmit}/>
        </View>
    );

};

const styles = StyleSheet.create({

    box: {
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        margin:2,
      },
      TextBox: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        padding: 3,
      },
    Text:{
        fontWeight:"bold"
    },
    TextBoxBottom:{
        fontWeight:"bold",
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
        padding: 3,
        marginBottom: 10,

    },
    Button:{
        padding: 10,
    },
});
