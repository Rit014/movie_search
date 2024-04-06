const searchBtn = document.querySelector(".search-btn");
const searchForm = document.querySelector("form");
const searchBox = document.querySelector(".search-box");
const wrapper = document.querySelector(".wrapper");

// Fetching the data from omdb api

async function getData(data){
    const apikey='54056c40';
    const url = `http://www.omdbapi.com/?apikey=${apikey}&t=${data}`;
    const response = await fetch(url);
    const getingData = await response.json();
    return getingData;
}

// resove the promise of above api data

 async function showMovieData (data){
    wrapper.innerHTML = "";
    let status = await getData(data);
    console.log(status);

    const {Title, Genre, Plot, imdbRating, Writer, Actors, Poster, Released, Runtime} = status;

    const element_1 = document.createElement("div");
    const element_2 = document.createElement("div");
    element_2.classList.add("content");
    element_1.classList.add("image");
    element_2.innerHTML =  `
    <h1>${Title}</h1>
    <p>Rating:&#11088;&#11088;&#11088;<strong>${imdbRating}</strong></p>
    `

    element_1.innerHTML = `
    <img src=${Poster} alt="poster" >`

    const movieGenre = document.createElement('div');
    movieGenre.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement("p");
        p.innerText = element;
        movieGenre.appendChild(p);
    });

   element_2.appendChild(movieGenre);

   element_2.innerHTML +=  `
   <p>Released Date: <strong>${Released}</strong></p>
   <p>Duration: <strong>${Runtime}</strong></p>
   <p><u>Casts</u>: <strong>${Actors}</strong></p>
   <p><u>Plot</u>: <strong>${Plot}</strong></p>
   <p><u>Writer</u>: <strong>${Writer}</strong></p>
   `
   wrapper.appendChild(element_1);
    wrapper.appendChild(element_2)


 }

//  search button


searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const movieData = searchBox.value.trim();

    if(movieData !== ''){
        showMovieData(movieData);
    }
});


