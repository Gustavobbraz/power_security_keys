import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";

export default function RecuperarSenha() {
  const navigation = useNavigation();
  const [login, setLogin] = useState("");

  const handlePasswordRecovery = async () => {
    try {
      const response = await axios.post("https://www.authpsk-api.shop/auth/recuperar-senha", {
        login: login,
      });

      if (response.status === 200) {
        Alert.alert("Verifique seu E-mail", "Recuperaçao de senha enviado ao seu email com sucesso.");
      } else {
        Alert.alert("Desculpe", "ocorreu um problema ao enviar recuperaçao de email. por favor tente mais tarde!");
      }
    } catch (error) {
      Alert.alert("Email Invalido ", "Falha em recuperar a senha verifique o email informado.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a) à tela de recuperação de senha</Text>
      </View>
      <View style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          style={styles.input}
          value={login}
          onChangeText={setLogin}
        />

        <TouchableOpacity style={styles.button} onPress={handlePasswordRecovery}>
          <Text style={styles.buttonText}>Recuperar Senha</Text>
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