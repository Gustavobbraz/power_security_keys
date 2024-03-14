import * as Animatable from "react-native-animatable";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";



export default function RegistrarUser(){
    const navigation = useNavigation();
    return(
    <View style={(styles.container)}>

        <Animatable.View  animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Bem-vindo(a) a tela de registro</Text>

        </Animatable.View>

        <Animatable.View  animation="fadeInUp"  style={styles.containerForm}>
            <Text style={styles.title}>E-mail</Text>
            <TextInput placeholder="Digite seu E-mail" style={styles.input}/>

            <Text style={styles.title}>Usuario</Text>
            <TextInput placeholder="Digite um nome de usuario" style={styles.input}/>

            <Text style={styles.title}>Senha</Text>
            <TextInput placeholder="Digite sua senha" style={styles.input}/>

            <Text style={styles.title}>Confirmar  Senha</Text>
            <TextInput placeholder="digite sua senha novamente" style={styles.input}/>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}> Registrar </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister}
                              onPress={ () => navigation.navigate('SignIn')}>
                <Text style={styles.registerText}> Ja tem uma conta ? clique aqui para fazer o login </Text>
            </TouchableOpacity>



        </Animatable.View>

    </View>
    )
}

const  styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#c40d0d",

    },

    containerHeader:{
        marginTop:"14%",
        marginBottom:"8%",
        paddingStart:"5%",
    },

    message:{
        fontSize:28,
        fontWeight:"bold",
        color:"#FFF",
    },

    containerForm:{
        backgroundColor:"#fcfcfc",
        flex:1,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        paddingStart:"5%",
        paddingEnd:"5%",

    },

    title:{
        fontSize:20,
        marginTop:12,

    },

    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom:12,
        fontSize:16,

    },

    button:{
        backgroundColor:"#c40d0d",
        width: "100%",
        borderRadius:4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent:"center",
        alignItems:"center",
    },

    buttonText:{
        color:"#fff",
        fontSize:18,
        fontWeight:"bold"
    },

    buttonRegister:{
        marginTop:14,
        alignSelf:"center"
    },

    resgisterText:{
        color:"#a1a1a1"
    },
})
