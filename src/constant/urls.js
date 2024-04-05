const apiKey = '920378f97b290bc247f43b5f92de4c27';

export const trendingMovies = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;

export const upcomingMovies = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

export const topRatedMovies = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;

export const castApi = item => {
  return `https://api.themoviedb.org/3/movie/${item}/credits?api_key=${apiKey}`;
};

export const imageUrl = 'https://image.tmdb.org/t/p/w500';

export const similarMoviesApi = item => {
  return `https://api.themoviedb.org/3/movie/${item}/similar?api_key=${apiKey}`;
};

export const personApi = id => {
  return `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`;
};

export const personMovieApi = id => {
  return `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}`;
};

export const searchApi = name => {
  return `https://api.themoviedb.org/3/search/movie?query=${name}&&api_key=${apiKey}`;
};
