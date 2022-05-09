let searchedPokemon = ""
let pokemon
let pokemons = []
const form = document.querySelector("form")
const alert = document.querySelector(".alert")
const button = alert.querySelector("button")
const pokeHolder = document.querySelector(".pokemon_searched")
const previousPokeHolder = document.querySelector(".searchs_holder")
const loader = document.querySelector(".loader")
const resetList = document.querySelector(".reset_list")

const readLocalStorage = () => {
    const isPokemonsSet = localStorage.getItem("pokemons") !== null
    if (isPokemonsSet) {
        pokemons = JSON.parse(localStorage.getItem("pokemons"))
    }
    renderPokemon()
    renderPreviousPokemons()
}

const initFormEvents = () => {
    form.addEventListener("submit", (ev) => {
        ev.preventDefault()
        const input = form.querySelector("input")
        searchedPokemon = input.value
        fetchPokemon()
    })
}

const fetchPokemon = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + searchedPokemon
    loader.classList.remove("hidden")

    pokemon = await fetch(url)
        .then(s => s.json()).then(d => {
            pokemon = d
            console.log("hola");
            console.log(d);

            pokemons.push(pokemon)
            localStorage.setItem("pokemons", JSON.stringify(pokemons))
            renderPokemon()
            renderPreviousPokemons()
            loader.classList.add("hidden")
        })
        .catch(() => {
            renderError()
            loader.classList.add("hidden")
        })
    
}

const renderPokemon = () => {
    let pokemonsHTML = ""
    pokemons.forEach(pokemon => {

        console.log(pokemon);
        pokemonsHTML = `
        <div class="pokemon_searched">
         <div class="pokemon_pic_holder">
         <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
         </div>
         <div class="pokemon_info">
           <div class="pokemon_name">
             <h1>${pokemon.name}</h1>
           </div>
           <div class="meta_info">
             <div class="class">
             ${pokemon.types[0].type.name}
             </div>
             <div class="attacks">
               <ul>
                 <li class="attack">${pokemon.moves[0].move.name}</li>
                 <li class="attack">${pokemon.moves[1].move.name}</li>
                 <li class="attack">${pokemon.moves[2].move.name}</li>
                 <li class="attack">${pokemon.moves[3].move.name}</li>
               </ul>
             </div>
           </div>
         </div>
       </div>
    `
    })
    pokeHolder.innerHTML = pokemonsHTML
}

const renderPreviousPokemons = () => {
    let pokemonsHTML = ""
    pokemons.forEach(pokemon => {
        pokemonsHTML += `
       <div class="pokemon_card">
             <div class="pokemon_pic">
               <div class="pic_holder">
               <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
               </div>
             </div>
             <div class="pokemon_info">
               <div class="name">
                 <h2>${pokemon.name}</h2>
                 <div class="pokemon_class"> ${pokemon.types[0].type.name}</div>
               </div>
               <div class="attacks">
                 <ul>
                 <li class="attack">${pokemon.moves[0].move.name}</li>
                 <li class="attack">${pokemon.moves[1].move.name}</li>
                 <li class="attack">${pokemon.moves[2].move.name}</li>
                 <li class="attack">${pokemon.moves[3].move.name}</li>
                 </ul>
               </div>
             </div>
           </div>
    `
    })
    previousPokeHolder.innerHTML = pokemonsHTML
}

const renderError = () => {
    alert.classList.remove("hidden")
    pokeHolder.innerHTML = ""
}

const initButtonResetEvent = () => {
    button.addEventListener("click", () => {
        alert.classList.add("hidden")
        form.reset()
    })
}

const initResetListEvent = () => {
    resetList.addEventListener("click", () => {
        pokemons = []
        localStorage.setItem("pokemons", JSON.stringify(pokemons))
        renderPokemon()
    })
}

const initPokemonController = () => {
    readLocalStorage()
    initFormEvents()
    initButtonResetEvent()
    initResetListEvent()
}



export {
    initPokemonController,
    resetList
}