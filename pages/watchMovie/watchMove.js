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
            get_Watch_Move_andPlay()
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
            // console.log(R);
            function reytingStars() {
                for (let i = 0; i < 10; i++) {
                    let span = document.createElement('span')
                    span.className = 'reyting_stars'
                    document.querySelector('.reyting_stars_cont').appendChild(span)

                    if (i <= Math.round(R.vote_average)) {
                        document.querySelectorAll('.reyting_stars')[i].style.cssText = 'background-color: yellow'
                    }
                }
            }
            let about_film = document.getElementById('about_film')
            about_film.style.cssText = `background-image: url(${'https://image.tmdb.org/t/p/original/' + R.backdrop_path})`
            console.log(R.overview);
            about_film.innerHTML = `
            <h2 class="about_film_info_title">${R.title}</h2>
            <div class="about_film_cont">
                    <div class="about_film_poster">
                        <img id="about_film_poster_img" src="${IMG_URL + R.poster_path}" alt="${R.title}">
                    </div>

                    <div class="about_film_info">
                        <p class="about_film_info_release_date">
                            <span>год выпуска - </span>
                            <span>${R.release_date.replace(/-/g, " / ")}</span>
                        </p>

                        <p class="about_film_info_genres">
                            <span>Жанр - </span>
                            <span>${R.genres.map(el => (' ' + el.name))}</span>
                        </p>

                        <p class="about_film_info_genres_vote_average" id='about_film_info_genres_vote_average'>
                            <span>рейтинг TMDB - </span>
                            <span class='reyting_stars_cont'></span>
                        </p>

                        <p class="about_film_info_runtime">
                            <span>длительность фильма - </span>
                            <span>${R.runtime} мин.</span>
                        </p>

                        <p class="about_film_info_overview">${R.overview}</p>
                    </div>
            </div>`

            reytingStars()
        })
        .catch(err => console.error(err));
}

document.getElementById('top_movies').addEventListener('click', (e) => {
    getMovies(`https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=${language}?language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${thisYear}-01-01`)
    click_js()
})

document.getElementById('animation').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=16`)
    click_js()
})

document.getElementById('action').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=28`)
    click_js()
})

document.getElementById('comedy').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=35`)
    click_js()
})

document.getElementById('Family').addEventListener('click', (e) => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=10751`)
    click_js()
})

function click_js() {
    let search_input = document.getElementById('search_inp')
    let search = document.getElementById('search')
    search.classList.add('search-anime-inp')
    search_close.classList.add('search-anime-close')
    search_buttone.classList.add('search-btn-active')
    search_input.value = ''
    search.offsetWidth < 50 ? search_input.focus() : false;

    if (document.getElementById('search__films__cont')) {
        search__films__cont.innerHTML = ''
    }
}

function get_Watch_move_info_cont() {
    document.querySelector('.move_info_cont_play').addEventListener('click', () => {
        let el = document.querySelector('.swiper-slide-active')
        // get data
        let move_data = el.getAttribute('move_data')
        let move_id = el.getAttribute('id')

        // save in localStorage
        localStorage.setItem("move_data", `${move_data}`)
        localStorage.setItem("move_id", `${move_id}`)

        // location
        window.location.href = './../../pages/watchMovie/watchMovie.html'
    })
}

get_Watch_Move_andPlay()
function get_Watch_Move_andPlay() {
    document.querySelectorAll('.movie').forEach(el => {
        el.addEventListener('click', () => {
            // get data
            let move_data = el.getAttribute('move_data')
            let move_id = el.getAttribute('id')

            // save in localStorage
            localStorage.setItem("move_data", `${move_data}`);
            localStorage.setItem("move_id", `${move_id}`);

            // location
            window.location.href = './../../pages/watchMovie/watchMovie.html';
        })
    })
}