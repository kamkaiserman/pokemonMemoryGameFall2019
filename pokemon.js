//for loop to generate 13 random numbers
//duplicate and combine the 13 to become 26
//randomize the order of the 26
//call "getAPIData" for every number in string and populateDom


// async function getPokemonData(url) {
//     const response = await fetch(url)
//     return await response.json()
// }

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

for (i = 0; i < 12; i++) {
    var tempPokeID = Math.floor((Math.random() * 807) + 1);
    if(i === 0)
    {
        pokemonIDArray = [tempPokeID]
    } else {
        pokemonIDArray.push(tempPokeID)
    }
}

for (i = 0; i < 12; i++) {
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

    fillCardFront(pokeFront, single_pokemon)
    fillCardBack(pokeBack, single_pokemon)

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
    pokeFront.setAttribute('class', 'card__face card__face--front')
    let pic = document.createElement('img')
    pic.setAttribute('class', 'picDivs')
    pokeFront.appendChild(pic)
    pic.src = `https://img.mandarake.co.jp/aucimg/2/0/7/8/0001402078.jpeg`
}

function fillCardBack(pokeBack, data) {
    pokeBack.setAttribute('class', 'card__face card__face--back')
    let name = document.createElement('p')
    let pic = document.createElement('img')
    let pokeNum = getPokeNumber(data.id)
    pic.setAttribute('class', 'picDivs')
    pokeBack.appendChild(name)
    pokeBack.appendChild(pic)
    pokeBack.appendChild(name)
    name.textContent = `${data.name}`
    pic.src = `https://img.pokemondb.net/artwork/large/${data.name}.jpg`
}