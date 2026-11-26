import React,{useState,useCallback} from 'react';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {lerResultados} from '../historico';
import s,{cores} from '../css/estilo';
export default function Ranking({navigation}){
 const [dados,setDados]=useState([]),[erro,setErro]=useState(false);
 useFocusEffect(useCallback(()=>{try{setDados(lerResultados().sort((a,b)=>b.pontuacao-a.pontuacao||a.data.localeCompare(b.data)));setErro(false);}catch(e){setErro(true);}},[]));
 return <SafeAreaView style={s.container}><ScrollView contentContainerStyle={[s.conteudo,{justifyContent:'flex-start'}]}><Text style={s.marca}>TAMAR FIMES</Text><View style={s.painel}><FontAwesome name="trophy" size={48} color={cores.ouro}/><Text style={[s.titulo,{fontSize:36,marginTop:12}]}>Ranking</Text><Text style={s.subtitulo}>Os melhores resultados das sessões neste aparelho.</Text></View>
 {erro?<Text style={s.subtitulo}>Não foi possível carregar o histórico.</Text>:dados.length===0?<Text style={s.subtitulo}>Nenhuma partida concluída. Seja o primeiro!</Text>:dados.map((item,i)=><View key={item.id} style={[s.opcao,{padding:16}]}><View style={s.linha}><Text style={[s.etiqueta,{fontSize:18}]}>{String(i+1).padStart(2,'0')}</Text><View style={{flex:1}}><Text style={{color:cores.texto,fontSize:17,fontWeight:'700'}}>{item.nome}</Text><Text style={s.pequeno}>{new Date(item.data).toLocaleDateString('pt-BR')}</Text></View><Text style={[s.numero,{color:cores.ouro}]}>{item.pontuacao}/10</Text></View></View>)}
 <TouchableOpacity style={[s.botao,{marginTop:20}]} onPress={()=>navigation.goBack()}><Text style={s.botaoTexto}>Voltar</Text></TouchableOpacity></ScrollView></SafeAreaView>;
}
