import { File, Paths } from 'expo-file-system';
const arquivo = () => new File(Paths.document, 'tamar-resultados.json');
export function lerResultados(){
 const file=arquivo();
 if(!file.exists)return [];
 const dados=JSON.parse(file.textSync());
 if(!Array.isArray(dados))throw new Error('Histórico inválido');
 return dados;
}
export function salvarResultado({id,nome,pontuacao}){
 if(!id||!nome||!Number.isInteger(pontuacao)||pontuacao<0||pontuacao>10)throw new Error('Resultado inválido');
 const dados=lerResultados();
 if(dados.some(item=>item.id===id))return;
 const file=arquivo();
 if(!file.exists)file.create();
 file.write(JSON.stringify([...dados,{id,nome,pontuacao,data:new Date().toISOString()}]));
}
