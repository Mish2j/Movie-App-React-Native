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
export const MOVIE_WITH_GENRE = `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=`;
export const MOVIE_VIDEO = `https://www.youtube.com/watch?v=`;

// get similar movies
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=<<api_key>>&language=en-US&page=1

// get movie images
// https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US

const AUTH_KEY = "AIzaSyCP4hPvdzEt2XRQ43tu5skMc2t2kdCIHFE";
export const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${AUTH_KEY}`;

export const MOVIE_GENRES = [
  { id: 1, name: "All" },
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
