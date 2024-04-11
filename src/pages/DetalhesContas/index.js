// Importe as bibliotecas necessárias
import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componente de tela para exibir os detalhes da conta
const DetalhesDaConta = () => {
  // Defina um estado para armazenar os detalhes da conta
  const [detalhesDaConta, setDetalhesDaConta] = useState([]);
  const navigation = useNavigation();

  // Função para buscar os detalhes da conta da API
  const buscarDetalhesDaConta = async () => {
    try {
      // Obtenha o token armazenado localmente
      const token = await AsyncStorage.getItem('token');
      
      // Verifique se o token está sendo recebido corretamente
      console.log('Token recebido em DetalhesDaConta:', token);
  
      // Faça uma solicitação à API usando o token
      const resposta = await axios.get('http://192.168.0.38:8080/product', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Atualize o estado com os detalhes da conta recebidos da API
      setDetalhesDaConta(resposta.data);
    } catch (erro) {
      console.error('Erro ao buscar detalhes da conta:', erro);
    }
  };

  // Use useEffect para buscar os detalhes da conta quando o componente for montado
  useEffect(() => {
    buscarDetalhesDaConta();
  }, []); // O segundo argumento [] garante que useEffect seja chamado apenas uma vez


  const handleNavigate = () => {
    // Navegar para outra página quando o botão for clicado
    navigation.navigate('CriarItem');
  };

  // Função para renderizar cada item na FlatList
  const renderItem = ({ item }) => (
    <View>
      <Text>Nome: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Senha: {item.senha}</Text>
    </View>
  );



  return (
    <View>
      <Button title='+' onPress={handleNavigate}/>
      <FlatList
        data={detalhesDaConta}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default DetalhesDaConta;