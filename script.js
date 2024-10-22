const API_KEY = "api_key=ec332d19e6fed067df0160ce34067cc4"; // API Key
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&${API_KEY}`; // Template literal
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = `${BASE_URL}/search/movie?${API_KEY}`;

document.getElementById("searchButton").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  searchMovies(query);
});

document.addEventListener("DOMContentLoaded", () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        const randomMovies = getRandomMovies(data.results, 5); // Get 5 random movies
        displayResults(randomMovies);
      } else {
        displayError("No movies found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayError("An error occurred while fetching data.");
    });
});

const searchMovies = (query) => {
  const url = `${SEARCH_URL}&query=${encodeURIComponent(query)}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.results.length > 0) {
        displayResults(data.results);
      } else {
        displayError("No results found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayError("An error occurred while fetching data.");
    });
};

const displayResults = (movies) => {
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = "";

  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
            <img src="${
              movie.poster_path
                ? IMAGE_URL + movie.poster_path
                : "placeholder.jpg"
            }" alt="${movie.title} Poster">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <button onclick="addToFavorites('${
              movie.id
            }')">Save to Favorites</button>
            <button onclick="showDetails('${movie.id}')">View Details</button>
        `;

    resultsSection.appendChild(movieElement);
  });
};

const displayError = (message) => {
  const resultsSection = document.getElementById("results");
  resultsSection.innerHTML = `<p class="error">${message}</p>`;
};

const showDetails = (movieId) => {
  fetchMovieDetails(movieId).then((movie) => {
    const modal = document.getElementById("detailsModal");
    const modalContent = document.getElementById("modalContent");

    modalContent.innerHTML = `
            <span class="close" onclick="closeModal()">&times;</span>
            <img src="${
              movie.poster_path
                ? IMAGE_URL + movie.poster_path
                : "placeholder.jpg"
            }" alt="${movie.title} Poster">
            <h3>${movie.title}</h3>
            <p>Release Date: ${movie.release_date}</p>
            <p>Rating: ${movie.vote_average}</p>
            <p>Cast: ${movie.cast}</p>
            <p>Description: ${movie.overview}</p>
            <p>Trailer: <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(
              movie.title
            )}+trailer" target="_blank">Watch on YouTube</a></p>
        `;

    modal.style.display = "block";
  });
};

const closeModal = () => {
  const modal = document.getElementById("detailsModal");
  modal.style.display = "none";
};

const fetchMovieDetails = (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}?${API_KEY}&append_to_response=credits`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.cast = data.credits.cast.map((actor) => actor.name).join(", ");
      return data;
    });
};

const getRandomMovies = (movies, count) => {
  const shuffled = movies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
