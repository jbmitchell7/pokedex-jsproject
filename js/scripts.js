let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        if (typeof pokemon === 'object') {
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
        button.classList.add('pokemon-list__item');
        button.innerText = pokemon.name;
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function loadList() {
         // showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        // showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showLoadingMessage() {
        let loadingMessage = document.createElement('h2');
        loadingMessage.classList.add('loading');
        loadingMessage.innerText = "Loading Pokemon";
    }

    function hideLoadingMessage() {
        let loadingMessage = document.querySelector('.loading');
        loadingMessage.parentElement.removeChild(loadingMessage);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage
        // search: search
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

