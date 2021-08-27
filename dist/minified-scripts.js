let pokemonRepository=function(){let e=[],t="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(t){"object"==typeof t?(e.push(t),console.log("is an object")):console.log("not an object")}function o(e){a(e).then(function(){l(e)})}function a(e){s();let t=e.detailsUrl;return fetch(t).then(function(e){return e.json()}).then(function(t){e.imageUrl=t.sprites.front_default,e.hp=t.stats[0].base_stat,e.attack=t.stats[1].base_stat,e.defense=t.stats[2].base_stat,e.specialattack=t.stats[3].base_stat,e.specialdefense=t.stats[4].base_stat,e.speed=t.stats[5].base_stat,e.types=[],t.types.forEach(function(t){e.types.push(t.type.name)}),c()}).catch(function(e){console.error(e),c()})}function s(){document.querySelector(".loading").classList.add("show")}function c(){document.querySelector(".loading").classList.remove("show")}function l(e){let t=document.querySelector(".modal-content"),n=document.querySelector(".modal-body");n.innerHTML="";let o=document.createElement("h1");o.classList.add("modal-name","text-center"),o.innerText=e.name;let a=document.createElement("div");a.classList.add("pokemon-stats");let s=document.createElement("p");s.innerText="HP: "+e.hp;let c=document.createElement("p");c.innerText="Attack: "+e.attack;let l=document.createElement("p");l.innerText="Defense: "+e.defense;let i=document.createElement("p");i.innerText="Special Attack: "+e.specialattack;let d=document.createElement("p");d.innerText="Special Defense: "+e.specialdefense;let r=document.createElement("p");r.innerText="Speed: "+e.speed;let p=document.createElement("p");p.classList.add("pokemon-types"),p.innerText="Types: "+e.types;let m=document.createElement("img");m.classList.add("mx-auto","d-block"),m.src=e.imageUrl,a.appendChild(s),a.appendChild(c),a.appendChild(l),a.appendChild(i),a.appendChild(d),a.appendChild(r),n.appendChild(m),n.appendChild(o),n.appendChild(p),n.appendChild(a),t.appendChild(n),$("#modal-container").modal("toggle")}return{add:n,search:function(e){let t=pokemonRepository.getAll().filter(t=>t.name.toLowerCase().indexOf(e.toLowerCase())>-1)||this.pokemonList,n=document.querySelector("ul");if(n.innerHTML="",t.forEach(function(e){pokemonRepository.addListItem(e)}),""===n.innerHTML){var o=document.createElement("h5");o.innerText="No Pokemon match your search",o.classList.add("search-empty"),n.appendChild(o)}},getAll:function(){return e},addListItem:function(e){let t=document.querySelector("ul"),n=document.createElement("li"),a=document.createElement("button");a.classList.add("pokemon-grid__item","btn","btn-primary"),a.innerText=e.name,a.dataset.toggle="modal fade",a.dataset.target="#pokemon-modal",n.appendChild(a),t.appendChild(n),a.addEventListener("click",function(){o(e)})},showDetails:o,loadList:function(){return s(),fetch(t).then(function(e){return e.json()}).then(function(e){e.results.forEach(function(e){n({name:e.name,detailsUrl:e.url}),c()})}).catch(function(e){console.error(e),c()})},loadDetails:a,showLoadingMessage:s,hideLoadingMessage:c,showModal:l}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});