import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import RegistrarUser from "../pages/RegistrarUser";
import Menu from '../pages/Menu';
import RegistrarConta from '../pages/RegistrarConta';
import DetalhesDaConta from "../pages/DetalhesContas";
import DetalheServico from "../pages/DetalheServico";
import CriarItem from "../pages/CriarItem";
import AtualizarServico from "../pages/AtualizarServico";
import RecuperarSenha from "../pages/RecuperarConta";

const Stack =  createNativeStackNavigator();

export default function Routes(){
    return(
       <Stack.Navigator >
           <Stack.Screen
               name="Welcome"
               component={Welcome}
               options={{ headerShown: false }}
           />

           <Stack.Screen
               name="SignIn"
               component={SignIn}
               options={{ headerShown: false }}
           />

           <Stack.Screen
               name="RegistrarUser"
               component={RegistrarUser}
               options={{ headerShown: false }}
           />
           
           <Stack.Screen
               name="Menu"
               component={Menu}
               options={{ headerShown: false }}
           />

            <Stack.Screen
               name="RegistrarConta"
               component={RegistrarConta}
               options={{ headerShown: false }}
           />

            <Stack.Screen
               name="DetalhesDaConta"
               component={DetalhesDaConta}
               options={{ headerShown: false }}
           />

            <Stack.Screen
               name="DetalheServico"
               component={DetalheServico}
               options={{ headerShown: false }}
           />

            <Stack.Screen
               name="CriarItem"
               component={CriarItem}
               options={{ headerShown: false }}
           />

            <Stack.Screen
               name="AtualizarServico"
               component={AtualizarServico}
               options={{ headerShown: false }}
           />

            <Stack.Screen
                name="RecuperarConta"
                component={RecuperarSenha}
                options={{ headerShown: false }}
            />

            

       </Stack.Navigator>
    );
}

