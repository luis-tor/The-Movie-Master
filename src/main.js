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

function calculateAge(birthday,deathday){
    const today = new Date(deathday);
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function renderMovies(containerID,movies){
    
    containerID.innerHTML = "";

    movies.forEach(movie => {
        const moviesContainer = document.createElement('section');
        moviesContainer.classList.add('trending-item');

        const movieRating = document.createElement('div');
        movieRating.classList.add('rating-trending-item');
        
        
        let imageImg = "";
        if(movie.poster_path !== null && movie.poster_path !== ""){
            imageImg = document.createElement('img');
            imageImg.setAttribute('src', `${IMG_PATH}${movie.poster_path}`);
            imageImg.setAttribute('alt', movie.title);
            imageImg.setAttribute('loading', 'lazy');
            moviesContainer.appendChild(imageImg);
        }else{
            imageImg = document.createElement('div');
            const imageName = document.createElement('p');
            imageName.innerText = movie.title;
            imageImg.appendChild(imageName);
            imageImg.classList.add('default-image','default-movie');
            moviesContainer.appendChild(imageImg);
        }

        imageImg.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });
        
        if(containerID.id !== 'trending-movies' && containerID.id !== 'similar-movies' && containerID.id !== 'credit-movies'){    
            const movieRatingText = document.createElement('p');
            movieRatingText.innerText = `${movie.vote_average}/10 ☆`;
            movieRating.appendChild(movieRatingText);
        }

        moviesContainer.appendChild(movieRating);
        

        // const trendingMovies = document.getElementById('trending-movies');
        containerID.appendChild(moviesContainer);
        
    });
}

function renderCast(containerID,actors){
    containerID.innerHTML = "";

    actors.forEach(actor => {
        const characterCard = document.createElement('section');
        characterCard.classList.add('cast-member');

        characterCard.addEventListener('click', () => {
            location.hash = `#person=${actor.id}`;
        });

        const characterImage = document.createElement('img');
        characterImage.setAttribute('src', `${IMG_PATH}${actor.profile_path}`);
        characterImage.setAttribute('alt', actor.name);
        characterImage.setAttribute('loading', 'lazy');

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
    let movies = data.results;

    idSection.innerHTML = "";

    if(idSection.id === 'trending-movies'){
        movies = movies.slice(0,10);
    }

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

    let posterImage = ""
    if(movie.poster_path !== null && movie.poster_path !== ""){
        posterImage = document.createElement('img');
        posterImage.setAttribute('src', `${IMG_PATH}${movie.poster_path}`);
        posterImage.setAttribute('alt', movie.title);
        posterImage.classList.add('hero-image_thumbnail');
    }else{
        posterImage = document.createElement('div');
        const imageName = document.createElement('p');
        imageName.innerText = movie.title;
        posterImage.appendChild(imageName);
        posterImage.classList.add('default-image','default-poster');
    }
    
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

    belongCollection.innerHTML = "";

    const titleCollection = document.createElement('h4');
    titleCollection.innerText = "Pertenece a la colección";

    const collection = document.createElement('div');
    collection.classList.add('collection-info');

    const collectionImage = document.createElement('img');
    collectionImage.setAttribute('src', `${IMG_PATH}${movie.belongs_to_collection.backdrop_path}`);
    collectionImage.setAttribute('alt', movie.belongs_to_collection.name);

    const collectionName = document.createElement('p');
    collectionName.innerText = movie.belongs_to_collection.name;
    collectionName.classList.add('collection-button');

    collection.appendChild(collectionImage);
    collection.appendChild(collectionName);

    collection.addEventListener('click', () => {
        location.hash = `#collection=${movie.belongs_to_collection.id}`;
    });
    
    belongCollection.appendChild(titleCollection);
    belongCollection.appendChild(collection);



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

async function getPersonInfo(idPerson){
    const {data: person} = await api(`person/${idPerson}`);

    let age = 0;

    personImage.innerHTML = "";
    personGeneralInfo.innerHTML = "";
    
    const personPoster = document.createElement('img');
    personPoster.setAttribute('src', `${IMG_PATH}${person.profile_path}`);
    personPoster.setAttribute('alt', person.name);
    personPoster.classList.add('hero-image_thumbnail');
    
    personImage.appendChild(personPoster);
    
    const personName = document.createElement('h2');
    personName.classList.add('name-person');
    personName.innerText = person.name;

    personGeneralInfo.appendChild(personName);

    
    
    
    
    const personBirthday = document.createElement('p');
    personBirthday.classList.add('birthday-person');
    personBirthday.innerHTML =  '<span class="legend-detail">Fecha de nacimiento </span>'+person.birthday;
    personGeneralInfo.appendChild(personBirthday);
    
    if(person.deathday !== null){
        age = calculateAge(person.birthday,person.deathday);
        const personDeathday = document.createElement('p');
        personDeathday.classList.add('deathday-person');
        personDeathday.innerHTML = '<span class="legend-detail">Fecha de fallecimiento </span>'+ person.deathday;
        personGeneralInfo.appendChild(personDeathday);
    }else{
        age = calculateAge(person.birthday,new Date());
    }

    
    const personAge = document.createElement('p');
    personAge.classList.add('age-person');
    personAge.innerHTML = '<span class="legend-detail">Edad </span>'+ age;
    personGeneralInfo.appendChild(personAge);

    
    const personPlaceOfBirth = document.createElement('p');
    personPlaceOfBirth.classList.add('birthplace-person');
    personPlaceOfBirth.innerHTML = '<span class="legend-detail">Lugar de nacimiento </span>'+ person.place_of_birth;
    personGeneralInfo.appendChild(personPlaceOfBirth);

    
}

async function getPersonMovies(idPerson){
    const {data} = await api(`person/${idPerson}/movie_credits`);
    const movies = data.cast;

    creditMovies.innerHTML = "";

    renderMovies(creditMovies,movies);
}

async function getCollectionDetail(idCollection){
    const {data} = await api(`collection/${idCollection}`);

    collectionDetail.innerHTML = "";
    renderMovies(collectionMovies,data.parts);

    collectionName.innerText = "";
    collectionName.innerText = data.name;

    collectionDetail.innerText = "";
    collectionDetail.innerText = data.overview;
}