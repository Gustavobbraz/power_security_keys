import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';

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
  
      const resposta = await axios.get('http://192.168.0.35:8081/product', {
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
  
      await axios.delete(`http://192.168.0.35:8081/product/${id}`, {
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
      <Text style={styles.itemText}>Nome: {item.name}</Text>
      <Text style={styles.itemText}>Email: {item.email}</Text>
      <Text style={styles.itemText}>Senha: {item.senha}</Text>
      <Text style={styles.itemText}>Grupo: {item.grupo}</Text>

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
      <Text style={styles.welcomeText}>Bem-vindo(a): {nomeUsuario}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <FlatList
        data={Object.keys(groupedItems)}
        renderItem={({ item }) => (
          <View style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{item}</Text>
            <View style={styles.box}>
              <FlatList
                data={groupedItems[item]}
                renderItem={renderItem}
                keyExtractor={subItem => subItem.id.toString()}
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemText: {
    fontSize: 15,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  groupContainer: {
    marginBottom: 20,
  },
  groupTitle: {
    marginTop: 20,
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
  button: {
    position: 'absolute',
    top: 25, // Distância do topo da tela
    right: 20, // Distância da direita da tela
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default DetalhesDaConta;
