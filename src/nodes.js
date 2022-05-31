const $ = (id) => document.querySelector(id);

// Home Page
const searchForm = $('#searchForm');
const nameApp = $('#name-app');
const homeMain = $('#home-page');

// Trending Section
const trendingMovies = $('#trending-movies');
const trendingMoviesPage = $('#trending-movies-page');
const trendingMain = $('#trending-page');
const trendingButton = $('#trending-button');
const backArrowButtonTrending = $('#back-button-trending');
const backArrowButtonCategories = $('#back-button-categories');
const backArrowButtonDetail = $('#back-button-detail');
const backArrowButtonSearch = $('#back-button-search');
const backArrowButtonPerson = $('#back-button-person');
const backArrowButtonCollection = $('#back-button-collection');

// Categories Section
const categoryList = $('#category-list');
const categoryPageNode = $('#category-page');

// Movie Detail
const itemDetailPage = $('#movieDetail');
const itemPoster = $('#item-poster');
const itemTittle = $('.item-tittle');
const itemDescription = $('.item-text');
const itemRating = $('.item-rating');
const itemGrade = $('.grade-info');
const itemRelease = $('.item-release');
const itemDuration = $('.item-duration');
const itemBudget = $('.item-budget');
const itemRevenue = $('.item-revenue');
const itemGenres = $('.item-genres');

const detailItems = [itemPoster, itemTittle, itemDescription, itemRating, itemGrade, itemRelease, itemDuration, itemBudget, itemRevenue, itemGenres];

const castMembers = $('#cast-members');
const similarMovies = $('#similar-movies');

const belongCollection = $('#belong-collection');

// Search
const searchPage = $('#search-page');
const searchButton = $('#search-button');
const searchInput = $('#search-input');
const searchResultsPage = $('#search-results');

//Categories Page
const spanCategories = $('#category-name');
const categoryMovies = $('#category-movies');

//Person Page
const personPage = $('#person-page');
const personImage = $('#person-image');
const personGeneralInfo = $('#general-info-person');

const creditMovies = $('#credit-movies');

//Collection Page
const collectionPage = $('#collection-page');
const collectionName = $('#collection-name');
const collectionDetail = $('#collection-detail');
const collectionMovies = $('#collection-movies');