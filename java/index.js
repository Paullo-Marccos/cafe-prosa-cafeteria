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
    atualizarBolinhas()
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

const areaBolinhas = document.getElementById('bolinhas')

for(let i = 0; i < slides.length; i++){
    const bolinha = document.createElement('button')
    bolinha.className = 'bolinha'
    bolinha.setAttribute('aria-label', 'Ir para a imagem ' + (i + 1))
    bolinha.onclick = function(){
        mostrar(i)
        parar()
        iniciar()
    }
    areaBolinhas.appendChild(bolinha)
}
const bolinhas = document.querySelectorAll('.bolinha')
function atualizarBolinhas(){
    for(let i = 0; i < bolinhas.length; i++){
        if(i === atual){
            bolinhas[i].classList.add('ativa')
        }else{
            bolinhas[i].classList.remove('ativa')
        }
    }
}
atualizarBolinhas()
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
        voarParaCarrinho(this)
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

// PARTE + ou -

function contarItens(){
    let total = 0 
    for(let i = 0; i < produtos.length; i++){
        total = total + qtd(produtos[i].id)
    }
    return total
}

// FINALIZAR PEDIDO
document.getElementById('btn-finalizar').onclick = function(){
    if(contarItens() === 0){
        avisar ("Seu carrinho está vazio! Use o + no cardápio ☕")
        return
    }
  // pega o nome digitado para o copo (se não digitou, usa "cliente")
  let nome = document.getElementById('nome-copo').value.trim()
  if(nome === ''){
    nome = 'cliente'
  }
  let mensagem = '☕ Pedido de ' + nome + ' enviado! Obrigado pela preferência.'
  
  ganharSelo() // +1 selo no cartão fidelidade
  if(selos >= totalSelos){
    mensagem = mensagem + ' 🎉 Cartão fidelidade completo!'
  }else{
    mensagem = mensagem + ' +1 selo no cartão fidelidade!'
  }
  carrinho = {}
  atualizar()
  fecharCarrinho()
  avisar(mensagem)
  chuvaDeCafe()
}



document.getElementById('link-contato').onclick = function(e){
    e.preventDefault()
    alert('Entre em contato conosco pelo WhatsApp: (61) 99999-8888 ou venha nos visitar!');
}

// cartao fidelidade

const totalSelos = 8
let selos = 0

const selosSalvos = localStorage.getItem('cafe-selos')
if(selosSalvos){
    selos= Number(selosSalvos)
}if(isNaN(selos)){
    selos = 0
}

function desenharSelos(animarUltimo){
    let html = ''

    for(let i = 0; i < totalSelos; i++){
        if(i < selos){
            if(animarUltimo && i === selos -1 ){
                html += '<div class="selo cheio novo">☕</div>'
            }else{
                html += '<div class="selo cheio">☕</div>'
            }
        }else {
            html += '<div class="selo">' + (i + 1) + '</div>'
        }
    }
    document.getElementById('selos').innerHTML = html

    const texto = document.getElementById('selos-texto')
    const botaoResgatar = document.getElementById ('btn-resgatar')

        if(selos >= totalSelos){
        texto.textContent = '🎉 Cartão completo! Seu próximo café é por nossa conta.'
        botaoResgatar.classList.remove('oculto')
    } else {
        texto.textContent = 'Você tem ' + selos + ' de ' + totalSelos + ' selos. Faltam ' + (totalSelos - selos) + '!'
        botaoResgatar.classList.add('oculto')
    }

    localStorage.setItem('cafe-selos', selos)
}

function ganharSelo(){
    if(selos < totalSelos){
        selos = selos + 1
        desenharSelos(true)
    }
}

desenharSelos(false)

document.getElementById('btn-resgatar').onclick = function(){
    selos = 0
    desenharSelos(false)
    avisar('🎁 Café grátis resgatado! Mostre esta mensagem no balcão.')
}

document.getElementById('btn-zerar-selos').onclick = function(){
    selos = 0
    desenharSelos(false)
}





document.body.classList.add('com-js')





let timerAviso

function avisar(mensagem){
    const aviso = document.getElementById('aviso')
    aviso.textContent = mensagem
    aviso.classList.add('ativo')       // o CSS faz a mensagem aparecer

    clearTimeout(timerAviso)           // cancela o "sumir" anterior (senão o 2º aviso some cedo)
    timerAviso = setTimeout(function(){
        aviso.classList.remove('ativo')
    }, 4500)                           // 4500 = 4,5 segundos
}

// DATA E HORA

