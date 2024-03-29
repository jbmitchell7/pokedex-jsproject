const pokemonRepository = () => {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    const add = (pokemon) => {
        if (typeof pokemon === 'object') {
            pokemonList.push(pokemon);
        }
    }

    const search = (input) => {
        let filteredList = pokemonRepository.getAll().filter(
            (nextPokemon) => nextPokemon.name.toLowerCase().indexOf(input.toLowerCase()) > -1
        ) || this.pokemonList;

        let list = document.querySelector("ul");
        list.innerHTML = "";

        filteredList.forEach(pokemon => {
            pokemonRepository.addListItem(pokemon);
        });

        if(list.innerHTML === "") {
            var emptySearch = document.createElement('h5');
            emptySearch.innerText = 'No Pokemon match your search';
            emptySearch.classList.add('search-empty');
            list.appendChild(emptySearch);
        }
    }

    const getAll = () => {
        return pokemonList;
    }

    const addListItem = (pokemon) => {
        let list = document.querySelector('ul');

        let listItem = document.createElement('li');

        let button = document.createElement('button');
        button.classList.add('pokemon-grid__item', 'btn', 'btn-primary');
        button.innerText = pokemon.name;
        button.dataset.toggle = 'modal fade';
        button.dataset.target = '#pokemon-modal'
        
        listItem.appendChild(button);
        list.appendChild(listItem);

        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    }

    const showDetails = (pokemon) => {
        loadDetails(pokemon).then(() => {
            showModal(pokemon);
        });
    }

    const loadList = async () => {
        showLoadingMessage();
        try {
            let res = await fetch(apiUrl);
            let resToJson = res.json();
            resToJson.results.forEach(item => {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
            hideLoadingMessage();
        } catch {
            throw new Error('error retrieving pokemon data');
        }
    }

    const loadDetails = async (pokemon) => {
        showLoadingMessage();
        try {
            let url = pokemon.detailsUrl;
            let res = await fetch(url);
            let resToJson = res.json();
            
            pokemon.imageUrl = resToJson.sprites.front_default;
            pokemon.hp = resToJson.stats[0].base_stat;
            pokemon.attack = resToJson.stats[1].base_stat;
            pokemon.defense = resToJson.stats[2].base_stat;
            pokemon.specialattack = resToJson.stats[3].base_stat;
            pokemon.specialdefense = resToJson.stats[4].base_stat;
            pokemon.speed = resToJson.stats[5].base_stat;
            pokemon.types = [];
            
            resToJson.types.forEach(i => {
                pokemon.types.push(i.type.name);
            });

            hideLoadingMessage();
        } catch {
            throw new Error("error getting pokemon details");
        }
    }

    const showLoadingMessage = () => {
        let loadingMessage = document.querySelector(".loading");
        loadingMessage.classList.add("show");
    }

    const hideLoadingMessage = () => {
        let loadingMessage = document.querySelector('.loading');
        loadingMessage.classList.remove("show");
    }

    const showModal = (pokemon) => {
        let modalContent = document.querySelector(".modal-content");
        let modalBody = document.querySelector(".modal-body");

        modalBody.innerHTML = '';

        let pokemonName = document.createElement('h1');
        pokemonName.classList.add('modal-name', 'text-center');
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
        getAll,
        addListItem,
        loadList,
        search,
    };
};

const displayPokemon = async () => {
    await pokemonRepository.loadList();
    pokemonRepository.getAll().forEach(pokemon => {
        pokemonRepository.addListItem(pokemon);
    })
}

displayPokemon();



