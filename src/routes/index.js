import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import RegistrarUser from "../pages/RegistrarUser";
import Menu from '../pages/Menu';
import RegistrarConta from '../pages/RegistrarConta';


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

       </Stack.Navigator>
    );
}