function atualizarSaudacao(){
    const hora = new Date().getHours()
    let texto = ''

    if(hora >= 5 && hora < 12){
        texto = '☀️ Bom dia! Que tal começar com um espresso?'
    }else if (hora >= 12 && hora < 18){
        texto = '🌤️ Boa tarde! Um cappuccino com um docinho cai bem.'
    }else if(hora >= 18){
        texto = '🌙 Boa noite! Hora de um café para desacelerar.'
    }
    else{
        texto = '🦉 Madrugada... o café também faz companhia.'
    }
    document.getElementById('saudacao').textContent = texto
}

const horarios = [
    { abre: 8, fecha: 14 },  // domingo
    { abre: 7, fecha: 20 },  // segunda
    { abre: 7, fecha: 20 },  // terça
    { abre: 7, fecha: 20 },  // quarta
    { abre: 7, fecha: 20 },  // quinta
    { abre: 7, fecha: 21 },  // sexta
    { abre: 8, fecha: 18 }   // sábado
]

function atualizarStatus(){
    const agora = new Date()
    const dia = agora.getDay()
    const hora = agora.getHours()
    const hoje = horarios[dia]
    const caixa = document.getElementById('status-loja')

    if( hora >= hoje.abre && hora < hoje.fecha){
        caixa.innerHTML = '<span class="ponto ligado"></span>Aberto agora · fecha às ' + hoje.fecha + 'h'
    }else if( hora < hoje.abre){
        caixa.innerHTML = '<span class="ponto desligado"></span>Fechado · abre hoje às ' + hoje.abre + 'h'
    }else{
        const  amanha = horarios[(dia + 1 ) % 7]
        caixa.innerHTML = '<span class="ponto desligado"></span>Fechado · abre amanhã às ' + amanha.abre + 'h'
    }
}

atualizarSaudacao()
atualizarStatus()
setInterval(atualizarStatus, 60000) 
// 1 minuto


// GRAO

const areaGraos = document.getElementById('graos')

for(let i = 0; i < 18; i++){
    const grao = document.createElement('span')

    grao.className = 'grao'
    grao.style.left = (Math.random() * 100) + '%'
    grao.style.animationDuration = (6 + Math.random() * 8) + 's'
    grao.style.animationDelay = (Math.random() * 8) + 's'
    areaGraos.appendChild(grao)
}

// Chuva de ☕ pela tela toda (usada na compra e no easter egg da logo)

function chuvaDeCafe(){
    for(let i = 0; i < 30; i++){
        const cafe = document.createElement('span')
        cafe.className = 'cafe-cai'
        cafe.textContent = '☕'
        cafe.style.left = (Math.random() * 95) + '%'
        cafe.style.animationDuration = (2 + Math.random() * 3) + 's'
        cafe.style.animationDelay = (Math.random() * 1.5) + 's'
        document.body.appendChild(cafe)

        // depois de 6,5 segundos o café é removido da página
        setTimeout(function(){
            cafe.remove()
        }, 6500)
    }
}

let cliquesLogo = 0

document.getElementById('logo-link').onclick = function(e){
    e.preventDefault()
    cliquesLogo = cliquesLogo + 1

        if(cliquesLogo ===5){
            cliquesLogo = 0 
            chuvaDeCafe()
            avisar('🎉 Você achou o café secreto! Mostre esta mensagem no balcão e ganhe um biscoitinho 🍪')
        }
}

// BARRA DE ROLAGEM:

const barra = document.getElementById('barra-progresso')
const btnTopo = document.getElementById('btn-topo')
const revelaveis = document.querySelectorAll('.revelar')

let numerosContados = false

function aoRolar(){
    const rolado = window.scrollY
    const total = document.documentElement.scrollHeight - window.innerHeight


    let porcentagem = 0
        if(total > 0){
            porcentagem = rolado / total * 100
        }
        barra.style.width = porcentagem + '%'

        if(rolado > 400 ){
            btnTopo.classList.add('visivel')
        }else{
            btnTopo.classList.remove('visivel')
        }

    for(let i = 0; i < revelaveis.length; i++){
        const topo = revelaveis[i].getBoundingClientRect().top
            if (topo < window.innerHeight - 80){
                revelaveis[i].classList.add('visivel')

                if(revelaveis[i].id === 'sobre' && numerosContados === false){
                    numerosContados = true 
                    animarNumeros()
                }
            }
    }
}

window.addEventListener('scroll', aoRolar)
aoRolar()

btnTopo.onclick = function(){
    window.scrollTo({top: 0, behavior: "smooth"})
}

function animarNumeros(){
    const numeros = document.querySelectorAll('.numero')
    for(let i = 0; i < numeros.length; i++){
        contarAte(numeros[i])
    }
}

