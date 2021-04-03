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
  const abilityButtons = [...abilities];
  const typeButtons = [...types];

  const article = createElementWithClass('article','card');

  const sprite = createElementWithClass('img','sprite');
  sprite.setAttribute('src', `${sprite_default}`);

  const mainInfo = renderMainInfo(id, name, height, weight);

  const buttonContainer = createElementWithClass('div', 'button-container');

  const abilityBtnDiv = createElementWithClass('div', 'abilities-container');
  abilityButtons.forEach(button => {
    const buttonElement = createElementWithClass('button', 'filter-button', 'ability');

    buttonElement.innerText = button.ability.name;
    // buttonElement.addEventListener('click', console.log('yay'));
    abilityBtnDiv.appendChild(buttonElement);
  })

  const typeBtnDiv = createElementWithClass('div', 'types-container');
  typeButtons.forEach(button => {
    const buttonElement = createElementWithClass('button', 'filter-button', 'types');

    buttonElement.innerText = button.type.name;
    // buttonElement.addEventListener('click', console.log('yay'));
    typeBtnDiv.appendChild(buttonElement);
  })

  buttonContainer.appendChild(typeBtnDiv);
  buttonContainer.appendChild(abilityBtnDiv);
  
  article.append(sprite, mainInfo, buttonContainer)

  return article;

}

function renderMainInfo(id, name, height, weight) {
  const mainInfo = createElementWithClass('ul','pokemon-info');

  const pokeId = createElementWithClass('li','pokemon-id');
  pokeId.innerText = `#${id}`;
  mainInfo.appendChild(pokeId);

  const pokemonName = createElementWithClass('li','pokemon-name');
  pokemonName.innerText = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  mainInfo.appendChild(pokemonName);

  const otherDetails = createElementWithClass('ul','other-details');
  
  const heightData = createElementWithClass('li');
  heightData.innerText = `Height: ${height*10} cm`
  otherDetails.appendChild(heightData);
  
  const weightData = createElementWithClass('li');
  weightData.innerText = `Weight: ${weight/10} kg`
  otherDetails.appendChild(weightData);
  
  mainInfo.appendChild(otherDetails);

  return mainInfo;
}

function createElementWithClass(element, ...classes) {
  const item = document.createElement(element);
  classes.forEach(className => {
    item.classList.add(className);
  })
  return item;
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