const pokemonName = document.querySelector('.pokemonName')
const pokemonNumber = document.querySelector('.pokemonNumber')
const pokemonImage = document.querySelector('.pokemonImage')
const pokemonForm = document.querySelector('.form')
const pokemonInput = document.querySelector('.inputSearch')
const ButtonPrev = document.querySelector('.btnPrev')
const ButtonNext = document.querySelector('.btnNext')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    const data = await fetchPokemon (pokemon);

    if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    pokemonInput.value = ''
    searchPokemon = data.id
    } else {
        pokemonName.innerHTML = 'Not Found'
        pokemonNumber.innerHTML = ''
        pokemonImage.style.display = 'none'
    }
}

pokemonForm.addEventListener('submit', (e) => {
    e.preventDefault()
    renderPokemon(pokemonInput.value.toLowerCase())
    pokemonInput.value = ''
})

ButtonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

ButtonNext.addEventListener('click', () => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)