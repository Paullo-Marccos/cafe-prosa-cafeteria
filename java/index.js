/* ESSAS SAO UMAS DAS COISAS QUE MAIS GOSTO kkkkkkk */

const tituloOriginal = document.title

document.addEventListener('visibilitychange', function(){
    if(document.hidden){
    // O usuário saiu da aba 
    document.title = '☕ Volte, seu café esfriou!'
    }else{
        document.title = tituloOriginal // O usuário voltou para a aba
    }
})

// PEGA AS IMAGENS COM O NOME DE UM CLASSE 

const slides= document.querySelectorAll(".slide");
const carrossel= document.querySelector(".carrossel");

// guarda qual imagem esta aparecendo, no caso , a primeira
let atual = 0 


function mostrar(numero){
    if(numero >= slides.length){
        numero = 0;
        // BASICAMENTE, ESTOU DIZENDO QUE SE ES TA APRESENTANDO A ULTIMA IMAGEM, VOLTA PRA PRIMEIRA, ASSIM TENDO UIM LOOP
    }
    if(numero < 0 ){
        numero = slides.length -1;
        // AQUI E O INVERSO ULTIMA - PRIMERITRA
    }

    for(let i = 0; i < slides.length; i++){// Tira "ativo" de todas
        slides[i].classList.remove('ativo');
    }
    slides[numero].classList.add('ativo');// Coloca "ativo" só na escolhida
    atual = numero;
}

// AUTOMATIZADO

let timer

function iniciar(){
    parar() // garante que nunca existam DOIS timers ao mesmo tempo (senão a troca fica em dobro)
    timer = setInterval(function(){
        mostrar(atual + 1)
     }, 4000) //VOCE PODE TROCAR EM QUNATO TEMPO PASSAR PRA PROXIMA IMAGEM 4000= 4 segundos
}

function parar(){
    clearInterval(timer)    
}

// SETAS

document.getElementById('seta-esq').onclick = function(){
    mostrar(atual - 1)
    parar()
    iniciar()
}

document.getElementById('seta-dir').onclick = function(){
    mostrar(atual + 1)
     parar() //REINICIA A CONTAGEM DPS OD CLIQUE
    iniciar()
}

// QUANOD PASSAR O MOUSE POR CIMA = PAUSAR 
carrossel.onmouseenter = parar;
carrossel.onmouseleave = iniciar;

// Liga o automático ao abrir a página
iniciar();


// A PARTE MAIS DIFICIL !!!!!!!!!!!!!!!!!!!!

const produtos = [ // ARRAY DOS PRODUTOS, FAZ PARTE TAMBEM DO CARRINGHO
    // ===== Cafés & Bebidas =====
    { id: 'c-espresso',   categoria: 'especiais', nome: 'Espresso',  sub: 'Tradicional / Duplo', codigo: 1001, preco: 7.00,  img: 'img/EspressoTradicionalDuplo.png' },
    { id: 'c-cappuccino', categoria: 'especiais', nome: 'Cappuccino Botânica', sub: 'Café &amp; Bebidas',    codigo: 1002, preco: 12.00, img: 'img/CappuccinoBotanica.png' },
    { id: 'c-icedlatte',  categoria: 'especiais', nome: 'Iced Latte de Baunilha', sub: 'Gelado',         codigo: 1003, preco: 14.00, img: 'img/IcedLattedeBaunilha.png' },

    // ===== Salgados & Lanches =====
    { id: 's-toast',      categoria: 'salgados',  nome: 'Toast de Abacate &amp; Ovos', sub: 'Salgado',  codigo: 2001, preco: 22.00, img: 'img/ToastdeAbacateeOvos.png' },
    { id: 's-croissant',  categoria: 'salgados',  nome: 'Croissant Folhado Clássico',  sub: 'Salgado',  codigo: 2002, preco: 11.00, img: 'img/CroissantFolhadoClássico.png' },
    { id: 's-empanada',   categoria: 'salgados',  nome: 'Empanada Artesanal', sub: 'Salgado',  codigo: 2003, preco: 12.00, img: 'img/EmpanadaArtesanal.png' },

    // ===== Doces & Sobremesas =====
    { id: 'd-banoffee',   categoria: 'doces',nome: 'Torta Banoffee no Pote', sub: 'Sobremesa', codigo: 3001, preco: 16.00, img: 'img/TortaBanoffeenoPote.png' },
    { id: 'd-cookie',     categoria: 'doces',nome: 'Cookie Quente de Chocoball',  sub: 'Sobremesa', codigo: 3002, preco: 9.00,  img: 'img/CookieQuentedeChocoball.png' },
    { id: 'd-bolo',       categoria: 'doces',nome: 'Bolo Caseiro do Dia',  sub: 'Sobremesa', codigo: 3003, preco: 10.00, img: 'img/BoloCaseirodoDia.png' }
];


