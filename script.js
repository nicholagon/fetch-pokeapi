async function getData(url) {
	const data = await fetch(url);
	const pokemon = await data.json();
	return pokemon;
}

function generateItem(item, index) {
  // Sprite
  // ID, Name
  // Height, Weight
  // Abilities
  // Types
  console.log(item)
  const sprite_default = item.sprites.front_default;
  const {id, name, height, weight, abilities, types} = item;
  const article = document.createElement('article');
  article.classList.add('card');

  // Add sprite
  const sprite = document.createElement('img');
  sprite.classList.add('sprite');
  sprite.setAttribute('src', `${sprite_default}`);
  article.appendChild(sprite);

  // Add main info
  const main_info = document.createElement('ul');
  main_info.classList.add('pokemon-info');

  const pokeId = document.createElement('li');
  pokeId.classList.add('pokemon-id');
  pokeId.innerText = `#${id}`;
  main_info.appendChild(pokeId)

  article.appendChild(main_info);

  // Add abilities and types
  

  return article;

}

async function App() {
  const main = document.querySelector('.main-section');

  let pokemonList = [];
  
  for(let i = 1; i <= 150; i++) {
    pokemonList.push(
      fetch('https://pokeapi.co/api/v2/pokemon/' + i)
      .then(response => response.json())
    )
  }

  await Promise.all(pokemonList).then((data) => {
    console.log(data)
    data.forEach(item => {
      main.appendChild(generateItem(item));
    })
  })
}

App();