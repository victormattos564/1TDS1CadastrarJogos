// Objeto Game
class Game {
    constructor(titulo, preco, descricao, plataforma, imagem) {
        this.titulo = titulo;
        this.preco = preco;
        this.descricao = descricao;
        this.plataforma = plataforma;
        this.imagem = imagem;
    }
}

// Classe GamesList
class GamesList {
    constructor() {
        this.games = [];
    }

    adicionarJogo(titulo, preco, descricao, plataforma, imagem) {
        if (isAnyInputEmpty()) {
            sendMSG("Preencha todos os campos!", "error");
        } else if (!isURLValida(imagem)) {
            sendMSG("URL da imagem inválida!", "error");
        } else {
            const jogo = new Game(titulo, preco, descricao, plataforma, imagem);
            this.games.push(jogo);
            sendMSG("Jogo adicionado com sucesso!", "success");
            clearInputs();
        }
    }

    excluirJogo(index) {
        this.games.splice(index, 1);
        exibirJogos();
    }

    editarJogo(index) {
        const jogo = this.games[index];
        document.getElementById("titulo").value = jogo.titulo;
        document.getElementById("preco").value = jogo.preco;
        document.getElementById("descricao").value = jogo.descricao;
        document.getElementById("plataforma").value = jogo.plataforma;
        document.getElementById("imagem").value = jogo.imagem;

        // Remove o jogo da lista para ser re-adicionado após a edição
        this.games.splice(index, 1);
        exibirJogos();
    }
}

// Função para exibir jogos
function exibirJogos() {
    const gameList = document.getElementById("gameList");
    gameList.innerHTML = "";

    gamesList.games.forEach((jogo, index) => {
        const cardDiv = `
            <div class="card">
                <img src="${jogo.imagem}" alt="${jogo.titulo}">
                <h2>${jogo.titulo}</h2>
                <p>Preço: R$${jogo.preco}</p>
                <p>Descrição: ${jogo.descricao}</p>
                <p>Plataforma: ${jogo.plataforma}</p>
                <button class="button" onclick="gamesList.editarJogo(${index})">Editar</button>
                <button class="button" onclick="gamesList.excluirJogo(${index})">Excluir</button>
            </div>
        `;

        gameList.innerHTML += cardDiv;
    });
}

// Instância da classe GamesList
const gamesList = new GamesList();

// Função para adicionar um jogo
function adicionarJogo() {
    const titulo = document.getElementById("titulo").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;
    const plataforma = document.getElementById("plataforma").value;
    const imagem = document.getElementById("imagem").value;

    gamesList.adicionarJogo(titulo, preco, descricao, plataforma, imagem);

    exibirJogos();
}

function isURLValida(url) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

function clearInputs() {
    document.getElementById("titulo").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("plataforma").value = "";
    document.getElementById("imagem").value = "";
}

function sendMSG(msg, type) {
    const msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    const msgP = `
        <p class="${type}">${msg}</p>
    `;

    msgDiv.innerHTML += msgP;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3000);
}

function isAnyInputEmpty() {
    const titulo = document.getElementById("titulo").value;
    const preco = document.getElementById("preco").value;
    const descricao = document.getElementById("descricao").value;
    const plataforma = document.getElementById("plataforma").value;
    const imagem = document.getElementById("imagem").value;

    return titulo === "" || preco === "" || descricao === "" || plataforma === "" || imagem === "";
}
