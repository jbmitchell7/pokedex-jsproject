let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let modalContainer = document.querySelector('#modal-container');

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
        list.classList.add('pokemon-grid');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.classList.add('pokemon-grid__item');
        button.innerText = pokemon.name;
        listItem.appendChild(button);
        list.appendChild(listItem);
        button.addEventListener('click', function (event) {
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
            pokemon.height = details.height;
            pokemon.types = details.types;
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
        
        modalContainer.innerHTML = '';
    
        let modal = document.createElement('div');
        modal.classList.add('modal');
    
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);
    
        let pokemonName = document.createElement('h1');
        pokemonName.innerText = pokemon.name;
    
        let pokemonHeight = document.createElement('p');
        pokemonHeight.innerText = "Height: " + pokemon.height;

        let pokemonImage = document.createElement('img');
        pokemonImage.src = pokemon.imageUrl;
    
        modal.appendChild(closeButtonElement);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonHeight);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
    
        modalContainer.classList.add('is-visible');
    }
    
    function hideModal() {
        
        modalContainer.classList.remove('is-visible');
    }

    // window.addEventListener('keydown', (e) => {
        
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //         hideModal();
    //     }
    // });

    // modalContainer.addEventListener('click', (e) => {
    //     let target = e.target;
    //     if (target === modalContainer) {
    //         hideModal();
    //     }
    // });

    // document.querySelector('#show-modal').addEventListener('click', () => {
    //     showModal('Modal title', 'This is content');
    // });

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
        hideModal,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});



