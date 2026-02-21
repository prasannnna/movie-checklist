const movies = []

function Movie (movieName, language, watchStatus) {
    this.id = crypto.randomUUID();
    this.movieName = movieName;
    this.language = language;
    this.watchStatus = watchStatus;
}

Movie.prototype.watched = function () {
    this.watchStatus = ! this.watchStatus;
};

function newMovieCreation (movieName, language, watchStatus) {
    const movie = new Movie(movieName, language, watchStatus);
    movies.push(movie);
    displayMovies();
}

function displayMovies() {
    container.innerHTML = "";
    movies.forEach((mv) => {
        const card = document.createElement("div");
        card.classList.add("movie-card");
        card.dataset.id = mv.id;
        card.innerHTML = `
        <h1>${mv.movieName}</h1><br>
        <p>Language: ${mv.language}</p><br>
        <p>Watched: ${mv.watchStatus ? "Yes" : "No"} </p><br>
        <button class="toggleBtn">${mv.watchStatus? "Watched" : "In the Queue"}</button>
        <button class="removeBtn">Remove</button>`;

        card.querySelector(".toggleBtn").addEventListener("click", ()=> {
            mv.watched();
            displayMovies();
        })
        card.querySelector(".removeBtn").addEventListener("click", ()=> {
            removeMovie(mv.id);
            displayMovies();
        })
        container.appendChild(card);
    });
}

function removeMovie(id) {
    const index = movies.findIndex(book => (book.id) === id);
    movies.splice(index, 1);
    displayMovies();
}

const container = document.querySelector("#movie-container");
const newMovie = document.querySelector("#newMovie");
const closeDialog = document.querySelector("#closeDialog");
const form = document.querySelector("#formId");
const dialog = document.querySelector("#dialogBox");
const addMovie = document.querySelector("#addMovie");

newMovie.addEventListener("click", () => {
    dialog.showModal();
});

closeDialog.addEventListener("click", () => {
    dialog.close();
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const movieName = document.getElementById("title").value;
    const language = document.getElementById("language").value;
    const watchStatus = document.getElementById("watch-status").checked;
    newMovieCreation(movieName, language, watchStatus);
    form.reset();
    dialog.close();
});