function contarAte(elemento){
    const alvo = Number(elemento.dataset.alvo)
    let valor = 0
    const passo = Math.ceil(alvo / 60)

    const contador = setInterval(function(){
        valor = valor + passo
        if(valor >= alvo){
            valor = alvo
            clearInterval(contador)
        }
        elemento.textContent = valor.toLocaleString('pt-BR')
    }, 25)
}
// CAFÉZINHO VOA ATÉ O CARRINHO

function voarParaCarrinho(origem){
    const de = origem.getBoundingClientRect()
    const botaoCarrinho = document.getElementById('btn-carrinho')
    const ate = botaoCarrinho.getBoundingClientRect()

    const voador = document.createElement('span')
    voador.className = 'voador'
    voador.textContent = '☕'
    voador.style.left = de.left + 'px'
    voador.style.top = de.top + 'px'
    document.body.appendChild(voador)

    setTimeout(function(){
        voador.style.left = (ate.left + 15) + 'px'
        voador.style.top = (ate.top + 10) + 'px'
        voador.style.opacity = '0.3'
        voador.style.transform = 'scale(0.4)'
    }, 20);


    setTimeout(function(){
        voador.remove()
        botaoCarrinho.classList.add('pulo')
        setTimeout(function(){
            botaoCarrinho.classList.remove('pulo')
        }, 400)
    }, 800)
}
// BUSCA no cardapio e ME suspreenda

const campoBusca = document.getElementById('busca')

function filtrarCardapio(){
    const texto = campoBusca.value.toLowerCase().trim()

    let achou = 0 
        for(let i = 0; i < produtos.length; i++){
            const p = produtos[i]
            const linha = document.getElementById(p.id)
            const nomeCompleto = (p.nome + ' ' + p.sub).toLowerCase()

            if(nomeCompleto.includes(texto)){
                linha.style.display = ''
                achou = achou + 1
            } else{
                linha.style.display = 'none' 
            }
        }
    
    if(achou === 0 ){
        document.getElementById('sem-resultado').classList.remove('oculto')
    }else{
        document.getElementById('sem-resultado').classList.add('oculto')
    }
}

campoBusca.oninput = filtrarCardapio

document.getElementById('btn-surpresa').onclick = function(){
    campoBusca.value = ''
    filtrarCardapio()

    const posicao = Math.floor(Math.random() * produtos.length)
    const sorteado = produtos[posicao]
    const linha = document.getElementById(sorteado.id)

    linha.scrollIntoView({behavior: 'smooth', block: 'center'})
    linha.classList.add('destaque')
    setTimeout(function(){
        linha.classList.remove('destaque')
    }, 2500)
    
    avisar('🎲 O barista sugere: ' + sorteado.nome.replace('&amp;', '&'))
}


// QUIZ

const perguntas = [{
    texto: 'Como está o seu dia?',
    opcoes: [
        { texto: '⚡ Corrido: preciso de energia',   cafe: 'c-espresso' },
        { texto: '🌿 Tranquilo: quero relaxar',      cafe: 'c-cappuccino' },
        { texto: '☀️ Quente: quero algo gelado',     cafe: 'c-icedlatte' }
        ]
    },
{

    texto: 'Qual cantinho você escolheria?',
    opcoes: [
        { texto: '📖 Poltrona com um bom livro',     cafe: 'c-cappuccino' },
        { texto: '🌳 Mesinha ao ar livre',           cafe: 'c-icedlatte' },
        { texto: '🪑 Balcão, pertinho do barista',   cafe: 'c-espresso' }
    ]
},
{
    texto: 'Seu gosto é mais...',
    opcoes: [
        { texto: '🍦 Doce e refrescante',            cafe: 'c-icedlatte' },
        { texto: '🍫 Intenso e marcante',            cafe: 'c-espresso' },
        { texto: '🥛 Cremoso e suave',               cafe: 'c-cappuccino' }
    ]
    }
]


const parceiros = {
    'c-espresso': 'd-cookie',
    'c-cappuccino': 's-croissant',
    'c-icedlatte': 's-toast'
}


const mensagensQuiz = {
    'c-espresso': 'Intenso e direto ao ponto: você não perde tempo. O espresso acompanha o seu ritmo!',
    'c-cappuccino': 'Cremoso e acolhedor: você sabe curtir o momento. O cappuccino é a sua cara!',
    'c-icedlatte': 'Leve e refrescante: você leva a vida com suavidade. O iced latte combina com você!'
}


const cafeDoQuiz = ['c-espresso', 'c-cappuccino', 'c-icedlatte']

let perguntaAtual = 0 
let votos = {}
let primeiraEscolha = ''

function acharProduto(id){
    for( let i = 0; i < produtos.length; i++){
        if(produtos[i].id === id){
            return produtos[i]
        }
    }
}

