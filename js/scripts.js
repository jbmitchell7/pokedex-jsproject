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

    //check for correct keys
    // Object.keys(pokemon).every(function (item) {
    //     return ["name", "type", "height"].includes(item)
    // })

    //search function
    // without arrow function
    // pokemonList.filter(function(item) { 
    //      return item.name.toLowerCase().indexOf('ChAr'.toLowerCase()) > - 1;
    // })

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let list = document.querySelector('ul');
        list.classList.add('pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.classList.add('view-pokemon');
        button.innerText = pokemon.name;
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', showDetails(pokemon));
    }

    function showDetails(pokemon) {
        console.log(pokemon.name);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
        // search: search
    };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon); 
});

