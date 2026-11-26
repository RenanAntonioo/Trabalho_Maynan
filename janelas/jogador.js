import React,{useState,useRef} from 'react';
import {View,Text,TextInput,TouchableOpacity,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import s,{cores} from '../css/estilo';
export default function Jogador({navigation}){
 const [nome,setNome]=useState('');
 const iniciou=useRef(false);
 function iniciar(){if(!nome.trim()||iniciou.current)return; iniciou.current=true;navigation.reset({index:0,routes:[{name:'P1',params:{nome:nome.trim(),id:Date.now().toString(36)+'-'+Math.random().toString(36).slice(2),pontuacao:0,respostas:[]}}]});}
 return <SafeAreaView style={s.container}><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.conteudo}>
 <Text style={s.marca}>TAMAR FIMES / QUIZ</Text><View style={s.painel}><FontAwesome name="ticket" size={52} color={cores.ouro}/><Text style={[s.titulo,{fontSize:34,marginTop:18}]}>Seu ingresso</Text><Text style={s.subtitulo}>Informe seu nome para registrar sua pontuação ao final da sessão.</Text>
 <Text style={[s.etiqueta,{marginBottom:10}]}>NOME DO JOGADOR</Text><TextInput accessibilityLabel="Nome do jogador" value={nome} onChangeText={setNome} placeholder="Digite seu nome" placeholderTextColor="#865663" maxLength={50} autoCapitalize="words" returnKeyType="go" onSubmitEditing={iniciar} style={{backgroundColor:cores.ouro,color:cores.fundo,borderRadius:12,padding:16,fontSize:17}}/></View>
 <TouchableOpacity disabled={!nome.trim()} style={[s.botao,!nome.trim()&&s.desativado]} onPress={iniciar}><Text style={s.botaoTexto}>Iniciar sessão</Text><FontAwesome name="play" color={cores.fundo} size={15}/></TouchableOpacity><TouchableOpacity style={s.secundario} onPress={()=>navigation.reset({index:0,routes:[{name:'Home'}]})}><Text style={s.link}>Voltar ao início</Text></TouchableOpacity>
 </ScrollView></SafeAreaView>;
}
