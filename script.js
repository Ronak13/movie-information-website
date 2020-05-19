input = document.getElementById("inputTxt");
searchbtn = document.getElementById("search-btn");
noResult = document.getElementById("no-result");
resultdiv = document.getElementById("result-found");
poster = document.getElementById("movie-poster")

searchbtn.addEventListener("click",performSearch);

const movie = {}
function performSearch()
{
    resultdiv.classList.add("hide");
    if(input.value.length != 0)
    {
        findMovie(input.value);
    }
    else return ;
}
function findMovie(movieName)
{
   
    url =`http://www.omdbapi.com/?i=tt3896198&apikey=73f8e891&t=${movieName}`;
    
    fetch(url).then(function(response)
    {
        const data = response.json();
        return data;
    })
    .then(function(data)
    {
        if(data.Title === undefined)
        {
            noResult.classList.remove("hide");
            noResult.innerHTML = `<p>${data.Error}</p>`;
          
        }   
        else
        {
            noResult.classList.add("hide");
            setData(data);
        }      
    })
}
function setData(data)
{
    movie.name = data.Title;
    movie.actors = data.Actors;
    movie.genre = data.Genre;
    movie.director = data.Director;
    movie.poster = data.Poster;
    movie.imdbrating = data.imdbRating;
    movie.release = data.Released;
    movie.runtime = data.Runtime;
    displayInfo(); 
}
function displayInfo()
{
    resultdiv.classList.remove("hide");
    const moviename = document.getElementById("movie-name"); 
    const table = document.getElementById("table-display");
    moviename.innerHTML = `Movie : ${movie.name}`;
    poster.innerHTML = `<img src=${movie.poster}  width="222" height="330">`;
    table.innerHTML =  `
    <table class="w3-table-all w3-hoverable">                       
    <tr>
        <td>Actors : ${movie.actors}</td>
    </tr>
    <tr>
        <td>Released on : ${movie.release}</td>
    </tr>
    <tr>
        <td>Genre : ${movie.genre}</td>
    </tr>
    <tr>
        <td>Director : ${movie.director}</td>
    </tr>
    <tr>
        <td>Runtime : ${movie.runtime}</td>
    </tr>
    <tr>
        <td>IMDB rating : ${movie.imdbrating}</td>
    </tr>
    </table>
    `;
    input.value="";
}
