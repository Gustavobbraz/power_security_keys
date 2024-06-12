import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';

const DetalhesDaConta = () => {
  const [detalhesDaConta, setDetalhesDaConta] = useState([]);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carregamento
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const buscarDetalhesDaConta = useCallback(async () => {
    setLoading(true); // Iniciar carregamento
    try {
      const token = await AsyncStorage.getItem('token');
      const nome = await AsyncStorage.getItem('nome');
      
      console.log('Token recebido em DetalhesDaConta:', token);
  
      const resposta = await axios.get('https://www.authpsk-api.shop/product', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setDetalhesDaConta(resposta.data);
      setNomeUsuario(nome);
    } catch (erro) {
      console.error('Erro ao buscar detalhes da conta:', erro);
    } finally {
      setLoading(false); // Finalizar carregamento
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      buscarDetalhesDaConta();
    }
  }, [isFocused, buscarDetalhesDaConta]);

  const handleNavigate = () => {
    navigation.navigate('CriarItem');
  };

  const handleAtualizarServico = (item) => {
    navigation.navigate('AtualizarServico', { item });
  };

  const handleExcluirItem = async (id) => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      await axios.delete(`https://www.authpsk-api.shop/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      buscarDetalhesDaConta();
    } catch (erro) {
      console.error('Erro ao excluir o item: ', erro);
    }
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>Nome: {item.name}</Text>
      <Text style={styles.itemText}>Email: {item.email}</Text>
      <Text style={styles.itemText}>Senha: {item.senha}</Text>
      <Text style={styles.itemText}>Grupo: {item.grupo}</Text>

      <TouchableOpacity 
        style={styles.touchable} 
        onPress={() => handleAtualizarServico(item)}
      >
        <Text style={styles.touchableText}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.touchable} 
        onPress={() => handleExcluirItem(item.id)}
      >
        <Text style={styles.touchableText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  ), [handleAtualizarServico, handleExcluirItem]);

  // Agrupar itens pelo nome do grupo
  const groupedItems = useMemo(() => {
    return detalhesDaConta.reduce((acc, currentItem) => {
      if (!acc[currentItem.grupo]) {
        acc[currentItem.grupo] = [];
      }
      acc[currentItem.grupo].push(currentItem);
      return acc;
    }, {});
  }, [detalhesDaConta]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo(a): {nomeUsuario}</Text>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemText: {
    fontSize: 19,
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
    right: 30, // Distância da direita da tela
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 4,
    zIndex: 1, // Garantir que o botão esteja acima da lista
  },
  buttonText: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  touchable: {
    backgroundColor: "#c40d0d",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  touchableText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DetalhesDaConta;
