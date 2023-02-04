let tabuleiro = [0, 0, 0, 0, 0, 0, 0, 0, 0] // Array que verifica os campos preenchidos
let vez = 0 // mostra de quem é a vez
const circulo = ['fa-regular', 'fa-circle', 'fa-8x', 'forma'] //Cria a forma de circulo
const xis = ['fa-solid', 'fa-x', 'fa-8x', 'forma'] //Cria a forma de X
const quadrados = document.getElementsByClassName('ticTacBox') // Quadrados do tabuleiro
const resultado = document.querySelector('#resultado')
const condicaoVitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8], 
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

// Preenchimento dos campos
for (const quadrado of quadrados){
    quadrado.addEventListener('click', function() {
        verificarPosicao(this, vez)
    })
}

// Faz a parte funcional de marcar as posições do tabuleiro
function verificarPosicao(posicao, vez) {
    for (let index = 0; index < quadrados.length; index++) {
        if (tabuleiro[index] == 0 && posicao == quadrados[index]){
            tabuleiro[index] = vez % 2 == 0 ? 1 : 2
            adicionarForma(tabuleiro[index], posicao)
            if (verificarVitoria(tabuleiro[index])) {
                resultado.innerHTML = `Player ${tabuleiro[index]} venceu!!`
                myModal.show()
            } else if(tabuleiro.indexOf(0) == -1){
                resultado.innerHTML = `Empate!!`
                myModal.show()
            }
        }
    } 
}

// Cria as formas no HTML
function adicionarForma(forma, posicao) {
    if (forma == 1) {
        for (const i of xis) {
            posicao.classList.add(i)
        }
    } else{
        for (const i of circulo) {
            posicao.classList.add(i)
        } 
    }
    return vez++
}

// Verifica se o player ganhou
function verificarVitoria(player) {
    return condicaoVitoria.some((combinacao) => { // Seleciona uma array dentro da condicaoVitoria
        return combinacao.every((index) => { // Verifica se a combinação bate com o tabuleiro
            return tabuleiro[index] == player
        })
    })
}

// Limpa o tabuleiro
function resetar() {
    for (const quadrado of quadrados){
        for (const i of xis) {
            quadrado.classList.remove(i)
        }
        for (const i of circulo) {
            quadrado.classList.remove(i)
        }
    }
    tabuleiro = [0, 0, 0, 0, 0, 0, 0, 0, 0]
}

//Abre o modal que mostra o resultado
const myModal = new bootstrap.Modal('#myModal', {
    show: true
  })

// Ativa o reset quando fechar o modal
const myModalEl = document.querySelector('#myModal')
myModalEl.addEventListener('hidden.bs.modal', event => resetar())