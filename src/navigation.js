window.addEventListener('hashchange', navigator, false);
window.addEventListener('DOMContentLoaded', navigator, false);

trendingButton.addEventListener('click', () => {
    location.hash = '#trends';
});

searchButton.addEventListener('click', () => {
    location.hash = `#search=${searchInput.value}`;
},false);

backArrowButtonTrending.addEventListener('click', () => {
    location.hash = window.history.back();
},false);

backArrowButtonCategories.addEventListener('click', () => {
    location.hash = window.history.back();
},false);

backArrowButtonDetail.addEventListener('click', () => {
    location.hash = window.history.back();
},false);

backArrowButtonSearch.addEventListener('click', () => {
    location.hash = window.history.back();
},false);

backArrowButtonPerson.addEventListener('click', () => {
    location.hash = window.history.back();
},false);

function navigator(){

    if(location.hash.startsWith('#trends')){
        trendingPage();
    }else if(location.hash.startsWith('#search=')){
        searchMoviePage();
    }else if (location.hash.startsWith('#movie=')){
        movieDetail();
    }else if (location.hash.startsWith('#category=')){
        categoryPage();
    }else if(location.hash.startsWith('#person=')){
        personDetailPage();
    }else{
        homePage();
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function homePage(){
    

    searchForm.classList.remove('inactive');
    nameApp.classList.remove('inactive');
    homeMain.classList.remove('inactive');

    trendingMain.classList.add('inactive');
    itemDetailPage.classList.add('inactive');
    searchPage.classList.add('inactive');
    categoryPageNode.classList.add('inactive');
    personPage.classList.add('inactive');


    getTrendingMovies(trendingMovies);
    getGenres();
}

function trendingPage(){
    
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    categoryPageNode.classList.add('inactive');
    personPage.classList.add('inactive');

    trendingMain.classList.remove('inactive');
    getTrendingMovies(trendingMoviesPage);
}

function movieDetail(){

    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    trendingMain.classList.add('inactive');
    categoryPageNode.classList.add('inactive');
    searchPage.classList.add('inactive');
    personPage.classList.add('inactive');
    
    itemDetailPage.classList.remove('inactive');

    const movieID = location.hash.substring(7);
    

    getMovieDetail(movieID);
    getSimilarMovies(movieID);
    getMovieCast(movieID);
}

function categoryPage(){
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    trendingMain.classList.add('inactive');
    personPage.classList.add('inactive');
    
    categoryPageNode.classList.remove('inactive');
    
    const categoryID = location.hash.substring(10).split('-')[0];
    
    getCategoryMovies(categoryID);
}

function searchMoviePage(){
    
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    trendingMain.classList.add('inactive');
    categoryPageNode.classList.add('inactive');
    itemDetailPage.classList.add('inactive');
    personPage.classList.add('inactive');

    searchPage.classList.remove('inactive');
    const movieSearched = location.hash.substring(8);
    getSearchMovie(movieSearched);
}

function personDetailPage(){
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    trendingMain.classList.add('inactive');
    categoryPageNode.classList.add('inactive');
    itemDetailPage.classList.add('inactive');
    searchPage.classList.add('inactive');
    
    personPage.classList.remove('inactive');
    const personID = location.hash.substring(8);
    getPersonInfo(personID);
    getPersonMovies(personID);
}