function mostrarPergunta(){
    const p = perguntas[perguntaAtual]
    const largura = (perguntaAtual + 1) / perguntas.length * 100

    let html = ''
    html += '<p class="quiz-passo">Pergunta ' + (perguntaAtual + 1) + ' de ' + perguntas.length + '</p>'
    html += '<div class="quiz-barra"><div style="width:' + largura + '%"></div></div>'
    html += '<h3 class="quiz-pergunta">' + p.texto + '</h3>'

    for(let i = 0; i < p.opcoes.length; i++){
        // cada botão chama responder(i), onde i é o número da opção
        html += '<button type="button" class="quiz-opcao" onclick="responder(' + i + ')">' + p.opcoes[i].texto + '</button>'
    }

    document.getElementById('quiz-caixa').innerHTML = html
}

function responder(numeroOpcao){
    const escolha = perguntas[perguntaAtual].opcoes[numeroOpcao]

    if(votos[escolha.cafe]){
        votos[escolha.cafe] = votos[escolha.cafe] + 1

    }else{
        votos[escolha.cafe] = 1
    }

    if(perguntaAtual === 0){
        primeiraEscolha = escolha.cafe
    }

    perguntaAtual = perguntaAtual + 1

    if(perguntaAtual < perguntas.length){
        mostrarPergunta()

    }else{
        mostrarResultado()
    }
}

function mostrarResultado(){
    let vencedor = primeiraEscolha
    let maior = votos[primeiraEscolha]

    for(let i = 0; i < cafeDoQuiz.length; i++){
        const id = cafeDoQuiz[i]
        if(votos[id] > maior){
            vencedor = id
            maior = votos[id]
        }
    }
const cafe = acharProduto(vencedor)
    const parceiro = acharProduto(parceiros[vencedor])

    let html = '<div class="quiz-resultado">'
    html += '<img src="' + cafe.img + '" alt="' + cafe.nome + '">'
    html += '<h3>Seu café é o ' + cafe.nome + '!</h3>'
    html += '<p>' + mensagensQuiz[vencedor] + '</p>'
    html += '<p>Para acompanhar: <strong>' + parceiro.nome + '</strong></p>'
    html += '<div class="quiz-acoes">'
    html += `<button type="button" class="btn-surpresa" onclick="adicionarCombo('${vencedor}', '${parceiros[vencedor]}')">🛒 Adicionar os dois ao pedido</button>`
    html += '<button type="button" class="btn-surpresa btn-secundario" onclick="refazerQuiz()">↻ Refazer o teste</button>'
    html += '</div>'
    html += '</div>'

    document.getElementById('quiz-caixa').innerHTML = html


}

function adicionarCombo(idCafe, idParceiro){
    mudarQtd(idCafe, 1)
    mudarQtd(idParceiro, 1)
    avisar('✅ Café e acompanhamento adicionados ao seu pedido!')
    abrirCarrinho()
}


function refazerQuiz(){
    perguntaAtual = 0
    votos = {}
    primeiraEscolha = ''
    mostrarPergunta()
}

mostrarPergunta()

// NOME NO COPO:

const campoNome = document.getElementById('nome-copo')
const copoNome = document.getElementById('copo-nome')

const nomeSalvo = localStorage.getItem('cafe-nome')
 
if(nomeSalvo){
    campoNome.value = nomeSalvo
}

function atualizarCopo(){
    const nome = campoNome.value.trim()
    if(nome === ''){
        copoNome.textContent = 'Seu nome'
    }else{
        copoNome.textContent = nome
    }
    localStorage.setItem('cafe-nome', campoNome.value)
}
campoNome.oninput = atualizarCopo

atualizarCopo()



// CURIOSIDADEA

const curiosidades = [
    'A espuma dourada que fica por cima do espresso se chama "crema".',
    'O cappuccino clássico leva partes iguais de espresso, leite vaporizado e espuma.',
    'O grão de café é a semente de um fruto vermelho, parecido com uma cereja.',
    'Um bom espresso leva só uns 25 a 30 segundos para ser extraído.',
    'O Brasil é o maior produtor de café do mundo há mais de um século.',
    'A palavra "espresso" lembra algo feito na hora, sob pressão, só para você.'
]

let numCuriosidade = 0

const caixaCuriosidade = document.getElementById('curiosidade')
caixaCuriosidade.textContent = curiosidades[0]

function trocarCuriosidade(){
    caixaCuriosidade.classList.add('sumindo')

    setTimeout(function(){
        numCuriosidade = numCuriosidade + 1
        if(numCuriosidade >= curiosidades.length){
            numCuriosidade = 0
        }
        caixaCuriosidade.textContent = curiosidades[numCuriosidade]
        caixaCuriosidade.classList.remove('sumindo')
    }, 400)
}

document.getElementById('caixa-curiosidade').onclick = trocarCuriosidade