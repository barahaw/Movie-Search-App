# Movie Search App

### **Project Overview**

The **Movie Search App** allows users to search for movies, view movie details such as posters, release dates, and ratings, and add their favorite movies to a personalized favorites list. The application fetches movie data from an external API and ensures that users' favorite selections are saved persistently using the browser's **localStorage**.

---

### **Features**

1. **Movie Search**:  
   Users can search for movies by title, with results fetched from an external API.
2. **Movie List Display**:  
   The app displays search results, including:

   - Poster images
   - Movie titles
   - Release dates
   - Ratings

3. **Favorites List**:  
   Users can add their favorite movies to a list, which is saved persistently across sessions using **localStorage**.

4. **Details Page**:  
   Clicking on a movie in the search results opens a detailed page containing:

   - Cast information
   - Movie description
   - Trailers (also fetched from the API)

5. **Data Persistence**:  
   Favorites are saved using **localStorage**, meaning they will be available even after the user refreshes the page or reopens the app.

---

### **Technologies Used**

- **HTML/CSS/JavaScript**: Frontend structure, design, and interactivity.
- **External API**: Movie data and details are fetched from an external API.
- **localStorage**: Used to store user-selected favorite movies persistently.

---

### **Installation and Setup**

1. Clone the repository:

   git clone https://github.com/your-username/movie-search-app.git
   `

2. Navigate to the project directory:

   cd movie-search-app

3. Open the index.html file in your browser:

   open index.html

---

### **Usage**

1. Enter the title of a movie in the search bar and click the
   Search button.
2. Browse the displayed search results that include movie posters, titles, release dates, and ratings.
3. Click on a movie to view additional details, including the cast, description, and trailers.
4. Add movies to your favorites by clicking the Add
   to
   Favorites button.
5. Your favorites list will be saved in **localStorage** and can be accessed at any time, even after refreshing or closing the browser.

---

### **API Endpoints**

- **Search Movies**: Fetches movie results based on the user’s search query.
- **Movie Details**: Retrieves additional details, such as cast and trailers, for a specific movie.
