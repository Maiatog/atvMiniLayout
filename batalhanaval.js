//biblioteca para entrada de dados
const prompt = require ('prompt-sync')();

//--- 1. Configuração do Tabuleiro ---
//Define o tamanho do tabuleiro
const tamanho = 5;
//cria o tabuleiro e preenche as posições com 'false', representando a água.
let tabuleiro = Array.from({ length: tamanho }, () => Array(tamanho).fill(false));

// --- 2. Configuração do Jogo ---
//Define quantos navios serão posicionados
let totalNavios = 3;
//contador de navios restantes
let naviosRestantes = totalNavios;

// --- 3. Função para posicionar os Navios ---
//Posiciona os navios aleatoriamente no tabuleiro
function posicionarNavios(tabuleiro) {
    let naviosColocados = 0;

    while (naviosColocados < totalNavios) {
        //Gera a linha e coluna para as coordenadas do navio
        let linha = Math.floor(Math.random() * tamanho);
        let coluna = Math.floor(Math.random() * tamanho);

        //Verifica se a posição está vazia (água), se não estiver, posiciona o navio
        if (!tabuleiro[linha][coluna]) {
            tabuleiro[linha][coluna] = true;
            naviosColocados++;
        }
    }
}

posicionarNavios(tabuleiro);

//--- 4. Loop principal do jogo. ---
//Define o número de tiros que o jogador tem
let tirosRestantes = 10;

//matriz usada para registar os tiros do jogador
let historicoTiros = Array.from({length: tamanho}, () => Array(tamanho).fill(' ~ '));
console.log("=====================");
console.log("=== BATALHA NAVAL ===");
console.log("=====================");
console.log("Você tem 10 tiros para afundar os 3 návios escondidos!\n");

//o loop continua enquanto houver tiros e navios restantes
while (tirosRestantes > 0 && naviosRestantes > 0) {
    //mostra o status do jogo
    console.log(`\nTiros restantes ⏺︎ : ${tirosRestantes}`);
    console.log(`Navios restantes ⛴︎ : ${naviosRestantes}`);

    //exibe o histórico de tiros no tabuleiro
    console.log("\nHistórico de tiros:");
    console.log("   1  2  3  4  5");//numeração das colunas
    console.log("   -------------");//divisória
    for (let i = 0; i < tamanho; i++) {
        const linha = historicoTiros[i];
        console.log(`${i + 1}|${linha.join('')}`); //numeração das linhas
    }

    let linhaInput = prompt("Digite a linha (1 a 5) ou 'q' para encerrar: ");

    if (linhaInput.toLowerCase() === 'q') {
        console.log("Saindo do jogo. Até a próxima!");
        process.exit();
    }

    let linha = parseInt(linhaInput) - 1;
    let coluna = parseInt(prompt("Digite a coluna (1 a 5):")) - 1;


    //verifica se o valor é correto
    if(
        isNaN(linha) || isNaN(coluna) ||
        linha < 0 || linha >= tamanho ||
        coluna < 0 || coluna >= tamanho
    ) {
        console.log("Coordenadas inválidas. Tente novamamente.");
        continue; //não gasta o tiro
    }
    //verifica se já atirou nessa posição
    if (historicoTiros[linha][coluna] !== ' ~ ') {
        console.log("Você já atirou nessa posição. Escolhe outra.");
        continue; //não gasta o tiro
    }
    //jogada válida
    tirosRestantes--;
    if (tabuleiro[linha][coluna] === true) {
        console.log("Acertou um navio!");
        historicoTiros[linha][coluna] = ' ☠︎ '; //X para acerto
        tabuleiro[linha][coluna] = false; //remove o navio
        naviosRestantes--;
    } else {
        console.log("Tiro na água!");
        historicoTiros[linha][coluna] = ' ⏺︎ '; //O para tiro na água
    }
}

//fim de jogo
if (naviosRestantes === 0) {
    console.log("\nParabéns! Você afundou todos os navios!")
} else {
    console.log("\nFim de jogo! seus tiros acabaram.");
    console.log("Os navios que restaram estavam nas posições:");
    for (let i = 0; i < tamanho; i++) {
        for (let j = 0; j < tamanho; j++) {
            if (tabuleiro[i][j] === true) {
                console.log(` - Linha:${i + 1}, Coluna:${j + 1}`);
            }
        }
    }
}