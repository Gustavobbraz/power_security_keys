// Importe as bibliotecas necessárias
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

// Componente de tela para exibir os detalhes da conta
const DetalhesDaConta = () => {
  // Defina um estado para armazenar os detalhes da conta
  const [detalhesDaConta, setDetalhesDaConta] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // Função para buscar os detalhes da conta da API
  const buscarDetalhesDaConta = async () => {
    try {
      // Obtenha o token armazenado localmente
      const token = await AsyncStorage.getItem('token');
      const nome = await AsyncStorage.getItem('nome');
      
      // Verifique se o token está sendo recebido corretamente
      console.log('Token recebido em DetalhesDaConta:', token);
  
      // Faça uma solicitação à API usando o token
      const resposta = await axios.get('http://10.182.6.17:8081/product', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Atualize o estado com os detalhes da conta recebidos da API
      setDetalhesDaConta(resposta.data);
      setNomeUsuario(nome);
    } catch (erro) {
      console.error('Erro ao buscar detalhes da conta:', erro);
    }
  };

  // Use useEffect para buscar os detalhes da conta quando o componente for montado
  useEffect(() => {
    buscarDetalhesDaConta();
  }, [isFocused]); // O segundo argumento [] garante que useEffect seja chamado apenas uma vez


  const handleNavigate = () => {
    // Navegar para outra página quando o botão for clicado
    navigation.navigate('CriarItem');
  };

  const handleExcluirItem = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      await axios.delete(`http://10.182.6.17:8081/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      //Atualiza a lista após a exclusão
      buscarDetalhesDaConta();
    } catch (erro) {
      console.error('Erro ao excluir o item: ', erro);
    }
  };
  

  // Função para renderizar cada item na FlatList
  const renderItem = ({ item }) => (
    <View>
      <Text>Nome: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Senha: {item.senha}</Text>
      <Text>Grupo: {item.grupo}</Text>


      <Button title="Excluir" onPress={() => handleExcluirItem(item.id)} />
    </View>
  );


  return (
    <View>
      <Text>Bem-vindo(a): {nomeUsuario}</Text>
      <Button title='+' onPress={handleNavigate}/>
      <FlatList
        data={detalhesDaConta}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );

};

export default DetalhesDaConta;