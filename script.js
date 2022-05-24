const insertHere = document.querySelector('.insert-here');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.form-search');

const homePage =
	'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bf9467e391642cfc4a3c239d83fff101&page=1';

const searchApi =
	'https://api.themoviedb.org/3/search/movie?api_key=bf9467e391642cfc4a3c239d83fff101&query="';

const imagePath = 'https://image.tmdb.org/t/p/w1280';

const loadAll = async (url) => {
	insertHere.innerHTML = '';
	const allMovies = await fetch(url);
	const afterJson = await allMovies.json();
	if (afterJson.length == 0) console.log('error');
	afterJson.results.forEach((each) => {
		const eachContainer = document.createElement('div');
		eachContainer.classList.add('each-container');
		eachContainer.innerHTML = `
					<img
						src="${imagePath + each.poster_path}"
						alt="${each.title}"
					/>
					<div class="movie-name">
						<h2>${each.title}</h2>
						<p>${each.vote_average}</p>
					</div>

					<div class="movie-review">
                        <h1>OVERVIEW</h1>
                        ${each.overview}
					</div>
        `;
		insertHere.appendChild(eachContainer);
	});
};

loadAll(homePage);

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const searchValue = searchInput.value;
	if (searchValue !== '' && searchValue) {
		const searchURL = `${searchApi}${searchValue}`;
		searchInput.value = '';
		loadAll(searchURL);
	} else {
		insertHere.innerHTML = 'item not found';
	}
});
