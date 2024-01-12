// Store elements from HTML
// 'H' represents HTML
const pokemonNameH = document.getElementById("pokemon-name");
const pokemonIDH = document.getElementById("pokemon-id");
const weightH = document.getElementById("weight");
const heightH = document.getElementById("height");
const imageH = document.getElementById("image");
const typesH = document.getElementById("types");
const hpH = document.getElementById("hp");
const attackH = document.getElementById("attack");
const defenseH = document.getElementById("defense");
const specialAttackH = document.getElementById("special-attack");
const specialDefenseH = document.getElementById("special-defense");
const speedH = document.getElementById("speed");
const buttonH = document.getElementById("search-button");
const inputH = document.getElementById("search-input");

// API
const pokeAPI = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";

// Main entry function
// Will make a request to the API. If it succeeds, the page will be updated with the pokemon data. If failure, an error will be displayed
const whosThatPokemon = async () => {
    // Clean input of special characters, account for male/female symbol and '.' char
    let input = inputH.value.toLowerCase().split("");
    let cleanedInput = [];
    for (let i = 0; i < input.length; ++i) {
        if (input[i] >= 'a' && input[i] <= 'z' || input[i] >= '0' && input[i] <= '9') {
            cleanedInput.push(input[i]);
        } else if (i === 2 && input[i] === '.') {
            cleanedInput.push('-');
        } else if (i === input.length - 1 && (input[i] === '♀')) {
            cleanedInput.push('-');
            cleanedInput.push('f');
        } else if (i === input.length - 1 && (input[i] === '♂')) {
            cleanedInput.push('-');
            cleanedInput.push('m');
        }
    }
    input = cleanedInput.join("");
    
    // Query the API
    try {
        const res = await fetch(pokeAPI + input);
        const data = await res.json();
        addPokemonData(data);
    } catch (err) {
        alert("Pokemon not found!");
        clearPokemonData();
        console.log(err);
    }

    inputH.value = "";
}

// Adds pokemon data to the main HTML
const addPokemonData = (data) => {
    // Destructure elements from pokemon object
    let {name} = data;
    const {height, id, sprites, stats, types, weight} = data;
    const {front_default} = sprites;

    // Add female/male symbol back to name, capitalize letters
    name = name.split("");
    if (name[name.length - 1] === "f") {
        name.pop();
        name.pop();
        name.push('♀');
    } else if (name[name.length - 1] === "m") {
        name.pop();
        name.pop();
        name.push('♂');            
    }
    name = name.join("");
    name = name.toUpperCase();
    
    // Update HTML
    clearPokemonData();
    pokemonNameH.innerHTML = `<p>${name}</p>`;
    pokemonIDH.innerHTML = `<p>#${id}</p>`;
    weightH.innerHTML = `<p>Weight: ${weight}</p>`;
    heightH.innerHTML = `<p>Height: ${height}</p>`;
    imageH.innerHTML = `<img id="sprite" src="${front_default}" alt="Front sprite of ${name}"/>`;
    hpH.innerHTML = `<p>${stats[0].base_stat}</p>`;
    attackH.innerHTML = `<p>${stats[1].base_stat}</p>`;
    defenseH.innerHTML = `<p>${stats[2].base_stat}</p>`;
    specialAttackH.innerHTML = `<p>${stats[3].base_stat}</p>`;
    specialDefenseH.innerHTML = `<p>${stats[4].base_stat}</p>`;
    speedH.innerHTML = `<p>${stats[5].base_stat}</p>`;
    for (let i = 0; i < types.length; ++i) {
        typesH.innerHTML += `<p>${types[i].type.name}</p>`;
    }
}

// Clears HTML elements
const clearPokemonData = () => {
    pokemonNameH.innerHTML = ``;
    pokemonIDH.innerHTML = ``;
    weightH.innerHTML = ``;
    heightH.innerHTML = ``;
    imageH.innerHTML = ``;
    hpH.innerHTML = ``;
    attackH.innerHTML = ``;
    defenseH.innerHTML = ``;
    specialAttackH.innerHTML = ``;
    specialDefenseH.innerHTML = ``;
    speedH.innerHTML = ``; 
    typesH.innerHTML = ``;   
}

// Event handlers
buttonH.addEventListener("click", whosThatPokemon);
inputH.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        whosThatPokemon();
    }
});
