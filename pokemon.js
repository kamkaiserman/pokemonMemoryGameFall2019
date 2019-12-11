///////////////////////////////////////////////////////////////////////
//I didn't work filter, map, reduce into my project but I do know how they work
///////////////////////////////////////////////////////////////////////

function makeSimpleMap(allOfThem) {
    let results = allOfThem.map(senator => {
        return {
            id: senator.id,
            name: `${senator.first_name} ${senator.last_name}`,
            party: senator.party,
            date_of_birth: `${calculate_age(new Date(senator.date_of_birth))}`,
            gender: senator.gender,
            state_rank: senator.state_rank,
            total_votes: senator.total_votes
        }
    })
    return results
}

function filterSenators(simpleList, partyAffiliation) {
    return simpleList.filter(senator => senator.party === partyAffiliation)
}

const testArray = [5,10,15,20,25,30,35,40,45,50,30]

const testReduce = testArray.reduce((acc, num) => {
    return acc + num
}, 0)

///////////////////////////////////////////////////////////////////////
//I didn't work filter, map, reduce into my project but I do know how they work
///////////////////////////////////////////////////////////////////////

async function getAPIData(url) {
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

var pokemonIDArray = [];

for (i = 0; i < 16; i++) {
    var tempPokeID = Math.floor((Math.random() * 807) + 1);
    if(i === 0)
    {
        pokemonIDArray = [tempPokeID]
    } else {
        pokemonIDArray.push(tempPokeID)
    }
}

for (i = 0; i < 16; i++) {
    let tempPokeID = pokemonIDArray[i]
    pokemonIDArray.push(tempPokeID)
}

shuffle(pokemonIDArray)

console.log(pokemonIDArray)

for (i = 0; i < pokemonIDArray.length; i++) {
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokemonIDArray[i]}`)
        .then(result => {
            populateDom(result)
            console.log(result)
        })
}

console.log(pokemonIDArray)

class Pokemon {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

const dragonair = new Pokemon(1000, 'dragonair')

const newButton = document.querySelector('#newPokemon')
newButton.addEventListener('click', function () {
    let pokeId = prompt("Please enter a pokemon ID")
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
        .then(result => {
            populateDom(result)
        })
})

// const theData = getAPIData('https://pokeapi.co/api/v2/pokemon/?limit=25')
//     .then(data => {
//         for (const pokemon of data.results) {
//             getAPIData(pokemon.url)
//                 .then(pokedata => {
//                     populateDom(pokedata)
//                 })
//         }
//     })

let mainArea = document.querySelector('main')

function populateDom(single_pokemon) {
    let pokeScene = document.createElement('div')
    let pokeCard = document.createElement('div')
    let pokeFront = document.createElement('div')
    let pokeBack = document.createElement('div')
    let pokeBackDiv = document.createElement('div')

    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, pokeBackDiv, single_pokemon)

    pokeScene.setAttribute('class', 'scene')
    pokeCard.setAttribute('class', 'card')

    pokeCard.appendChild(pokeFront)
    pokeCard.appendChild(pokeBack)
    pokeScene.appendChild(pokeCard)

    mainArea.appendChild(pokeScene)

    pokeCard.addEventListener('click', function () {
        pokeCard.classList.toggle('is-flipped');
    });
}

function getPokeNumber(charURL) {
    charURL = "g" + charURL
    let end = charURL.lastIndexOf(`/`)
    let charID = charURL.substring(end - 2, end)
    if (charID.indexOf('/') !== -1) {
        return `00${charID.slice(1, 2)}`
    } else {
        return `0${charID}`
    }
}

function getPokemonNumber(id) {
    if (id < 10) return `00${id}`
    if (id > 9 && id < 100) {
        return `0${id}`
    } else return id
}

function fillCardFront(pokeFront, data) {
    pokeFront.setAttribute('class', 'card__face card__face--front bounceIn')
    let pic = document.createElement('img')
    pokeFront.appendChild(pic)
    pic.src = `cardBack.png`
}

function fillCardBack(pokeBack, pokeBackDiv, data) {
    pokeBack.setAttribute('class', 'card__face card__face--back')
    pokeBackDiv.setAttribute('class', 'pokeBackDiv')
    let name = document.createElement('p')
    let type = document.createElement('p')
    let move = document.createElement('p')
    let hp = document.createElement('p')
    let pic = document.createElement('img')
    let pokeNum = getPokeNumber(data.id)
    pic.setAttribute('class', 'picDivs')
    pokeBackDiv.appendChild(name)
    pokeBackDiv.appendChild(pic)
    pokeBackDiv.appendChild(type)
    pokeBackDiv.appendChild(hp)
    pokeBackDiv.appendChild(move)

    pokeBack.appendChild(pokeBackDiv)
    name.textContent = `${data.name}`
    type.textContent = `Type: ${data.types[0].type.name}`
    move.textContent = `Atk: ${data.moves[0].move.name}`
    hp.textContent = `HP: ${data.stats[5].base_stat}`

    
    pic.src = `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${getPokemonNumber(data.id)}.png`

    if(data.types[0].type.name === 'normal') {
    pokeBack.setAttribute('class', 'card__face card__face--back normal') 
        }
    if(data.types[0].type.name === 'fire') {
        pokeBack.setAttribute('class', 'card__face card__face--back fire') 
        }
    if(data.types[0].type.name === 'water') {
        pokeBack.setAttribute('class', 'card__face card__face--back water') 
        }
        if(data.types[0].type.name === 'grass') {
            pokeBack.setAttribute('class', 'card__face card__face--back grass') 
            }
            if(data.types[0].type.name === 'electric') {
                pokeBack.setAttribute('class', 'card__face card__face--back electric') 
                }
                if(data.types[0].type.name === 'ice') {
                    pokeBack.setAttribute('class', 'card__face card__face--back ice') 
                    }
                    if(data.types[0].type.name === 'fighting') {
                        pokeBack.setAttribute('class', 'card__face card__face--back fighting') 
                            }
                            if(data.types[0].type.name === 'poison' || data.types[0].type.name === 'poison') {
                                pokeBack.setAttribute('class', 'card__face card__face--back poison') 
                                }
                                if(data.types[0].type.name === 'ground') {
                                    pokeBack.setAttribute('class', 'card__face card__face--back ground') 
                                    }
                                    if(data.types[0].type.name === 'flying') {
                                        pokeBack.setAttribute('class', 'card__face card__face--back flying') 
                                        }
                                        if(data.types[0].type.name === 'psychic') {
                                            pokeBack.setAttribute('class', 'card__face card__face--back psychic') 
                                            }
                                            if(data.types[0].type.name === 'bug') {
                                                pokeBack.setAttribute('class', 'card__face card__face--back bug') 
                                                }
                                                if(data.types[0].type.name === 'rock') {
                                                    pokeBack.setAttribute('class', 'card__face card__face--back rock') 
                                                    }
                                                    if(data.types[0].type.name === 'ghost') {
                                                        pokeBack.setAttribute('class', 'card__face card__face--back ghost') 
                                                        }
                                                        if(data.types[0].type.name === 'dragon') {
                                                            pokeBack.setAttribute('class', 'card__face card__face--back dragon') 
                                                            }
                                                            if(data.types[0].type.name === 'dark') {
                                                                pokeBack.setAttribute('class', 'card__face card__face--back dark') 
                                                                }
                                                                if(data.types[0].type.name === 'steel') {
                                                                    pokeBack.setAttribute('class', 'card__face card__face--back steel') 
                                                                    }
                                                                    if(data.types[0].type.name === 'fairy') {
                                                                        pokeBack.setAttribute('class', 'card__face card__face--back fairy') 
                                                                        }
                                        
}

var snd = new Audio('pokemon.mp3');

function playGame(){
    var html = document.getElementsByTagName('main')[0];
    html.style.cssText = "display: flex";
    var playButton = document.getElementsByClassName('button3')[0];
    playButton.style.cssText = "display: none";
    var playButton = document.getElementsByClassName('headerText')[0];
    playButton.style.cssText = "display: none";
    var playButton = document.getElementsByClassName('menu')[0];
    playButton.style.cssText = "display: flex";
    
    snd.play();
    snd.loop = true;
}

function refreshPage(){
    window.location.reload();
}

function pauseSound() {
    snd.pause();
    var playButton = document.getElementsByClassName('button4')[0];
    playButton.style.cssText = "display: none";
    var playButton = document.getElementsByClassName('button5')[0];
    playButton.style.cssText = "display: initial";
}

function resumeSound() {
    snd.play();
    snd.loop = true;
    var playButton = document.getElementsByClassName('button5')[0];
    playButton.style.cssText = "display: none";
    var playButton = document.getElementsByClassName('button4')[0];
    playButton.style.cssText = "display: initial";
}