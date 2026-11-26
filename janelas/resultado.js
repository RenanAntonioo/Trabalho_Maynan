import React,{useEffect,useState} from 'react';
import {salvarResultado} from '../historico';
import {Text,View,TouchableOpacity,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import perguntas from '../perguntas';
import s,{cores} from '../css/estilo';
export default function Resultado({navigation,route}){
 const {pontuacao=0,respostas=[],nome,id}=route.params||{};
 const [status,setStatus]=useState('Salvando resultado...');
 const [tentativa,setTentativa]=useState(0);
 useEffect(()=>{try {salvarResultado({id,nome,pontuacao});setStatus('Resultado salvo no aparelho.');}catch(e){setStatus('Não foi possível salvar.');}},[id,nome,pontuacao,tentativa]);
 const titulo=pontuacao===10?'Mestre do cinema!':pontuacao>=7?'Cinéfilo de carteirinha':pontuacao>=4?'Estrela em ascensão':'Hora de uma maratona!';
 return <SafeAreaView style={s.container}><ScrollView contentContainerStyle={s.conteudo}><Text style={s.marca}>CRÉDITOS FINAIS</Text><View style={[s.painel,s.centro]}><FontAwesome name="trophy" size={60} color={cores.ouro}/><Text style={[s.titulo,{marginTop:16}]}>{pontuacao}/10</Text><Text style={[s.etiqueta,{marginVertical:8}]}>{pontuacao*10}% DE ACERTOS</Text><Text style={[s.pergunta,{textAlign:'center'}]}>{titulo}</Text><Text style={[s.subtitulo,{textAlign:'center'}]}>{nome}, você acertou {pontuacao} de 10 perguntas.</Text><View style={[s.trilho,{width:'100%'}]}><View style={[s.progresso,{width:`${pontuacao*10}%`}]}/></View></View>
 <Text style={[s.pequeno,{marginBottom:12}]}>{status}</Text>
 {status==='Não foi possível salvar.'&&<TouchableOpacity style={s.secundario} onPress={()=>setTentativa(t=>t+1)}><Text style={s.link}>Tentar salvar novamente</Text></TouchableOpacity>}
 <TouchableOpacity style={s.botao} onPress={()=>navigation.reset({index:0,routes:[{name:'Jogador'}]})}><Text style={s.botaoTexto}>Jogar novamente</Text><FontAwesome name="repeat" size={16} color="#59091B"/></TouchableOpacity>
 <TouchableOpacity style={s.secundario} onPress={()=>navigation.reset({index:0,routes:[{name:'Home'}]})}><Text style={s.link}>Voltar ao início</Text></TouchableOpacity>
 <TouchableOpacity style={s.secundario} onPress={()=>navigation.navigate('Ranking')}><Text style={s.link}>Ver ranking</Text></TouchableOpacity>
 <Text style={[s.etiqueta,{marginVertical:16}]}>GABARITO DA SESSÃO</Text>{perguntas.map((p,i)=><View key={i} style={[s.opcao,{padding:15}]}><View style={s.linha}><Text style={[s.pequeno,{flex:1}]}>{i+1}. {p.pergunta}</Text><FontAwesome name={respostas[i]===p.correta?'check-circle':'times-circle'} color={respostas[i]===p.correta?cores.verde:cores.vermelho} size={20}/></View><Text style={{color:cores.texto,marginTop:8}}>Correta: {p.opcoes[p.correta]}</Text>{respostas[i]!==p.correta&&<Text style={[s.pequeno,{marginTop:4}]}>Sua resposta: {p.opcoes[respostas[i]]||'Não respondida'}</Text>}</View>)}
 </ScrollView></SafeAreaView>;
}
