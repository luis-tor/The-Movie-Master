async function getTrendingMovies(){
    const response = await fetch(`${API_PATH}trending/movie/week?api_key=${API_KEY}&language=es`);
    const data = await response.json();
    const movies = data.results;

    movies.forEach(movie => {
        const moviesContainer = document.createElement('section');
        moviesContainer.classList.add('trending-item');
    
        const imageImg = document.createElement('img');
        imageImg.setAttribute('src', `${IMG_PATH}${movie.poster_path}`);
        imageImg.setAttribute('alt', movie.title);

        moviesContainer.appendChild(imageImg);

        const trendingMovies = document.getElementById('trending-movies');
        trendingMovies.appendChild(moviesContainer);
    });
}

async function getGenres(){
    const response = await fetch(`${API_PATH}genre/movie/list?api_key=${API_KEY}&language=es`);
    const data = await response.json();
    const genres = data.genres;

    genres.forEach(genre => {
        const genresButton = document.createElement('button');
        genresButton.classList.add('category-item');
        genresButton.setAttribute('data-id', genre.id);
        genresButton.innerText = genre.name;

        const genresList = document.getElementById('category-list');
        genresList.appendChild(genresButton);
    });
}

getTrendingMovies();
getGenres();