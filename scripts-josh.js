async function getData() {
	const data = await fetch('data.json');
	const jobs = await data.json();
	return jobs;
}

function handleClick(event) {
	
}

function generateItem(item) {
	const { role, level, languages, tools } = item;
	const buttons = [role, level, ...languages, ...tools];
	const article = document.createElement('article');
	
	article.classList.add('job')
	
	buttons.forEach(button => {
		const buttonElement = document.createElement('button');
		
		button.innerText = button;
		button.classList.add('filter-button');
		buttonElement.addEventListener('click', handleClick);
		
		article.appendChild(buttonElement);
	});
	
	return article;
}

async function App() {
	const container = document.querySelector('.main-section');
	const jobs = await getData();
	let filtered = [];
	
	jobs.forEach(article => {
		container.appendChild(generateItem(article));
	});
}

App();