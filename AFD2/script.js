estados = []
alfabeto = []
estado_incial = ""
estados_finais = []

canvas_x = 1000
canvas_y = 1000

canvas_item = 0
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
        })

    });

    let simbolo = document.createElement('th');
    simbolo.setAttribute("style", "width: 2rem")
    simbolo.textContent = "δ"
    thead.appendChild(simbolo)

    alfabeto.forEach(letra => {
        let h = document.createElement('th');
        h.textContent = letra
        thead.appendChild(h)
    })

    document.querySelector("#tabelaDelta tbody").replaceWith(tbody)
    document.querySelector("#tabelaDelta thead").replaceWith(thead)
    
}

function desenhaEstados() {
    const canvas = document.getElementById("tela");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height)

    let posX = canvas_item+canvas_spacing
    let posY = canvas_item+canvas_spacing

    estados.forEach(estado => {
        estadoDraw(estado, posX, posY)
        posX = posX+canvas_spacing
        if (posX > canvas_x-50) {
            posY = posY+canvas_spacing
            posX = canvas_item+canvas_spacing
        }
    })


}

function estadoDraw(nome, x, y) {
    let final = estados_finais.includes(nome)

    console.log(final)

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
    let formatado = entrada.value.replace(" ","");
    let conjunto = formatado.split(',');

    estados = conjunto

    return conjunto
}

function validaAlfabeto() {
    let entrada = document.getElementById("alfabeto");
    let formatado = entrada.value.replace(" ","");
    let conjunto = formatado.split(',');

    alfabeto = conjunto

    return conjunto
}

function validaFinais() {
    let entrada = document.getElementById("conjunto_de_estados_finais");
    let formatado = entrada.value.replace(" ","");
    let conjunto = formatado.split(',');

    estados_finais = conjunto

    return conjunto
}

function recebeEInicial() {
    estado_incial = documento.getElementById("estado_inicial").value

}