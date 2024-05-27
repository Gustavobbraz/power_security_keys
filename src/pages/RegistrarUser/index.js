import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegistrarUser() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("USER");

  const handleRegister = () => {
    // Verificar se a senha e a confirmação de senha são iguais
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    // Enviar os dados para a API
    axios.post("http://192.168.0.35:8081/auth/register", {
      nome: nome,
      login: login,
      password: password,
      role: role
    })
    .then((response) => {
      // Tratar a resposta da API
      console.log(response.data);
      // Navegar para a próxima tela
      navigation.navigate('SignIn');
    })
    .catch((error) => {
      // Tratar erros
      console.error("Erro ao registrar usuário:", error);
      // Exibir uma mensagem de erro
      alert("Erro ao registrar usuário. Por favor, tente novamente mais tarde.");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a) à tela de registro</Text>
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder="Digite seu nome"
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="Digite seu login"
          style={styles.input}
          value={login}
          onChangeText={setLogin}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.title}>Confirmar Senha</Text>
        <TextInput
          placeholder="Digite sua senha novamente"
          style={styles.input}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.registerText}>
            Já tem uma conta? Clique aqui para fazer o login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c40d0d",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#fcfcfc",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 12,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
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
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});
