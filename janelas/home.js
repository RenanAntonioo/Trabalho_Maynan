import React from 'react';
import {Text,View,TouchableOpacity,ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import s,{cores} from '../css/estilo';
export default function Home({navigation}){
 return <SafeAreaView style={s.container}><ScrollView contentContainerStyle={s.conteudo}>
 <View style={s.topo}><Text style={s.marca}>TAMAR / FIMES</Text><Text style={s.pequeno}>EDIÇÃO 01</Text></View>
 <View style={s.painel}><View style={s.hero}><FontAwesome name="film" size={86} color={cores.ouro}/><Text style={[s.etiqueta,{marginTop:24}]}>LUZ, CÂMERA, AÇÃO!</Text></View><Text style={s.titulo}>Tamar Fimes</Text><Text style={s.subtitulo}>Dos clássicos aos blockbusters. Descubra o quanto você conhece do universo do cinema.</Text></View>
 <View style={[s.linha,{marginBottom:24}]}>{[['10','Perguntas'],['4','Alternativas'],['10','Pontos']].map(([n,t])=><View key={t}><Text style={s.numero}>{n}</Text><Text style={s.pequeno}>{t}</Text></View>)}</View>
 <TouchableOpacity style={s.botao} onPress={()=>navigation.navigate('Jogador')}><Text style={s.botaoTexto}>Começar quiz</Text><FontAwesome name="play" size={15} color="#59091B"/></TouchableOpacity><TouchableOpacity style={s.secundario} onPress={()=>navigation.navigate('Ranking')}><Text style={s.link}>Ver ranking de jogadores</Text></TouchableOpacity><Text style={s.rodape}>Sem cronômetro. Aproveite cada cena.</Text>
 </ScrollView></SafeAreaView>;
}
