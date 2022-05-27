const api = axios.create({
    baseURL: API_PATH,
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        api_key: API_KEY,
        language: 'es-MX'
    },
});

function clearWords(str){
    return decodeURIComponent(str);
}

async function getTrendingMovies(idSection){
    const {data} = await api('trending/movie/week');
    const movies = data.results;

    idSection.innerHTML = "";

    movies.forEach(movie => {
        const moviesContainer = document.createElement('section');
        moviesContainer.classList.add('trending-item');

        const movieRating = document.createElement('div');
        movieRating.classList.add('rating-trending-item');
        
        
        const imageImg = document.createElement('img');
        imageImg.setAttribute('src', `${IMG_PATH}${movie.poster_path}`);
        imageImg.setAttribute('alt', movie.title);
        
        if(idSection.id !== 'trending-movies'){
            const movieRatingText = document.createElement('p');
            movieRatingText.innerText = `${movie.vote_average/2}/5 ☆`;
            movieRating.appendChild(movieRatingText);
        }

        moviesContainer.appendChild(movieRating);
        moviesContainer.appendChild(imageImg);

        // const trendingMovies = document.getElementById('trending-movies');
        idSection.appendChild(moviesContainer);
        
    });
}

async function getGenres(){
    const {data} = await api('genre/movie/list');
    const genres = data.genres;

    categoryList.innerHTML = "";

    genres.forEach(genre => {
        const genresButton = document.createElement('button');
        genresButton.classList.add('category-item');
        // genresButton.setAttribute('data-id', genre.id);
        genresButton.addEventListener('click', () => {
            location.hash = `#category=${genre.id}-${genre.name}`;
        });
        genresButton.innerText = genre.name;

        // const genresList = document.getElementById('category-list');
        categoryList.appendChild(genresButton);
    });
}

async function getCategoryMovies(idCategory){
    const {data} = await api(`discover/movie?sort_by=popularity.desc&with_genres=${idCategory}`);
    const movies = data.results;
    const categoryName = location.hash.substring(11).split('-')[1];

    spanCategories.innerText = clearWords(categoryName);
    categoryMovies.innerHTML = "";

    movies.forEach(movie => {
        const moviesContainer = document.createElement('section');
        moviesContainer.classList.add('trending-item');

        const movieRating = document.createElement('div');
        movieRating.classList.add('rating-trending-item');
        
        
        const imageImg = document.createElement('img');
        imageImg.setAttribute('src', `${IMG_PATH}${movie.poster_path}`);
        imageImg.setAttribute('alt', movie.title);
        
        
        const movieRatingText = document.createElement('p');
        movieRatingText.innerText = `${movie.vote_average/2}/5 ☆`;
        movieRating.appendChild(movieRatingText);
        

        moviesContainer.appendChild(movieRating);
        moviesContainer.appendChild(imageImg);

        categoryMovies.appendChild(moviesContainer);
    })
}

