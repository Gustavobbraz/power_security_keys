import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, StyleSheet } from 'react-native';

const DetalhesDaConta = () => {
  const [detalhesDaConta, setDetalhesDaConta] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const buscarDetalhesDaConta = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const nome = await AsyncStorage.getItem('nome');
      
      console.log('Token recebido em DetalhesDaConta:', token);
  
      const resposta = await axios.get('http://192.168.0.34:8081/product', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setDetalhesDaConta(resposta.data);
      setNomeUsuario(nome);
    } catch (erro) {
      console.error('Erro ao buscar detalhes da conta:', erro);
    }
  };

  useEffect(() => {
    buscarDetalhesDaConta();
  }, [isFocused]);

  const handleNavigate = () => {
    navigation.navigate('CriarItem');
  };

  const handleAtualizarServico = (item, token) => {
    navigation.navigate('AtualizarServico', { item, token });
  };

  const handleExcluirItem = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      await axios.delete(`http://192.168.0.34:8081/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      buscarDetalhesDaConta();
    } catch (erro) {
      console.error('Erro ao excluir o item: ', erro);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Nome: {item.name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Senha: {item.senha}</Text>
      <Text>Grupo: {item.grupo}</Text>

      <Button title="Editar" onPress={() => handleAtualizarServico(item)} />
      <Button title="Excluir" onPress={() => handleExcluirItem(item.id)} />
    </View>
  );

  // Agrupar itens pelo nome do grupo
  const groupedItems = detalhesDaConta.reduce((acc, currentItem) => {
    if (!acc[currentItem.grupo]) {
      acc[currentItem.grupo] = [];
    }
    acc[currentItem.grupo].push(currentItem);
    return acc;
  }, {});

  const renderGroupedItems = () => {
    return Object.keys(groupedItems).map(grupo => (
      <View key={grupo} style={styles.groupContainer}>
        <Text style={styles.groupTitle}>{grupo}</Text>
        <View style={styles.box}>
          <FlatList
            data={groupedItems[grupo]}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text>Bem-vindo(a): {nomeUsuario}</Text>
      <Button title='+' onPress={handleNavigate}/>
      {renderGroupedItems()}
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
  },
  item: {
    marginBottom: 10,
  },
});

export default DetalhesDaConta;
