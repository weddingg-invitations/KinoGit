const D = new Date();
const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
const thisYear = D.getFullYear() // 2023

document.getElementById('FullYear').innerText = thisYear

const main__section__films = document.getElementById('main__section__films');
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
						<img src="./assets/svg/play-icon.svg" alt="play-button">
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
}

// search_btn | search_inp
search_btn.addEventListener('click', () => {
    const searchTerm = search_inp.value;
    if (searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
    } else {
        getMovies(API_URL);
    }
    document.getElementById('main').scrollIntoView({ behavior: 'smooth' })
})

search_inp.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' || e.code == 'NumpadEnter') {
        const searchTerm = search_inp.value;
        if (searchTerm) {
            getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
        } else {
            getMovies(API_URL);
        }
        document.getElementById('main').scrollIntoView({ behavior: 'smooth' })
    }
})