import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as Animatable from 'react-native-animatable';

import {useNavigation} from "@react-navigation/native";

export default function Welcome() {
    const navigation = useNavigation();
 return (
    <View style={styles.container}>
         <View style={styles.containerLogo}>
             <Animatable.Image
                 animation="flipInY"
                 source={require('../../../assets/pingu.jpeg')}
                // source={require('../../../assets/logo.png')}
                 style={{width: "80%" ,
                         marginTop: "-9%",}}
                 resizeMode="contain"
             />
         </View>

    <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Proteja suas senhas com segurança e simplicidade!</Text>
        <Text style={styles.text}>Faça o login para começar</Text>

        <TouchableOpacity style={styles.button}
                          onPress={ () => navigation.navigate('SignIn')}
        >
            <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
    </Animatable.View>

    </View>
 );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff" ,
    },

    containerLogo:{
        flex:2,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
    },

    containerForm:{
        flex:1,
        backgroundColor: "#c40d0d",
        borderTopLeftRadius: 25,
        borderTopRightRadius:25,
        paddingStart:"5%",
        paddingEnd:"5%"
    },

    title:{
        color: "#ffffff",
        fontSize:24,
        fontWeight: "bold",
        marginTop: 28,
        marginBottom:12
    },

    text:{
        color: "#ffffff"
    },

    button:{
        position:'absolute',
        backgroundColor:'#ffffff',
        borderRadius:50,
        paddingVertical:8,
        width: '60%',
        alignSelf:'center',
        bottom:'15%',
        alignItems:'center',
        justifyContent:'center',
    },

    buttomText:{
        fontSize: 18,
        color:"#fff",
        fontWeight:'bold',

    },

})