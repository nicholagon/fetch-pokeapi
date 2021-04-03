async function getData() {
	const data = await fetch('data.json');
	const jobs = await data.json();
	return jobs;
}

async function App() {
	const jobs = await getData();
	
	// code here 👋
	console.log(jobs);
	const main = document.querySelector('.wrapper');
	
	jobs.forEach((job) => {
		// console.log(job.company)
		let languages = '';
		job.languages.forEach(lang => {
			languages += `
				<li>${lang}</li>`;
		})
		
		let tools = '';
		job.tools.forEach(tool => {
			tools += `
				<li>${tool}</li>`;
		})
		
		let topLine = `<li class="company-name">${job.company}</li>`;
		
		if (job.new === true) {
			topLine += `<li class="new-label">New!</li>`;
		}
		
		if (job.featured === true) {
			topLine += `<li class="featured-label">Featured</li>`;
		}
		
		main.innerHTML += `
			<div class="card">
				<img src="${job.logo}" class="company-logo">
				
  				<ul class="position-info">
  					<ul class="top-line">${topLine}</ul>
  					<li class="company-name">${job.company}</li>
  					<li class="position">${job.position}</li>
  					<ul class="other-details">
  						<li>${job.postedAt}</li>
  						<li>${job.contract}</li>
  						<li>${job.location}</li>
  					</ul>
  				</ul>
  				<hr>
  				<div class="tags-container">
  					<ul class="tags">
  						<li>${job.role}</li>
  						<li>${job.level}</li>
  						${languages}
  						${tools}
  					</ul>
  				</div>
  				<div class="clearfix"></div>
  			</div>
  			<div class="clearfix"></div>`;
	})
	
}

App();