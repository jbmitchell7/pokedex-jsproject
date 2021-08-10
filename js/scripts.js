let pokemonList = [
    { name: 'Bulbasaur', type: ['Grass'], height: 0.7 },
    { name: 'Ivysaur', type: ['Grass'], height: 1 },
    { name: 'Venusaur', type: ['Grass'], height: 2 },
    { name: 'Charmander', type: ['Fire'], height: 0.6 },
    { name: 'Charmeleon', type: ['Fire'], height: 1.1 },
    { name: 'Charizard', type: ['Fire'], height: 1.7 },
    { name: 'Squirtle', type: ['Water'], height: 0.5 },
    { name: 'Wartortle', type: ['Water'], height: 1 },
    { name: 'Blastoise', type: ['Water'], height: 1.6 }
];

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 1.5) {
        document.write(`<main>${pokemonList[i].name}  (Height: ${pokemonList[i].height}) -Wow that's big!<br></main>`);
    } else {
        document.write(`<main>${pokemonList[i].name}  (Height: ${pokemonList[i].height}) <br></main>`);
    }
}