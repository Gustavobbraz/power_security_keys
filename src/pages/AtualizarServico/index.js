import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { Alert, Text, TextInput, View, Button, StyleSheet,TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const AtualizarServico = ({ route }) => {
  const navigation = useNavigation();
  // Receber os parâmetros passados
  const { item } = route.params;

  //State para armazenar os dados atualizados
  const [updatedData, setUpdatedData] = useState({
    name: item.name,
    email: item.email,
    senha: item.senha,
    grupo: item.grupo
  });

  //Função para atualizar os dados na API
  const atualizarDados = async () => {
    try {
      //Obtendo o token armazenado localmente
      const token = await AsyncStorage.getItem('token');

      console.log("ID do item:", item.id);
      //Fazendo uma solicitação à API para atualizar os dados
      const resposta = await axios.put(`https://www.authpsk-api.shop/product/${item.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      //Exibindo mensagem de sucesso 
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.navigate('DetalhesDaConta');
    } catch (error) {
      //Em caso de erro exibe uma mensagem de erro
      console.error('Erro ao atualizar dados:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar os dados. Por favor, tente novamente.');
    }
  };
  return (
    <View style={styles.box}>
      <Text style={styles.Text}>Detalhes do Item:</Text>
      <Text style={styles.Text}>Serviço: </Text>
      <TextInput
        style={styles.TextBox}
        value={updatedData.name}
        onChangeText={text => setUpdatedData({ ...updatedData, name: text })}
        placeholder="Nome"
      />
      <Text style={styles.Text}>Usuário ou E-mail:</Text>
      <TextInput
        style={styles.TextBox}
        value={updatedData.email}
        onChangeText={text => setUpdatedData({ ...updatedData, email: text })}
        placeholder="Email"
      />
      <Text style={styles.Text}>Senha: </Text>
      <TextInput
        style={styles.TextBox}
        value={updatedData.senha}
        onChangeText={text => setUpdatedData({ ...updatedData, senha: text })}
        placeholder="Senha"
      />
      <Text style={styles.Text}>Grupo: </Text>
      <TextInput
        style={styles.TextBoxBottom}
        value={updatedData.grupo}
        onChangeText={text => setUpdatedData({ ...updatedData, grupo: text })}
        placeholder="Grupo"
      />
      <TouchableOpacity style={styles.button} onPress={atualizarDados}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      
    </View>
  );
};

export default AtualizarServico;

const styles = StyleSheet.create({
  box: {
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    margin:2,
  },
  TextBox: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom:12,
    fontSize:19,
  },
Text:{
    fontSize:20,
    marginTop:12,
    fontWeight:'bold',
},
TextBoxBottom:{
    borderBottomWidth: 1,
    height: 40,
    marginBottom:12,
    fontSize:20,
},
button: {
  backgroundColor: "#c40d0d",
  width: "100%",
  borderRadius: 4,
  paddingVertical: 8,
  marginTop: 14,
  justifyContent: "center",
  alignItems: "center",
},
buttonText: {
  color: "#fff",
  fontSize: 18,
  fontWeight: "bold",
},

});
