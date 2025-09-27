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
canvas_spacing = 200

estados_pos = []

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
        estados_pos.push([estado, posX, posY])
        posX = posX+canvas_spacing
        if (posX > canvas_x-50) {
            posY = posY+canvas_spacing
            posX = canvas_spacing
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

    let setas = []

    for (var i = 1, row; row = tabTransicao.rows[i]; i++) {
        for (var j = 1, col; col = linhaCabec.cells[j]; j++) {
            let coluna = col.textContent;
            let linha = row.cells[0].textContent;
            let valor = row.cells[j].textContent;
            let concatenado = false
            
            if (valor.length > 0 && estados.includes(valor)) {

                for (x=0;x<setas.length;x++) {
                    console.log(setas[x])
                    if ((setas[x][1] == linha) && (setas[x][2] == valor)) {
                        console.log(`Encontrei ${linha} e ${valor} na coluna ${setas[x][3][0]} também`)
                        let substituto = [ctx, linha, valor, [coluna].concat(setas[x][3])]
                        setas[x] = substituto;
                        concatenado = true;
                    }
                }

                if (!concatenado) {
                    setas.push([ctx, linha, valor, [coluna]])
                }
                console.log(setas)
                
                /*console.log(`Estado ${linha} recebendo ${coluna} vai para ${valor}`)*/
            }
        }
    }
    setas.forEach(seta => {
        desenhaSeta(seta[0], seta[1], seta[2], seta[3]);
    })
}

function getEstadoPos(estado) {
    let x = null
    let y = null
    estados_pos.forEach(est => {
        if (est[0] == estado) {
            x = est[1]
            y = est[2]
        }
    })
    return [x, y]
}

function desenhaSeta(ctx, de, para, letras) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    let espacamento = 20;

    let [deX,deY] = getEstadoPos(de);
    let [paraX,paraY] = getEstadoPos(para);

    console.log(letras)

    if (de == para) {
        ctx.arc(deX-60, deY+60, 20, 0, Math.PI+(Math.PI/2))
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(deX-60, deY+40, 5, 0, 2*Math.PI)
        ctx.fill()
        ctx.font = "28px serif";
        for (i = 0; i < letras.length; i++) {
            ctx.fillText(letras[i], deX-65+(espacamento*i)-(espacamento*letras.length/2),deY+110);
        }
        
        ctx.closePath(); 
    } else if (estados.includes(para)) {
        if (paraX-deX > 50+canvas_spacing) {
            ctx.moveTo(deX, deY+50);
            ctx.lineTo(deX, deY+75);
            ctx.lineTo(paraX, paraY+75);
            ctx.lineTo(paraX, paraY+50);

            ctx.stroke();
            ctx.font = "28px serif";
            for (i = 0; i < letras.length; i++) {
                ctx.fillText(letras[i], paraX-deX+(espacamento*i)-(espacamento*letras.length/2),deY+100);
            }
            ctx.closePath();

            ctx.beginPath();

            const angle = Math.PI/6;

            ctx.moveTo(paraX+8, paraY+65);
            ctx.lineTo(paraX+8 - 15 * Math.cos(angle - Math.PI / 6), paraY+65 - 15 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(paraX+8 - 15 * Math.cos(angle + Math.PI / 6), paraY+65 - 15 * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();

        } else if(paraX<deX) {
            ctx.moveTo(deX, deY-50);
            ctx.lineTo(deX, deY-75);
            ctx.lineTo(paraX, paraY-75);
            ctx.lineTo(paraX, paraY-50);
            ctx.stroke();
            ctx.font = "28px serif";
            for (i = 0; i < letras.length; i++) {
                ctx.fillText(letras[i], paraX+(deX-paraX)/2+(espacamento*i)-(espacamento*letras.length/2),deY-100);
            }
            ctx.closePath();
            ctx.beginPath();

            const angle = Math.PI/2;

            ctx.moveTo(paraX, paraY-50);
            ctx.lineTo(paraX - 15 * Math.cos(angle - Math.PI / 6), paraY-50 - 15 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(paraX - 15 * Math.cos(angle + Math.PI / 6), paraY-50 - 15 * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();

        } else {
            ctx.moveTo(deX+50, deY);
            ctx.lineTo(paraX-50, paraY);
            ctx.stroke();
            ctx.font = "28px serif";
            for (i = 0; i < letras.length; i++) {
                ctx.fillText(letras[i], deX+(paraX-deX)/2+(espacamento*i)-(espacamento*letras.length/2),deY+25);
                console.log(paraX);
                console.log(deX);
            }
            ctx.closePath()

            ctx.beginPath()

            const angle = Math.atan2(paraY - deY, paraX-deX);

            ctx.moveTo(paraX-50, paraY);
            ctx.lineTo(paraX-50 - 15 * Math.cos(angle - Math.PI / 6), paraY - 15 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(paraX-50 - 15 * Math.cos(angle + Math.PI / 6), paraY - 15 * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fill();
        }

    }
    
}

function estadoDraw(nome, x, y) {
    let inicial = estado_incial == nome;
    let final = estados_finais.includes(nome);

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

    if (inicial) {
        ctx.beginPath();
        ctx.moveTo(x-60, y);
        ctx.lineTo(x-80,y-20);
        ctx.lineTo(x-80,y+20);
        ctx.lineTo(x-60, y);
        ctx.stroke();
        ctx.closePath();
    }
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
            return false;
        }
    }

    return estados_finais.includes(estado_atual);
}

function getInfoTable() {
    const tabTransicao = document.getElementById("tabelaDelta");
    let linhaCabec = tabTransicao.rows[0];

    transicoes = [];

    for (var i = 1, row; row = tabTransicao.rows[i]; i++) {
        for (var j = 1, col; col = linhaCabec.cells[j]; j++) {
            transicoes.push([row.cells[j].textContent, col.textContent, row.cells[0].textContent]);
        }
    }
}

function printaValidade() {
    let input = document.getElementById("cadeia");
    if (!(input.value.length > 0)) {
        return;
    }

    valText = document.getElementById("validadeText");
    if (validaCadeia()) {
        valText.textContent = "Válido!"
        valText.style.color = 'green'
    } else {
        valText.textContent = "Inválido!"
        valText.style.color = 'red'
    }
}