let phonetic = document.createElement('p');
let actWord = document.querySelector('#actWord');
const currWord = document.querySelector('#current-word');
const nounParagraths = document.querySelector('#noun');
const verbParagraths = document.querySelector('#verb');
const adjcParagraphs = document.querySelector("#adjective");
const synomys = document.querySelector('#nounSym');
const verbSyn = document.querySelector('#verbSym');
const adjSyn = document.querySelector('#adjSym');
const btn = document.querySelector('#btn');
const icon = document.querySelector('#icon2');
const body = document.querySelector('body');
const src = document.querySelector('#src');
const input = document.querySelector('#addInput');


icon.addEventListener('click', ()=> {
    body.classList.toggle('dark')
});

input.addEventListener('keyup', (event) => {
    if(event.keyCode===13){
        event.preventDefault();
        const palavra = input.value;
        clean();
        dict(palavra.toLowerCase());
    }
});

btn.addEventListener('click', ()=> {
    const palavra = input.value;
    clean();
    dict(palavra.toLowerCase());
})

function clean() {
    nounParagraths.innerHTML = "";
    verbParagraths.innerHTML = "";
    adjcParagraphs.innerHTML = "";
    src.innerHTML = "";
    currWord.innerHTML = "";
};

async function dict(element) {
    const word = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${element}`);
    const data = await word.json();
    console.log(data);
    actWord.innerHTML = element;

    try{
        if(data[0].phonetics[0].text) {
        const phonetics = await data[0].phonetics[0].text
        phonetic.innerHTML = `${phonetics}`
        currWord.appendChild(phonetic)
        } 
        else if(data[0].phonetics[1].text) {
            const phonetics = await data[0].phonetics[1].text
            phonetic.innerHTML = `${phonetics}`
            currWord.appendChild(phonetic)
        }
    } 
    catch(err) {
        console.error(err)
    }

    
    try {
        let audioLink

        for (let i = 0; i<data[0].phonetics.length; i++){
            if(data[0].phonetics[i].audio !== '')
            audioLink = data[0].phonetics[i].audio
        }

        const audioBtn = document.createElement('button');
            audioBtn.classList.add('audioBtn')
            currWord.appendChild(audioBtn)
    
            const sound = new Audio(`${audioLink}`);
            audioBtn.addEventListener('click', ()=> {
                sound.play();
            })
    } 
    catch(err) {
        console.error(err)
    }


    try {
        if(data[0].meanings[0].definitions !== undefined) {
            nounParagraths.innerHTML = `<h3 class = "grammar">noun</h3> <p class = "meaning">Meaning</p>`;
            const nounDefinitions = await data[0].meanings[0].definitions
            let definition1 = document.createElement('ul')
             for(let i = 0; i<nounDefinitions.length; i++) {
                definition1.innerHTML += `<li>${nounDefinitions[i].definition}</li>`
            }
            nounParagraths.appendChild(definition1)
            if(data[0].meanings[0].synonyms[0] !== undefined) {
            synomys.innerHTML = `<p>synomys</p> <span class = "synomym">${data[0].meanings[0].synonyms[0]}</span>`
    
            }
            else {
                synomys.innerHTML = ""
            }
            nounParagraths.appendChild(synomys)
        } 
        else {
            nounParagraths.innerHTML = ""
        }
    }
    catch(err) {
        console.error(err)
    }


    try {
        if(data[0].meanings[1] !== undefined) {
            verbParagraths.innerHTML = `<h3 class = "grammar">verb</h3> <p class = "meaning">Meaning</p>`;
            const verbDefinitions = await data[0].meanings[1].definitions
            let definition2 = document.createElement('ul')
             for(let i = 0; i<verbDefinitions.length; i++) {
                definition2.innerHTML += `<li>${verbDefinitions[i].definition}</li>`
                
            }
            verbParagraths.appendChild(definition2)
            if(data[0].meanings[1].synonyms[0] !== undefined) {
                verbSyn.innerHTML = `<p>synomys</p> <span class = "synomym">${data[0].meanings[1].synonyms[0]}</span>`
        
            }
            else {
                verbSyn.innerHTML = ""
            }
            verbParagraths.appendChild(verbSyn)
        } 
        else {
            verbParagraths.innerHTML = ""
        }
    }
    catch(err) {
        console.error(err)
    }


    try {
        if(data[0].meanings[2] !== undefined) {
            adjcParagraphs.innerHTML = `<h3 class = "grammar">adjective</h3> <p class = "meaning">Meaning</p>`;
            const adjeDefinitions = await data[0].meanings[2].definitions
            let definition3 = document.createElement('ul')
             for(let i = 0; i<adjeDefinitions.length; i++) {
                definition3.innerHTML += `<li>${adjeDefinitions[i].definition}</li>`
            }
            adjcParagraphs.appendChild(definition3);
            
            if(data[0].meanings[2].synonyms[0] !== undefined) {
                adjSyn.innerHTML = `<p>synomys</p> <span class = "synomym">${data[0].meanings[2].synonyms[0]}</span>`
                adjcParagraphs.appendChild(adjSyn)
                }else {
                    adjSyn.innerHTML = ""
                }
        } 
        else {
            adjcParagraphs.innerHTML = "" 
        }
    }
    catch(err) {
        console.error(err)
    }

    
    if (adjcParagraphs.innerHTML == "" && verbParagraths.innerHTML == "" && nounParagraths.innerHTML == "") {
        currWord.innerHTML = `sorry we did not find the meaning`
    } 
    else {
        try {
            src.innerHTML = `<p>Source</p>`
            const source = document.createElement('div')
            source.innerHTML += `<a href = "${data[0].sourceUrls[0]}">${data[0].sourceUrls[0]}</a>`
            src.appendChild(source)
        } 
        catch (err) {
            console.error(err)
        }
    }
};
