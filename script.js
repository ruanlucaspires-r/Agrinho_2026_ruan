// Array de objetos contendo os dados do Quiz
const dadosQuiz = [
    {
        pergunta: "1. Qual é a principal fonte de sustentação da aldeia indígena Kaingang em Cândido de Abreu?",
        opcoes: ["Agricultura de grande escala", "Artesanato produzido pelas mulheres", "Extração de madeira", "Pesca comercial"],
        correta: 1 // O índice 1 corresponde a "Artesanato..." (Arrays começam em 0)
    },
    {
        pergunta: "2. Qual é a base (matéria-prima) utilizada para o trançado no artesanato Kaingang?",
        opcoes: ["Argila cozida", "Fibras de palmeira", "Taquara, um bambu nativo", "Cipó comum"],
        correta: 2
    },
    {
        pergunta: "3. Por que motivo a taquara é considerada ideal para este artesanato?",
        opcoes: ["Devido à sua alta flexibilidade e resistência", "Porque já possui uma cor avermelhada natural", "Porque é a única planta disponível", "Porque quebra facilmente"],
        correta: 0
    },
    {
        pergunta: "4. Qual é a cor que a tintura do jenipapo adquire ao entrar em contato com o ar e a pele?",
        opcoes: ["Vermelho vibrante", "Verde escuro", "Negro-azulado intenso", "Amarelo claro"],
        correta: 2
    },
    {
        pergunta: "5. O que simboliza a cor vermelha extraída do urucum para os povos indígenas?",
        opcoes: ["A passagem do tempo", "A vida, a força e o vigor", "A tranquilidade", "O frescor da água"],
        correta: 1
    },
    {
        pergunta: "6. Além de afastar energias ruins, qual é a utilidade física da pintura corporal com urucum?",
        opcoes: ["Funciona como protetor solar natural e repelente", "Ajuda a baixar a temperatura", "É usada como alimento", "Substitui a água no artesanato"],
        correta: 0
    }
];

// Função que "desenha" o quiz na tela
function carregarQuiz() {
    const container = document.getElementById("quiz-perguntas");
    if (!container) return; // Trava de segurança
    container.innerHTML = ""; // Limpa antes de carregar

    dadosQuiz.forEach((item, indexPergunta) => {
        // Cria a div que envolve a pergunta inteira
        const bloco = document.createElement("div");
        bloco.classList.add("pergunta-bloco");
        
        // Título da pergunta
        const titulo = document.createElement("h3");
        titulo.classList.add("pergunta-titulo");
        titulo.innerText = item.pergunta;
        bloco.appendChild(titulo);

        // Container para as opções (A, B, C, D)
        const containerOpcoes = document.createElement("div");
        containerOpcoes.classList.add("opcoes-container");
        containerOpcoes.id = `opcoes-p${indexPergunta}`;

        item.opcoes.forEach((opcaoTexto, indexOpcao) => {
            // 1. Cria o input radio (invisível)
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `pergunta${indexPergunta}`;
            input.value = indexOpcao;
            input.id = `input-p${indexPergunta}-o${indexOpcao}`; // ID essencial

            // 2. Cria a label (o cartão visível)
            const label = document.createElement("label");
            label.classList.add("opcao-label");
            label.id = `label-p${indexPergunta}-o${indexOpcao}`;
            label.setAttribute("for", input.id); // LIGA A LABEL AO INPUT PARA O CLIQUE FUNCIONAR
            label.innerText = opcaoTexto;

            // 3. Insere ambos no container como irmãos (input primeiro, label depois)
            containerOpcoes.appendChild(input);
            containerOpcoes.appendChild(label);
        });

        bloco.appendChild(containerOpcoes);
        container.appendChild(bloco);
    });
}

// Aguarda o HTML carregar completamente ANTES de tentar desenhar o quiz
document.addEventListener("DOMContentLoaded", function() {
    carregarQuiz();
});

// Função que valida e corrige o quiz
function verificarRespostas() {
    const totalPerguntas = dadosQuiz.length;
    let acertos = 0;
    let respondidas = 0;

    // Remove mensagem de erro caso exista
    document.getElementById("mensagem-erro").classList.remove("erro-visivel");

    // Valida se todas foram respondidas
    dadosQuiz.forEach((item, index) => {
        const selecionada = document.querySelector(`input[name="pergunta${index}"]:checked`);
        if (selecionada) respondidas++;
    });

    if (respondidas < totalPerguntas) {
        document.getElementById("mensagem-erro").classList.add("erro-visivel");
        return; // Interrompe a função se faltar respostas
    }

    // Se chegou aqui, todas foram respondidas. Vamos corrigir!
    dadosQuiz.forEach((item, index) => {
        const inputSelecionado = document.querySelector(`input[name="pergunta${index}"]:checked`);
        const valorSelecionado = parseInt(inputSelecionado.value);

        // Pega as labels para pintar de verde ou vermelho
        const labelSelecionada = document.getElementById(`label-p${index}-o${valorSelecionado}`);
        const labelCorreta = document.getElementById(`label-p${index}-o${item.correta}`);

        if (valorSelecionado === item.correta) {
            acertos++;
            labelSelecionada.classList.add("opcao-correta");
        } else {
            labelSelecionada.classList.add("opcao-incorreta");
            labelCorreta.classList.add("opcao-correta"); // Mostra qual era a certa
        }
    });

    // Desativa a possibilidade de trocar a resposta
    document.getElementById("quiz-perguntas").classList.add("quiz-finalizado");
    
    // Esconde o botão de resultado e mostra o painel final
    document.getElementById("btn-resultado").style.display = "none";
    
    const painelResultado = document.getElementById("painel-resultado");
    const textoPontuacao = document.getElementById("texto-pontuacao");
    
    textoPontuacao.innerText = `Você acertou ${acertos} de ${totalPerguntas}!`;
    painelResultado.classList.remove("resultado-oculto");
}

// Função para reiniciar o quiz
function reiniciarQuiz() {
    document.getElementById("quiz-perguntas").classList.remove("quiz-finalizado");
    document.getElementById("btn-resultado").style.display = "block";
    document.getElementById("painel-resultado").classList.add("resultado-oculto");
    
    // Recarrega o HTML do quiz do zero
    carregarQuiz();
}