// FAZ O 12,90 em R$ 12,90
function moeda(numero){
    return numero.toLocaleString('pt-BR' ,{
        style: 'currency', currency: 'BRL' 
    })
}


// Recebe UM produto e devolve o HTML (texto) da linha dele
// mesmo tentando entender, no final nao entendo nada, sinceramente
// Recebe UM produto (p) e devolve o HTML da linha dele na tabela
function criarLinha(p) {

    let linha = '';

    
    linha += '<tr id="' + p.id + '">';

     
    linha += '<td>';
    linha += '<img src="' + p.img + '" alt="' + p.nome + '">';
    linha += '</td>';

    
    linha += '<td class="descproduto">'; //ESSA CLASS AJUIDA NO  CSS
    linha += '<strong>' + p.nome + '</strong>';
    linha += '<span>' + p.sub + '</span>';
    linha += '<span>Código: ' + p.codigo + '</span>';
    linha += '</td>';

    
    linha += '<td>' + moeda(p.preco) + '</td>';

    
    linha += '<td>';
    linha += '<button type="button" class="btn-menos">−</button>';  
    linha += '<span class="qtd-valor">0</span>';
    linha += '<button type="button" class="btn-mais">+</button>';// A CLASSE SO BOTAO PARA FAZER O CARRINHO
    linha += '</td>';

    
    linha += '<td class="total">' + moeda(0) + '</td>';

    
    linha += '</tr>';

    return linha;
   
}

let htmlCafes = ""
let htmlSalgados = ""
let htmlDoces = ""

// Percorre a lista, produto por produto

for(let i = 0; i < produtos.length; i++){
    const p = produtos[i]
    
    if(p.categoria === 'especiais'){
        htmlCafes += criarLinha(p)
    } 
    else if(p.categoria === 'salgados')
        htmlSalgados += criarLinha(p)   

    else if(p.categoria === 'doces')
        htmlDoces += criarLinha(p)
}


// Joga cada texto dentro do <tbody> certo

document.getElementById('lista-cafesebebidas').innerHTML = htmlCafes
document.getElementById('lista-salgadoselanches').innerHTML = htmlSalgados
document.getElementById('lista-docesesobremesas').innerHTML = htmlDoces


// CARRINHO

let carrinho = {}
// AGORA O LOCALSTORAGE, eu usei muito no meu enigma kkkkk
const salvo = localStorage.getItem('cafe-carrinho')

    if(salvo){
            carrinho = JSON.parse(salvo)
    }
// carrinho[id] lê ou guarda o valor de uma chave do objeto.
// Com id = 'c-espresso', carrinho['c-espresso']
// = 2 quer dizer “2 espressos”.
// SE TIVER ALGO NO CARRINHO VAI RETORNAR OS ITENS
function qtd(id){
    if(carrinho[id]){
        return carrinho[id]
    }
    return 0 //0 SE NAO TIVER NADA VAI RETORNAR 0
}


function mudarQtd(id, delta){
    let nova = qtd(id) + delta;

    if(nova < 0){
        nova = 0;           // nunca fica negativa
    }

    carrinho[id] = nova;    // guarda a nova quantidade
    atualizar();            // redesenha a tela
}



