function displayQ() {
    var entrada = document.getElementById("conjunto_de_estados").value.replace(/\s+/g, "");
    var conjunto = entrada.split(',');
    //var conjunto = ["Apples", "Bananas", "Milk", "Bread"];
    var saida = document.getElementById("Qs");
    

    conjunto.forEach(function(item) {
        var elemento = document.createElement("li");
        if(item != "") {
            elemento.textContent = item;
            saida.appendChild(elemento);
        }
        /*document.getElementById("conjunto_de_estados").on("keydown", function() {
            var value = document.getElementById("conjunto_de_estados").val();
            document.getElementById("Qs").text( value );
         } ).trigger("keydown");*/
    });
    /*document.getElementById("conjunto_de_estados").on("keydown", function() {
        conjunto.forEach(function(item) {
            var elemento = document.createElement("li");
            if(item != "") {
                elemento.textContent = item;
                saida.appendChild(elemento);
            }
        });
    } ).trigger("keydown");*/
}

function geraDelta(){
    var verify = document.getElementById("conjunto_de_estados");
    
    verify.addEventListener("keydown", function(tecla) {
        if(tecla.code === "Enter") {
            var entrada = document.getElementById("conjunto_de_estados").value.replace(/\s+/g, "");
            var conjunto = entrada.split(',');

            var tabela = document.getElementById("tabelaDelta");
            var corpo = document.createElement("tbody");
            for(let i = 0; i<conjunto.length; i++) {
                var linha = document.createElement("tr");
        
                for(let j = 0; j<2; j++) {
                    var cell = document.createElement("td");
                    var cellText = document.createTextNode(`cell in row ${i}, column ${j}`);
                    cell.appendChild(cellText);
                    linha.appendChild(cell);
                }
                corpo.appendChild(linha);
            }
            tabela.appendChild(corpo);
            tabela.setAttribute("border", "2");
        }
    });
    

    
    
}

function printaInput(input) {
    let entrada = document.getElementById(input);
    let conjuntos = null;
    if (input == "conjunto_de_estados") {
        conjuntos = validaEstados();
    }
    console.log(entrada.value);
    console.log(conjuntos);
    alert(entrada.value + conjuntos);
}

function validaEstados() {
    let entrada = document.getElementById("conjunto_de_estados");
    let formatado = entrada.value.replace(" ","");
    let conjunto = formatado.split(',');

    return conjunto
}
