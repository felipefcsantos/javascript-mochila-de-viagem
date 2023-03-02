const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value )

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens)) //adiciona no localStorage o objeto com nome e quantidade, sendo que o primeiro item é o nome Item e o segundo o seu conteúdo
    //JSON.stringify = transforma o objeto em uma string, pois localStorage só axceita String

    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item) {
    const novoItem = document.createElement("li") //cria uma lista
    novoItem.classList.add("item") //adiciona na lista a classe "item"

    const numeroItem = document.createElement("strong")//cria um strong
    numeroItem.innerHTML = item.quantidade//adiciona a quantidade dentro da const numeroItem
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)//coloca um objeto dentro do outro, ou seja, a const numeroItem dentro de novoItem
    
    novoItem.innerHTML += item.nome //adiciona o nome dentro da const novoItem

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem) //adiciona no HTML uma nova lista, que é o novoItem
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}