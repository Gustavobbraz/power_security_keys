import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import { Alert, Text, TextInput, View, Button } from 'react-native';
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
      const resposta = await axios.put(`http://ec2-3-88-108-42.compute-1.amazonaws.com:8081/product/${item.id}`, updatedData, {
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
    <View>
      <Text>Detalhes do Item:</Text>
      <TextInput
        value={updatedData.name}
        onChangeText={text => setUpdatedData({ ...updatedData, name: text })}
        placeholder="Nome"
      />
      <TextInput
        value={updatedData.email}
        onChangeText={text => setUpdatedData({ ...updatedData, email: text })}
        placeholder="Email"
      />
      <TextInput
        value={updatedData.senha}
        onChangeText={text => setUpdatedData({ ...updatedData, senha: text })}
        placeholder="Senha"
      />
      <TextInput
        value={updatedData.grupo}
        onChangeText={text => setUpdatedData({ ...updatedData, grupo: text })}
        placeholder="Grupo"
      />
      <Button title="Atualizar" onPress={atualizarDados} />
    </View>
  );
};

export default AtualizarServico;
