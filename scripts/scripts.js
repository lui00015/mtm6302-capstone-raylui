let currentPage = 1;
const limit = 15;
const totalPages = 2;

const pokemonGrid = document.getElementById("pokemonGrid");
const searchBar = document.querySelector(".search-bar");
const backBtn = document.getElementById("backBtn");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let allPokemons = [];

function fetchPokemons(offset) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then((res) => res.json())
    .then((data) => {
      const promises = data.results.map((p) =>
        fetch(p.url).then((res) => res.json())
      );
      Promise.all(promises).then((pokemonDetails) => {
        allPokemons = pokemonDetails;
        displayPokemons(allPokemons);
      });
    });
}

function displayPokemons(pokemons) {
  pokemonGrid.innerHTML = "";
  pokemons.forEach((pokemon) => {
    const card = document.createElement("div");
    card.className = "card";

    const types = pokemon.types
      .map((t) => `<span class="type ${t.type.name}">${t.type.name}</span>`)
      .join(" ");

    const isCatched = getCatchedState(pokemon.id);

    card.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${
      pokemon.name
    }" class="poke-img">
      <h3>#${pokemon.id.toString().padStart(3, "0")} ${pokemon.name}</h3>
      <div class="types-container">${types}</div>
      <label>
        <input type="checkbox" class="catched-toggle" data-id="${pokemon.id}" ${
      isCatched ? "checked" : ""
    }>
        catched
      </label>
    `;

    // popup
    card.querySelector(".poke-img").addEventListener("click", () => {
      showPopup(pokemon);
    });

    // checkbox
    const checkbox = card.querySelector(".catched-toggle");
    checkbox.addEventListener("change", (e) => {
      saveCatchedState(pokemon.id, e.target.checked);
    });

    pokemonGrid.appendChild(card);
  });
}

function updateButtons() {
  backBtn.style.display = currentPage > 1 ? "inline-block" : "none";
  loadMoreBtn.style.display =
    currentPage < totalPages ? "inline-block" : "none";
}

// search
searchBar.addEventListener("input", () => {
  const keyword = searchBar.value.toLowerCase();
  const filtered = allPokemons.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );
  displayPokemons(filtered);
});

// next page function
backBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPokemons((currentPage - 1) * limit);
    updateButtons();
  }
});

loadMoreBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchPokemons((currentPage - 1) * limit);
    updateButtons();
  }
});

// show the popup
function showPopup(pokemon) {
  const popup = document.createElement("div");
  popup.className = "popup";

  const types = pokemon.types
    .map((t) => `<span class="type ${t.type.name}">${t.type.name}</span>`)
    .join(" ");

  popup.innerHTML = `
    <div class="popup-content">
      <button class="close-btn">×</button>
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
      <h2>#${pokemon.id.toString().padStart(3, "0")} ${pokemon.name}</h2>
      <p><strong>Height:</strong> ${pokemon.height}</p>
      <p><strong>Weight:</strong> ${pokemon.weight}</p>
      <p><strong>Types:</strong> ${types}</p>
    </div>
  `;

  document.body.appendChild(popup);

  // close popup
  popup.querySelector(".close-btn").addEventListener("click", () => {
    popup.remove();
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) popup.remove();
  });

  document.addEventListener("keydown", function escHandler(e) {
    if (e.key === "Escape") {
      popup.remove();
      document.removeEventListener("keydown", escHandler);
    }
  });
}

// checkbox（Persistent Data）
function saveCatchedState(id, isChecked) {
  const saved = JSON.parse(localStorage.getItem("catched") || "{}");
  saved[id] = isChecked;
  localStorage.setItem("catched", JSON.stringify(saved));
}

function getCatchedState(id) {
  const saved = JSON.parse(localStorage.getItem("catched") || "{}");
  return !!saved[id];
}

fetchPokemons(0);
updateButtons();
