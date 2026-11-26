import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Home from './janelas/home';
import Pergunta from './janelas/pergunta';
import Resultado from './janelas/resultado';
import Jogador from './janelas/jogador';
import Ranking from './janelas/ranking';
import perguntas from './perguntas';
const Stack = createNativeStackNavigator();
export default function App() {
 return <SafeAreaProvider><PaperProvider theme={MD3DarkTheme}><NavigationContainer><StatusBar style="light"/><Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false,gestureEnabled:false,animation:'fade',contentStyle:{backgroundColor:'#59091B'}}}>
 <Stack.Screen name="Home" component={Home}/>
 <Stack.Screen name="Jogador" component={Jogador}/>
 <Stack.Screen name="Ranking" component={Ranking}/>
 {perguntas.map((_,i)=><Stack.Screen key={i} name={'P'+(i+1)} component={Pergunta}/>)}
 <Stack.Screen name="Resultado" component={Resultado}/>
 </Stack.Navigator></NavigationContainer></PaperProvider></SafeAreaProvider>;
}
