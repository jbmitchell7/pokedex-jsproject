let pokemonRepository = (function() {
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

    function add(pokemon) {
        if (typeof pokemon === 'object'){
            pokemonList.push(pokemon);
            console.log('is an object');
        } else {
            console.log('not an object');
        }
        
    }

    // function add(pokemon) {
    //     if (typeof pokemon === 'object' && Object.keys(pokemon) === ['name', 'type', 'height']){
    //         pokemonList.push(pokemon);
    //         console.log('is an object and all keys match');
    //     } else {
    //         console.log('not an object');
    //         console.log(Object.keys(pokemon) != ['name', 'type', 'height']);
    //     }
        
    // }

    // function search(searchItem) {
    //     pokemonList.forEach(function(pokemon) {
    //         if (pokemon.name === searchItem) {
    //             return true;
    //         }
    //     })

    //     return pokemonList.filter();
    // }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll,
        search: search
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    if (pokemon.height >= 1.5) {
        document.write(`<main>${pokemon.name}  (Height: ${pokemon.height}) -Wow that's big!<br></main>`);
    } else {
        document.write(`<main>${pokemon.name}  (Height: ${pokemon.height}) <br></main>`);
    }
});

// console.log(pokemonRepository.search('Bulbasaur'))
