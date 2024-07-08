// Projeto: Jogo do Número Secreto
// Autor: Fellipe Goulart Gomes

// Variáveis globais
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let contadorChutes = 0; // Variável global para contar os chutes
let tentativaTexto = "";

// Função para exibir mensagens na tela e usar a API ResponsiveVoice
function exibeTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

// Função para exibir mensagens com áudio
function exibeMensagemComAudio(mensagem) {
    exibeTextoNaTela('#mensagem', mensagem);
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Male', {rate: 1.2});
}

// Inicializa os textos na tela
exibeTextoNaTela('#titulo-principal', 'Jogo do número secreto.');
exibeTextoNaTela('#descricao', 'Escolha um número entre 1 e 10.');

// Função para verificar o chute do usuário
function verificarChute() {
    console.log("Botão Chutar clicado!");
    let chute = Number(document.querySelector('#inputNumero').value); // Obtém e converte o valor do input para número
    contadorChutes++; // Incrementa o contador de chutes
    exibeTextoNaTela('#subtitulo', `Tentativas: ${contadorChutes}`);
    
    if (chute === numeroSecreto) {
        tentativaTexto = contadorChutes < 2 ? "tentativa" : "tentativas";
        document.querySelector('#reiniciar').disabled = false; // Habilita o botão "Novo jogo"
        exibeTextoNaTela('#titulo-principal', `Parabéns...`);
        exibeMensagemComAudio(`Você acertou com ${contadorChutes} ${tentativaTexto}!`);
    } else {
        if (numeroSecreto < chute) {
            exibeTextoNaTela('#titulo-principal', `Quase lá...`);
            exibeMensagemComAudio(`O número secreto é menor que ${chute}!`);
        } else {
            exibeTextoNaTela('#titulo-principal', `Tente novamente...`);
            exibeMensagemComAudio(`O número secreto é maior que ${chute}!`);
        }
        limparCampo();
    }
}

// Função para gerar um número aleatório entre 1 e 10 sem repetição até que todos os números sejam sorteados
function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Função para limpar o campo de entrada
function limparCampo() {
    document.querySelector('#inputNumero').value = ''; // Limpa o campo de input
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    contadorChutes = 0; // Zera o contador de chutes
    document.querySelector('#reiniciar').disabled = true; // Desabilita o botão "Novo jogo"
    limparCampo();
    exibeTextoNaTela('#subtitulo', '');
    exibeTextoNaTela('#titulo-principal', 'Jogo do número secreto.');
    exibeTextoNaTela('#descricao', 'Escolha um número entre 1 e 10.');
    exibeTextoNaTela('#mensagem', ''); // Limpa a mensagem anterior
}

console.log(`O número aleatório é: ${numeroSecreto}`);
