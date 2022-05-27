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

backArrowButtonSearch.addEventListener('click', () => {
    location.hash = window.history.back();
},false);

function navigator(){

    if(location.hash.startsWith('#trends')){
        trendingPage();
    }else if(location.hash.startsWith('#search=')){
        console.log("You are searching for: " + location.hash.substring(8));
        searchMoviePage();
    }else if (location.hash.startsWith('#movie=')){
        movieDetail();
    }else if (location.hash.startsWith('#category=')){
        categoryPage();
    }else{
        homePage();
    }

    location.hash
}

function homePage(){
    console.log("You're on the home page");

    searchForm.classList.remove('inactive');
    nameApp.classList.remove('inactive');
    homeMain.classList.remove('inactive');

    trendingMain.classList.add('inactive');
    itemDetailPage.classList.add('inactive');
    searchPage.classList.add('inactive');
    categoryPageNode.classList.add('inactive');


    getTrendingMovies(trendingMovies);
    getGenres();
}

function trendingPage(){
    console.log("You're on the trending page");
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    categoryPageNode.classList.add('inactive');

    trendingMain.classList.remove('inactive');
    getTrendingMovies(trendingMoviesPage);
}

function movieDetail(){
    console.log("You're watching a movie");
    
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    
    itemDetailPage.classList.remove('inactive');
}

function categoryPage(){
    console.log("You're in the category page");
    console.log(location.hash.substring(10).split('-')[1]);
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    trendingMain.classList.add('inactive');
    
    categoryPageNode.classList.remove('inactive');
    
    const categoryID = location.hash.substring(10).split('-')[0];
    
    getCategoryMovies(categoryID);
}

function searchMoviePage(){
    console.log("You're in the search page");
    searchForm.classList.add('inactive');
    nameApp.classList.add('inactive');
    homeMain.classList.add('inactive');
    trendingMain.classList.add('inactive');
    categoryPageNode.classList.add('inactive');
    itemDetailPage.classList.add('inactive');
    
    searchPage.classList.remove('inactive');
}