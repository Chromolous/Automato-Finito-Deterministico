estados = []
alfabeto = []
estado_incial = ""
estados_finais = []

cadeia = [];
linhaAux = 0;
colAux = 0;
transicoes = [];

canvas_x = 1000
canvas_y = 1000

canvas_items = new Map()
canvas_spacing = 150

function attTabelaFunc() {
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    estados.forEach(estado => {
        let row = tbody.insertRow();
        let h = document.createElement('th');
        h.textContent = estado;
        row.prepend(h)
        alfabeto.forEach(_ => {
            cell = row.insertCell()
            cell.setAttribute("contenteditable", "true")
            cell.addEventListener("input", function(e) {
                desenhaTransicao();
            });
        })

    });

    let linhaCabec = document.createElement('tr');

    let simbolo = document.createElement('th');
    simbolo.setAttribute("style", "width: 2rem")
    simbolo.textContent = "δ"
    linhaCabec.appendChild(simbolo)

    alfabeto.forEach(letra => {
        let h = document.createElement('th');
        h.textContent = letra
        linhaCabec.appendChild(h)
    })

    thead.appendChild(linhaCabec)

    

    document.querySelector("#tabelaDelta tbody").replaceWith(tbody)
    document.querySelector("#tabelaDelta thead").replaceWith(thead)

    desenhaTransicao()
    
}

function desenhaEstados() {
    const canvas = document.getElementById("tela");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height)

    let posX = canvas_spacing
    let posY = canvas_spacing

    estados.forEach(estado => {
        canvas_items.set(estado,(posX,posY))
        estadoDraw(estado, posX, posY)
        posX = posX+canvas_spacing
        if (posX > canvas_x-50) {
            posY = posY+canvas_spacing
            posX = canvas_item+canvas_spacing
        }
    })
}

function desenhaTransicao() {
    const tabTransicao = document.getElementById("tabelaDelta")
    let linhaCabec = tabTransicao.rows[0]
    const canvas = document.getElementById("tela");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height)
    desenhaEstados()

    for (var j = 1, col; col = linhaCabec.cells[j]; j++) {
        for (var i = 1, row; row = tabTransicao.rows[i]; i++) {
            let coluna = col.textContent;
            let linha = row.cells[0].textContent;
            let valor = row.cells[j].textContent;
            if (valor.length > 0) {
                desenhaSeta(ctx, linha, valor, coluna)
                /*console.log(`Estado ${linha} recebendo ${coluna} vai para ${valor}`)*/
            }
        }
    }
}

function desenhaSeta(ctx, de, para, letra) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';

    if (de == para) {
        ctx.arc(canvas_spacing-60, canvas_spacing+60, 20, 0, Math.PI+(Math.PI/2))
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(canvas_spacing-60, canvas_spacing+40, 5, 0, 2*Math.PI)
        ctx.fill()
        ctx.font = "28px serif";
        ctx.fillText(letra, canvas_spacing-60,canvas_spacing+110);
        ctx.closePath(); 
    } else {
        ctx.moveTo(canvas_spacing+50, canvas_spacing);
        ctx.lineTo(canvas_spacing+100, canvas_spacing);
        ctx.stroke();

        ctx.font = "28px serif";
        ctx.fillText(letra, canvas_spacing+75,canvas_spacing+20)

        const angle = Math.atan2(canvas_spacing - canvas_spacing, canvas_spacing+50);

        ctx.moveTo(canvas_spacing+100, canvas_spacing);
        ctx.lineTo(canvas_spacing+100 - 15 * Math.cos(angle - Math.PI / 6), canvas_spacing - 15 * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(canvas_spacing+100 - 15 * Math.cos(angle + Math.PI / 6), canvas_spacing - 15 * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }
    
    
}

function estadoDraw(nome, x, y) {
    let final = estados_finais.includes(nome)

    const canvas = document.getElementById("tela");
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2*Math.PI)
    ctx.stroke();
    if (final) {
        ctx.arc(x, y, 45, 0, 2*Math.PI)
        ctx.stroke();
    }
    ctx.closePath();
    ctx.font = "28px serif";
    ctx.fillText(nome, x-12, y+5);
}


function validaEstados() {
    let entrada = document.getElementById("conjunto_de_estados");
    let formatado = entrada.value.replace(/\s+/g,"");
    let conjunto = formatado.split(',');

    estados = conjunto

    return conjunto
}

function validaAlfabeto() {
    let entrada = document.getElementById("alfabeto");
    let formatado = entrada.value.replace(/\s+/g,"");
    let conjunto = formatado.split(',');

    alfabeto = conjunto

    return conjunto
}

function validaFinais() {
    let entrada = document.getElementById("conjunto_de_estados_finais");
    let formatado = entrada.value.replace(/\s+/g,"");
    let conjunto = formatado.split(',');

    estados_finais = conjunto

    return conjunto
}

function recebeEInicial() {
    estado_incial = document.getElementById("estado_inicial").value.replace(/\s+/g, "");
}

function recebeCadeia() {
    let entrada = document.getElementById("cadeia");
    let formatado = entrada.value.replace(" ","").replace(",", "");
    let conjunto = formatado.split('');
 
    cadeia = conjunto

    return conjunto
}

function validaCadeia() {
    getInfoTable();
    
    var estado_atual = estado_incial;

    for(var c = 0; c<cadeia.length; c++) {
        for( t = 0; t<transicoes.length; t++) {
            if((cadeia[c] == transicoes[t][1]) && (estado_atual == transicoes[t][2])) {
                console.log(`Estado atual: ${estado_atual} Recebeu: ${cadeia[c]} Próximo estado: ${transicoes[t][0]}`);
                estado_atual = transicoes[t][0];
                break;
            }
        }
        if(!estados.includes(estado_atual)){
            alert("não");
            return;
        }
    }
    estados_finais.includes(estado_atual) ? console.log("sim") : alert("não");
}

function getInfoTable() {
    const tabTransicao = document.getElementById("tabelaDelta")
    let linhaCabec = tabTransicao.rows[0]

    for (var i = 1, row; row = tabTransicao.rows[i]; i++) {
        for (var j = 1, col; col = linhaCabec.cells[j]; j++) {
            transicoes.push([row.cells[j].textContent, col.textContent, row.cells[0].textContent]);
        }
    }
}
