export const API_KEY = "adaa08537ddd69ed26db726612aff9f5";
const BASE_URL = "https://api.themoviedb.org/3/";
const BASE_QUERY = "&language=en-US&page=1";
const VIDEO_QUERY = `&append_to_response=videos`;
export const IMAGE_URL = `https://image.tmdb.org/t/p/original`;

export const POPULAR_MOVIES = `${BASE_URL}movie/popular?api_key=${API_KEY}${BASE_QUERY}`;
export const TOP_RATED_MOVIES = `${BASE_URL}movie/top_rated?api_key=${API_KEY}${BASE_QUERY}`;
export const UPCOMING_MOVIES = `${BASE_URL}movie/upcoming?api_key=${API_KEY}${BASE_QUERY}`;
export const SEARCH_MOVIE = `${BASE_URL}search/movie?api_key=${API_KEY}${BASE_QUERY}&query=`;
export const MOVIE_DETAIL_PRE = `${BASE_URL}movie/`;
export const MOVIE_DETAIL_POST = `?api_key=${API_KEY}${VIDEO_QUERY}`;