function atualizar (){
    let itens = 0
    let subtotal = 0
// percorre todos os produtos, um por um
        for(let i = 0; i < produtos.length; i++){
            const p = produtos[i]
            const q = qtd(p.id)
            const linha = document.getElementById(p.id)

            // Atualiza a quantidade e o total DESSA linha
            linha.querySelector('.qtd-valor').textContent = q;
            linha.querySelector('.total').textContent = moeda(q * p.preco);

            itens = itens + q
            subtotal = subtotal + q * p.preco
                if( q > 0){
                    linha.classList.add("no-carrinho")
                } else{
                    linha.classList.remove('no-carrinho')
                }
         }
    if(itens === 1){
        document.getElementById("rodape-itens").textContent = '1 item'
    } else{
        document.getElementById('rodape-itens').textContent = itens +' itens'
    }
    document.getElementById('rodape-subtotal').textContent = moeda(subtotal)

     
// carrinho
    const contador = document.getElementById('carrinho-contador')
    contador.textContent = itens
// A QUNATIDADE DE ITENS APARECE AQUI
    if(itens === 0){
        contador.classList.add('oculto')
    }else{
        contador.classList.remove('oculto')
    }

    let htmlPainel = ''

    for( let i = 0; i < produtos.length; i++){
        const p = produtos[i]
        const q = qtd(p.id)

        if( q > 0){
            htmlPainel += '<div class="item-carrinho">'
            htmlPainel += '<img src="' + p.img + '" alt="' + p.nome + '">'

            htmlPainel += '<div class="item-info">'
            htmlPainel += '<strong>' + p.nome + '</strong>'
            htmlPainel += '<span>' + moeda(p.preco) + ' cada</span>'

            htmlPainel += '<div class="item-qtd">'
// Se p.id for 'c-espresso', o texto final fica:
// html
// <button type="button" onclick="mudarQtd('c-espresso', -1)">−</button>
            htmlPainel += `<button type="button" onclick="mudarQtd('${p.id}', -1)">−</button>`
            htmlPainel += '<span>' + q + '</span>'
            htmlPainel += `<button type="button" onclick="mudarQtd('${p.id}', 1)">+</button>`
            htmlPainel += '</div>'
            htmlPainel += '</div>'

            htmlPainel += '<div>'
            htmlPainel += '<strong>' + moeda(p.preco * q) + '</strong>'
            htmlPainel += `<button type="button" onclick="removerTudo('${p.id}')">Remover</button>`
            htmlPainel += '</div>'

            htmlPainel += '</div>'
        }
    }

    if(itens === 0){
        htmlPainel= '<p class="carrinho-vazio">Seu carrinho está vazio.<br>Use o + no cardápio.</p>' 
    }

    document.getElementById('carrinho-itens').innerHTML = htmlPainel

    document.getElementById('carrinho-subtotal').textContent = moeda(subtotal)
    localStorage.setItem('cafe-carrinho', JSON.stringify(carrinho))
}

// BOTEOES

for(let i = 0; i < produtos.length; i++){
    const p = produtos[i]
    const linha =document.getElementById(p.id)

    linha.querySelector('.btn-mais').onclick = function(){
        mudarQtd(p.id, 1)
    }
    linha.querySelector('.btn-menos').onclick = function(){
        mudarQtd(p.id, -1)
    }
}
atualizar();

// abrir e fechar o painel do carrinho

const painel = document.getElementById('painel-carrinho')
const overlay = document.getElementById('overlay')

function abrirCarrinho(){
    painel.classList.add('aberto')
    overlay.classList.add('ativo')
}

function fecharCarrinho(){
    painel.classList.remove('aberto')
    overlay.classList.remove('ativo')
}

document.getElementById('btn-carrinho').onclick = abrirCarrinho
document.getElementById('fechar-carrinho').onclick = fecharCarrinho

overlay.onclick = fecharCarrinho// clicar fora do painel também fecha
// Tecla Esc fecha o painel
document.addEventListener('keydown',function(e){
    if(e.key === 'Escape'){   
    fecharCarrinho()
    }
}
)


function removerTudo(id){
    mudarQtd(id, -qtd(id))
}

// FINALIZAR;

document.getElementById('btn-finalizar').onclick = function(){
    if(Object.keys(carrinho).length === 0 ||
    document.getElementById('rodape-itens').textContent === '0 itens'){
        alert('Seu carrinho está vazio')
         return //BASICAMENTE, SE NAO TIVER NADA NO CARRINHO VAI APARECER ESSSA MENSAGFEM
    }

    alert('Pedido enviado! Obrigado pela preferencia ☕')
     carrinho = {} //esvazio o carrinho
     atualizar() //  atualiza tudo
     fecharCarrinho()
}


// PARTE + ou -

function contarItens(){
    let total = 0 
    for(let i = 0; i < produtos.length; i++){
        total = total + qtd(produtos[i].id)
    }
    return total
}

document.getElementById('btn-finalizar').onclick = function(){
    if(contarItens() === 0){
        alert ("Seu carrinho está vazio!")
        return
    }
  alert('Seu pedido foi enviado! Obrigado pela preferência ☕')  
  carrinho = {}
  atualizar()
  fecharCarrinho()
}



document.getElementById('link-contato').onclick = function(e){
    e.preventDefault()
    alert('Entre em contato conosco pelo WhatsApp: (61) 99999-8888 ou venha nos visitar!');
}