const CHAVE = 'tamar-resultados';
export function lerResultados() {
  const texto = localStorage.getItem(CHAVE);
  if (!texto) return [];
  const dados = JSON.parse(texto);
  if (!Array.isArray(dados)) throw new Error('Histórico inválido');
  return dados;
}
export function salvarResultado({id, nome, pontuacao}) {
  if (!id || !nome || !Number.isInteger(pontuacao) || pontuacao < 0 || pontuacao > 10) throw new Error('Resultado inválido');
  const dados = lerResultados();
  if (dados.some(item => item.id === id)) return;
  localStorage.setItem(CHAVE, JSON.stringify([...dados, {id, nome, pontuacao, data: new Date().toISOString()}]));
}
