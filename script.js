let perguntasSorteadas = [];
let indice = 0;
let acertos = 0;

const perguntaEl = document.getElementById("pergunta");
const alternativasEl = document.getElementById("alternativas");
const resultadoEl = document.getElementById("resultado");
const reiniciarBtn = document.getElementById("reiniciar");

function embaralhar(array){
    return [...array].sort(() => Math.random() - 0.5);
}

function iniciarQuiz(){
    perguntasSorteadas = embaralhar(perguntas).slice(0,5);

    indice = 0;
    acertos = 0;

    resultadoEl.innerHTML = "";
    reiniciarBtn.style.display = "none";

    mostrarPergunta();
}

function mostrarPergunta(){

    const atual = perguntasSorteadas[indice];

    perguntaEl.innerHTML =
        `<h3>${indice+1}/5 - ${atual.pergunta}</h3>`;

    alternativasEl.innerHTML = "";

    atual.alternativas.forEach((alt, i)=>{

        const btn = document.createElement("button");
        btn.textContent = alt;

        btn.onclick = () => responder(i);

        alternativasEl.appendChild(btn);
    });
}

function responder(escolhida){

    const atual = perguntasSorteadas[indice];

    if(escolhida === atual.correta){
        acertos++;
        resultadoEl.innerHTML =
            "✅ Resposta correta!";
    }else{
        resultadoEl.innerHTML =
            `❌ Errado! Resposta correta: <b>${atual.alternativas[atual.correta]}</b>`;
    }

    setTimeout(() => {

        indice++;

        if(indice < perguntasSorteadas.length){
            mostrarPergunta();
        }else{
            finalizarQuiz();
        }

    }, 1500);
}

function finalizarQuiz(){

    perguntaEl.innerHTML = "<h2>Quiz Finalizado!</h2>";

    alternativasEl.innerHTML = "";

    resultadoEl.innerHTML =
        `Você acertou <b>${acertos}</b> de 5 perguntas.`;

    reiniciarBtn.style.display = "block";
}

reiniciarBtn.addEventListener("click", iniciarQuiz);

iniciarQuiz();