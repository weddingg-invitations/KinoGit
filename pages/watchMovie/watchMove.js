const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

document.getElementById('FullYear').innerText = thisYear

const search__films__cont = document.getElementById('search__films__cont');
const search_inp = document.getElementById('search_inp');
const search_btn = document.getElementById('search_btn');
const categories_cont = document.getElementById('categories');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')

let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let lastUrl = '';
let totalPages = 100;
let selectedGenre = []

//TMDB themoviedb
// ------------------

let language = 'ru-RU'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + `/search/movie?` + API_KEY;

// -----------------
get_top_movies()
function get_top_movies() {
    fetch(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY)
        // slider top 20
        .then(r => r.json())
        .then(r => {
            let films = r.results
            const swiper_wrapper = document.getElementById('head-swiper-wrapper')

            films.forEach(el => {
                const div = document.createElement('div')
                div.className = 'movie swiper-slide head-swiper-slide'
                div.id = el.id
                div.setAttribute('move_data', `${el.title} , ${el.original_title} , ${String(el.release_date).slice(0, 4)}`)
                div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
                div.innerHTML = `
					<div class="head-swiper-wrapper-play-img-cont">
						<img src="./../../assets/svg/play-icon.svg" alt="play-button">
					</div>

					<div class="head_swiper_info" style="display:none">
                        <span class="head_swiper_info_imgSrc">https://image.tmdb.org/t/p/original/${el.backdrop_path}</span>
                        <h2 class="head_swiper_info_original_title">${el.original_title}</h2>
						<h2 class="head_swiper_info_title">${el.title}</h2>
                        <span class="head_swiper_info_reyting">${String(el.vote_average).slice(0, 3)}</span>
                        <span class="head_swiper_info_data">${el.release_date}</span>
					</div>`
                swiper_wrapper.appendChild(div)
            })
            headSwiper()
        })
        .catch(err => console.error(err));
}

search_btn.addEventListener('click', () => {
    const searchTerm = search_inp.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
    } else {
        getMovies(API_URL);
    }
})

search_inp.addEventListener('keydown', (e) => {
    const searchTerm = search_inp.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm + `&language=${language}?language=en-EN`)
    } else {
        getMovies(API_URL);
    }
    // if (e.code == 'Enter' || e.code == 'NumpadEnter') {}
})

function getMovies(url) {
    lastUrl = url;

    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length !== 0) {
            showMovies(data.results);
        } else {
            search__films__cont.innerHTML = `<h3 class="no-results">No Results Found</h3>`
        }
    })
}

function showMovies(data) {
    search__films__cont.innerHTML = '';

    data.forEach(el => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie'
        movieEl.id = el.id
        movieEl.setAttribute('move_data', `${el.title} ${el.original_title} ${String(el.release_date).slice(0, 4)}/`)
        // есле у фильма отсутствует название не показывать фильм ???
        if (Boolean(el.title) && el.poster_path) {
            movieEl.innerHTML = `
            <div class="watch__now">
                <img src="${IMG_URL + el.poster_path}" alt="${el.title}">
            </div>

            <div class="movie-info">
                <h3 class="movie-info-title movie-title">${el.title}</h3>
                <p class="movie-info-paragraph">${String(el.release_date).slice(0, 4)}</p>
            </div>
            `
            search__films__cont.appendChild(movieEl);
        }
    })
}

showPoster_andData()
function showPoster_andData() {
    let movieUrl = decodeURI(window.location.search)
    let get_id = movieUrl.slice(4, movieUrl.indexOf('&'))

    fetch(`${BASE_URL}/movie/${get_id}?language=${language}&` + API_KEY)
        .then(response => response.json())
        .then(R => {
            console.log(R)
            document.getElementById('about_film_poster').style.cssText = `background-image: url(${IMG_URL + R.poster_path});`
            document.getElementById('about_film_info_title').textContent = R.title
            document.getElementById('about_film_info_genres').textContent = `${R.genres[0].name}, ${R.genres[1].name}, ${R.genres[2].name}`
            document.getElementById('about_film_info_release_date').textContent = R.release_date
            document.getElementById('about_film_info_genres_vote_average').textContent=R.vote_average

        })
        .catch(err => console.error(err));
}
