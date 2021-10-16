//TO DO: 
// - ADD Hover effect on each card, When click display more information about pokemon
// - ADD Search button where we can search specific pokemon
// - ADD header to the Pokedex 

const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const colors = {
    fire: '#d19444',  //'#FDDFDF'
    grass: '#98d7a5', //'#DEFDE0'
    electric: '#e2e472', //#FCF7DE
    water: 'rgb(66, 173, 206)', //'#DEF3FD'
    ground: '#7e5e08', //#f4e7da
    rock: '#6d530e', //#d5d5d4
    fairy: 'pink', //'#fceaff'
    poison: '#b350d1', //'#98d7a5'
    bug: '#aed390', //'#f8d5a3'
    dragon: '#97b3e6',
    psychic: '#af449d', //#eaeda1
    flying: '#848adf', //#F5F5F5
    fighting: '#cf6c5a',
    normal: '#c0c0c0' //'#F5F5F5'
};

const main_types = Object.keys(colors);
console.log(main_types);

const fetchPokemons = async () => {
    for(let i=1; i<=pokemons_number; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => { // 1st: Get Data from pokeapi
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon){
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonElement.style.backgroundColor = color;

    // add ons: const type to uppercase
    var typeUpper = type[0].toUpperCase() + type.slice(1);
    //make pokemon.name first letter Uppercase + pokemon.name sliced first letter

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
        </div>
            <div class="info"> 
                <span class="number">#${pokemon.id.toString().padStart(3, '0')}</span>
                <h3 class="name">${name}</h3>
                <small class="type"><span>${typeUpper}</span></small>
            </div>
    `;

    pokemonElement.innerHTML = pokeInnerHTML;

    poke_container.appendChild(pokemonElement);
}

