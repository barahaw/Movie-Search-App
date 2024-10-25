const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=ec332d19e6fed067df0160ce34067cc4";

document.addEventListener("DOMContentLoaded", () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    displayError("oops No favorite movies found in your Favorites List.");
  } else {
    favorites.forEach((movieId) => {
      fetchMovieDetails(movieId).then((movie) => {
        displayFavorite(movie);
      });
    });
  }
});

const fetchMovieDetails = (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?${API_KEY}`;

  return fetch(url).then((response) => response.json());
};

const displayFavorite = (movie) => {
  const favoritesResults = document.getElementById("favoritesResults");

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie");

  movieElement.innerHTML = `
      <img src="${
        movie.poster_path ? IMAGE_URL + movie.poster_path : "placeholder.jpg"
      }" alt="${movie.title} Poster">
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date}</p>
      <p>Rating: ${movie.vote_average}</p>
      <button onclick="removeFromFavorites('${
        movie.id
      }')">Remove from Favorites</button>
  `;

  favoritesResults.appendChild(movieElement);
};

const removeFromFavorites = (movieId) => {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((id) => id !== movieId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload(); // Reload to refresh the favorites list
};

const displayError = (message) => {
  const favoritesResults = document.getElementById("favoritesResults");
  favoritesResults.innerHTML = `<p class="error">${message}</p>`;
  favoritesResults.style.color = "white";
};
