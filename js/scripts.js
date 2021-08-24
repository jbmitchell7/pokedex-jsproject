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

    // function search() {
    //     let searchInput = document.querySelector('#search-bar');
    
    //     searchInput.addEventListener('input', function() {
    //       // Adds a Bootstrap class.
    //       let searchText = searchInput.value.toLowerCase();
    
    //       pokemonList.forEach(function(pokemon) {
    //         if (pokemon.innerText.toLowerCase().indexOf(searchText) > -1) {
    //           pokemon.style.display = '';
    //         } else {
    //           pokemon.style.display = 'none';
    //         }
    //       });
    //     });
    //   }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let list = document.querySelector('ul');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item', 'col-xs-6');
        let button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'pokemon-item');
        button.innerText = pokemon.name;
        button.dataset.toggle = 'modal fade';
        button.dataset.target = '#pokemon-modal'
        
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
                hideLoadingMessage();
            });
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    function loadDetails(pokemon) {
        showLoadingMessage();
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            pokemon.imageUrl = details.sprites.front_default;

            pokemon.hp = details.stats[0].base_stat;
            pokemon.attack = details.stats[1].base_stat;
            pokemon.defense = details.stats[2].base_stat;
            pokemon.specialattack = details.stats[3].base_stat;
            pokemon.specialdefense = details.stats[4].base_stat;
            pokemon.speed = details.stats[5].base_stat;

            pokemon.types = [];
            details.types.forEach(function (i) {
                pokemon.types.push(i.type.name);
            });

            hideLoadingMessage();
        }).catch(function (e) {
            console.error(e);
            hideLoadingMessage();
        });
    }

    function showLoadingMessage() {
        let loadingMessage = document.querySelector(".loading");
        loadingMessage.classList.add("show");
    }

    function hideLoadingMessage() {
        let loadingMessage = document.querySelector('.loading');
        loadingMessage.classList.remove("show");
    }

    function showModal(pokemon) {
        let modalContent = document.querySelector(".modal-content");
        let modalBody = document.querySelector(".modal-body");

        modalBody.innerHTML = '';

        let pokemonName = document.createElement('h1');
        pokemonName.classList.add('text-center');
        pokemonName.innerText = (pokemon.name);

        let pokemonStats = document.createElement('div');
        pokemonStats.classList.add('pokemon-stats');

        let pokemonHP = document.createElement('p');
        pokemonHP.innerText = "HP: " + pokemon.hp;

        let pokemonAttack = document.createElement('p');
        pokemonAttack.innerText = "Attack: " + pokemon.attack;

        let pokemonDefense = document.createElement('p');
        pokemonDefense.innerText = "Defense: " + pokemon.defense;

        let pokemonSpecialAttack = document.createElement('p');
        pokemonSpecialAttack.innerText = "Special Attack: " + pokemon.specialattack;

        let pokemonSpecialDefense = document.createElement('p');
        pokemonSpecialDefense.innerText = "Special Defense: " + pokemon.specialdefense;

        let pokemonSpeed = document.createElement('p');
        pokemonSpeed.innerText = "Speed: " + pokemon.speed;

        let pokemonTypes = document.createElement('p');
        pokemonTypes.classList.add('pokemon-types');
        pokemonTypes.innerText = "Types: " + pokemon.types;

        let pokemonImage = document.createElement('img');
        pokemonImage.classList.add('mx-auto', 'd-block');
        pokemonImage.src = pokemon.imageUrl;

        pokemonStats.appendChild(pokemonHP);
        pokemonStats.appendChild(pokemonAttack);
        pokemonStats.appendChild(pokemonDefense);
        pokemonStats.appendChild(pokemonSpecialAttack);
        pokemonStats.appendChild(pokemonSpecialDefense);
        pokemonStats.appendChild(pokemonSpeed);

        modalBody.appendChild(pokemonImage);
        modalBody.appendChild(pokemonName);
        modalBody.appendChild(pokemonTypes);
        modalBody.appendChild(pokemonStats);

        modalContent.appendChild(modalBody);
        

        $("#modal-container").modal("toggle");
    }

    return {
        add,
        // search,
        getAll,
        addListItem,
        showDetails,
        loadList,
        loadDetails,
        showLoadingMessage,
        hideLoadingMessage,
        showModal,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



