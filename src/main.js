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

function renderMovies(containerID,movies){
    
    containerID.innerHTML = "";

    movies.forEach(movie => {
        const moviesContainer = document.createElement('section');
        moviesContainer.classList.add('trending-item');

        const movieRating = document.createElement('div');
        movieRating.classList.add('rating-trending-item');
        
        
        const imageImg = document.createElement('img');
        imageImg.setAttribute('src', `${IMG_PATH}${movie.poster_path}`);
        imageImg.setAttribute('alt', movie.title);

        imageImg.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });
        
        if(containerID.id !== 'trending-movies' && containerID.id !== 'similar-movies'){    
            const movieRatingText = document.createElement('p');
            movieRatingText.innerText = `${movie.vote_average}/10 ☆`;
            movieRating.appendChild(movieRatingText);
        }

        moviesContainer.appendChild(movieRating);
        moviesContainer.appendChild(imageImg);

        // const trendingMovies = document.getElementById('trending-movies');
        containerID.appendChild(moviesContainer);
        
    });
}

function renderCast(containerID,actors){
    containerID.innerHTML = "";

    actors.forEach(actor => {
        const characterCard = document.createElement('section');
        characterCard.classList.add('cast-member');

        const characterImage = document.createElement('img');
        characterImage.setAttribute('src', `${IMG_PATH}${actor.profile_path}`);
        characterImage.setAttribute('alt', actor.name);

        const castInfoContainer = document.createElement('div');
        castInfoContainer.classList.add('cast-info-container');

        const castName = document.createElement('p');
        castName.classList.add('real-name');
        castName.innerText = actor.name;

        const castCharacter = document.createElement('p');
        castCharacter.classList.add('character-name');
        castCharacter.innerText = actor.character;

        castInfoContainer.appendChild(castCharacter);
        castInfoContainer.appendChild(castName);

        characterCard.appendChild(characterImage);
        characterCard.appendChild(castInfoContainer);


        containerID.appendChild(characterCard);
    });
}

async function getTrendingMovies(idSection){
    const {data} = await api('trending/movie/week');
    const movies = data.results;

    idSection.innerHTML = "";

    renderMovies(idSection,movies);
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

    renderMovies(categoryMovies,movies);
}

async function getSearchMovie(search){
    const {data} = await api(`search/movie?query=${search}`);
    const movies = data.results;

    searchResultsPage.innerHTML = "";

    renderMovies(searchResultsPage,movies);

    searchInput.value = "";
}

async function getMovieDetail(idMovie){
    const { data: movie} = await api(`movie/${idMovie}`);

    

    detailItems.forEach(item => {
        item.innerHTML = "";
    })

    const posterImage = document.createElement('img');
    posterImage.setAttribute('src', `${IMG_PATH}${movie.poster_path}`);
    posterImage.setAttribute('alt', movie.title);
    posterImage.classList.add('hero-image_thumbnail');
    
    const spanLegend = document.createElement('span');
    spanLegend.classList.add('legend-detail');

    let stars = Math.trunc(movie.vote_average);
    for(let i = 0; i < stars; i++){
        const star = document.createElement('span');
        star.classList.add('material-symbols-outlined','fill-support');
        star.innerText = 'star';
        itemRating.appendChild(star);
    }

    const halfStar = movie.vote_average % 1;
    if(halfStar > 0){
        stars += 1; 
        const star = document.createElement('span');
        star.classList.add('material-symbols-outlined','fill-support');
        star.innerText = 'star_half';
        itemRating.appendChild(star);
    }

    const emptyStars = 10 - stars;

    for(let i = 0; i < emptyStars; i++){
        const star = document.createElement('span');
        star.classList.add('material-symbols-outlined');
        star.innerText = 'grade';
        itemRating.appendChild(star);
    }



    itemTittle.innerText = movie.title;
    itemDescription.innerText = movie.overview;
    
    itemGrade.innerText = `${movie.vote_average}/10`;

    spanLegend.innerText = "Estreno";
    itemRelease.innerHTML = movie.release_date + spanLegend.outerHTML;

    spanLegend.innerText = "Duración";
    itemDuration.innerHTML = `${movie.runtime} min ${spanLegend.outerHTML}`;

    spanLegend.innerText = "Presupuesto";
    itemBudget.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.budget) + spanLegend.outerHTML;

    spanLegend.innerText = "Ganancias";
    itemRevenue.innerHTML = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(movie.revenue) + spanLegend.outerHTML;

    spanLegend.innerText = "Géneros";
    itemGenres.innerHTML = movie.genres.map(genre => genre.name).join(', ') + spanLegend.outerHTML;
    

    itemPoster.appendChild(posterImage);
}

async function getSimilarMovies(idMovie){
    const {data} = await api(`movie/${idMovie}/similar`);
    const movies = data.results;

    similarMovies.innerHTML = "";

    renderMovies(similarMovies,movies);
}

async function getMovieCast(idMovie){
    const {data} = await api(`movie/${idMovie}/credits`);
    const cast = data.cast;
    const actors = cast.filter(actor => actor.known_for_department === 'Acting').slice(0,10);

    console.log(actors);


    renderCast(castMembers,actors);
}