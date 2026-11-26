import React,{useState,useRef} from 'react';
import {Text,View,TouchableOpacity,ScrollView,BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RadioButton} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import perguntas from '../perguntas';
import s,{cores} from '../css/estilo';
export default function Pergunta({navigation,route}){
 const indice=Number(route.name.slice(1))-1;
 const item=perguntas[indice];
 const {pontuacao=0,respostas=[],nome,id}=route.params||{};
 const [selecionada,setSelecionada]=useState(null);
 const bloqueio=useRef(false), avancou=useRef(false);
 const respondido=selecionada!==null;
 const acertou=selecionada===item.correta;
 const total=pontuacao+(acertou?1:0);
 useFocusEffect(React.useCallback(()=>{const sub=BackHandler.addEventListener('hardwareBackPress',()=>true);return ()=>sub.remove();},[]));
 function VerificarResposta(value){if(bloqueio.current)return;bloqueio.current=true;setSelecionada(Number(value));}
 function avancar(){if(!respondido||avancou.current)return;avancou.current=true;navigation.replace(indice===perguntas.length-1?'Resultado':'P'+(indice+2),{nome,id,pontuacao:total,respostas:[...respostas,selecionada]});}
 return <SafeAreaView style={s.container}><ScrollView contentContainerStyle={[s.conteudo,{justifyContent:'flex-start'}]}>
 <View style={s.topo}><Text style={s.marca}>TAMAR FIMES</Text><Text style={s.etiqueta}>{total} PTS</Text></View>
 <View style={[s.linha,{marginBottom:10}]}><Text style={s.pequeno}>QUESTÃO {String(indice+1).padStart(2,'0')} / 10</Text><Text style={s.pequeno}>{(indice+1)*10}%</Text></View>
 <View style={s.trilho}><View style={[s.progresso,{width:`${(indice+1)*10}%`}]}/></View>
 <View style={s.painel}><View style={s.linha}><Text style={s.etiqueta}>{item.categoria}</Text><FontAwesome name={item.icone} size={25} color={cores.ouro}/></View><Text style={s.pergunta}>{item.pergunta}</Text></View>
 <RadioButton.Group value={respondido?String(selecionada):''} onValueChange={VerificarResposta}>
 {item.opcoes.map((opcao,i)=><View key={i} style={[s.opcao,respondido&&i===item.correta&&s.certo,respondido&&i===selecionada&&!acertou&&s.errado]}><RadioButton.Item label={`${String.fromCharCode(65+i)}.  ${opcao}`} value={String(i)} position="leading" disabled={respondido} color={cores.ouro} uncheckedColor={cores.suave} labelStyle={{color:cores.texto,fontSize:15,textAlign:'left'}} style={{minHeight:58}}/></View>)}
 </RadioButton.Group>
 {respondido&&<View style={s.feedback} accessibilityLiveRegion="polite"><Text style={{color:acertou?cores.verde:cores.vermelho,fontWeight:'800',fontSize:16}}>{acertou?'Resposta correta!':'Não foi dessa vez!'}</Text><Text style={[s.pequeno,{marginTop:7,lineHeight:20}]}>{!acertou?`Resposta: ${item.opcoes[item.correta]}.\n`:''}{item.curiosidade}</Text></View>}
 <TouchableOpacity disabled={!respondido} style={[s.botao,!respondido&&s.desativado,{marginTop:12}]} onPress={avancar}><Text style={s.botaoTexto}>{indice===9?'Ver resultado':'Próxima pergunta'}</Text><FontAwesome name="arrow-right" color="#59091B" size={16}/></TouchableOpacity>
 <TouchableOpacity style={s.secundario} onPress={()=>navigation.reset({index:0,routes:[{name:'Home'}]})}><Text style={s.link}>Sair do quiz</Text></TouchableOpacity>
 </ScrollView></SafeAreaView>;
}
