const listaPokemons = document.getElementById("listaPokemons");
const campoBusca = document.getElementById("campoBusca");
const botaoAnterior = document.getElementById("paginaAnterior");
const botaoProxima = document.getElementById("proximaPagina");
const numeroPagina = document.getElementById("numeroPagina");

let deslocamento = 0;
const limite = 9;
let paginaAtual = 1;
let todosPokemons = [];


async function carregarListaGlobal() {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
    const dados = await resposta.json();
    todosPokemons = dados.results;
}


async function buscarPokemons(deslocamento = 0, limite = 9) {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${deslocamento}&limit=${limite}`);
    const dados = await resposta.json();

    const pokemons = await Promise.all(dados.results.map(async (pokemon) => {
    const res = await fetch(pokemon.url);
    return await res.json();
    }));

    exibirPokemons(pokemons);
    numeroPagina.textContent = `Página ${paginaAtual}`;
}


function exibirPokemons(pokemons) {
    listaPokemons.innerHTML = "";

    if (pokemons.length === 0) {
    listaPokemons.innerHTML = `
        <div class="text-center text-muted mt-3">
        <h5>Nenhum Pokémon correspondente encontrado.</h5>
        </div>
    `;
    return;
    }

    pokemons.forEach(pokemon => {
    const tipos = pokemon.types.map(t => t.type.name).join(", ");
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
        <div class="card text-center shadow-sm" data-id="${pokemon.id}">
        <div class="card-body">
            <img src="${pokemon.sprites.front_default}" class="pokemon-img mb-3" alt="${pokemon.name}">
            <h5 class="card-title text-capitalize">${pokemon.name}</h5>
            <p class="card-text mb-1"><strong>Altura:</strong> ${pokemon.height}</p>
            <p class="card-text mb-1"><strong>Peso:</strong> ${pokemon.weight}</p>
            <p class="card-text"><strong>Tipos:</strong> ${tipos}</p>
        </div>
        </div>
    `;
    card.querySelector(".card").addEventListener("click", () => mostrarDetalhesPokemon(pokemon));
    listaPokemons.appendChild(card);
    });
}

// Mostrar detalhes completos no modal
async function mostrarDetalhesPokemon(pokemon) {
    document.getElementById("tituloModalPokemon").textContent = pokemon.name.toUpperCase();
    document.getElementById("idPokemon").textContent = pokemon.id;
    document.getElementById("imagemPokemon").src = pokemon.sprites.front_default;
    document.getElementById("alturaPokemon").textContent = pokemon.height;
    document.getElementById("pesoPokemon").textContent = pokemon.weight;
    document.getElementById("tiposPokemon").textContent = pokemon.types.map(t => t.type.name).join(", ");
    document.getElementById("habilidadesPokemon").textContent = pokemon.abilities.map(a => a.ability.name).join(", ");

    // Descrição)
    const especieRes = await fetch(pokemon.species.url);
    const especie = await especieRes.json();
    const descricao = especie.flavor_text_entries.find(e => e.language.name === "en" || e.language.name === "es" || e.language.name === "pt");
    document.getElementById("descricaoPokemon").textContent = descricao ? descricao.flavor_text.replace(/\f/g, ' ') : "Descrição não disponível.";

    // Estatísticas
    const listaEstatisticas = document.getElementById("estatisticasPokemon");
    listaEstatisticas.innerHTML = "";
    pokemon.stats.forEach(stat => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${stat.stat.name.toUpperCase()}: ${stat.base_stat}`;
    listaEstatisticas.appendChild(li);
    });

    // Sprites extras
    const divSprites = document.getElementById("spritesPokemon");
    divSprites.innerHTML = "";
    Object.values(pokemon.sprites).forEach(src => {
    if (src && typeof src === "string" && src.endsWith(".png")) {
        const img = document.createElement("img");
        img.src = src;
        img.width = 80;
        divSprites.appendChild(img);
    }
    });

    new bootstrap.Modal(document.getElementById('modalPokemon')).show();
}

// Busca em tempo real (todos os pokémons)
let timeoutBusca;
campoBusca.addEventListener("input", async (e) => {
    clearTimeout(timeoutBusca);
    const termo = e.target.value.trim().toLowerCase();

    timeoutBusca = setTimeout(async () => {
    if (termo === "") {
        buscarPokemons(deslocamento, limite);
        return;
    }

    const filtrados = todosPokemons.filter(p => p.name.includes(termo)).slice(0, 20); 
    const pokemonsDetalhados = await Promise.all(filtrados.map(async p => {
        const res = await fetch(p.url);
        return await res.json();
    }));
    exibirPokemons(pokemonsDetalhados);
    }, 300);
});


botaoAnterior.addEventListener("click", () => {
    if (deslocamento > 0) {
    deslocamento -= limite;
    paginaAtual--;
    buscarPokemons(deslocamento, limite);
    }
});

botaoProxima.addEventListener("click", () => {
    deslocamento += limite;
    paginaAtual++;
    buscarPokemons(deslocamento, limite);
});


(async function init() {
    await carregarListaGlobal();
    buscarPokemons();
})();