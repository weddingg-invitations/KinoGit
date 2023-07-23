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

let language = 'ru-RU'

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + `/search/movie?` + API_KEY;
const genres = [
    {
        "id": 12,
        "name": "Приключение"
    },
    {
        "id": 14,
        "name": "Фантастика"
    },
    {
        "id": 16,
        "name": "Мультфильмы"
    },
    {
        "id": 18,
        "name": "Драмы"
    },
    {
        "id": 27,
        "name": "Ужасы"
    },
    {
        "id": 28,
        "name": "Популярные боевики"
    },
    {
        "id": 35,
        "name": "комедии"
    },
    {
        "id": 36,
        "name": "Исторические"
    },
    {
        "id": 37,
        "name": "вестерны"
    },
    {
        "id": 53,
        "name": "Триллеры"
    },
    {
        "id": 80,
        "name": "Криминал"
    },
    {
        "id": 99,
        "name": "Документальные"
    },
    {
        "id": 878,
        "name": "научная фантастика"
    },
    {
        "id": 9648,
        "name": "детектив"
    },
    {
        "id": 10402,
        "name": "Музыкальные"
    },
    {
        "id": 10751,
        "name": "Семейные"
    },
    {
        "id": 10752,
        "name": "Военные"
    },
    {
        "id": 10749,
        "name": "романтические"
    },
    {
        "id": 10770,
        "name": "Телефильм"
    },
]
// top slider movies
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
            get_move_andPlay()
        })
}
// установить Жанр
setGenre();
function setGenre() {
    categories_cont.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('categories__tag');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    })
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        categories_cont.append(t);
    })
}
// множественный выбор жанор 
function highlightSelection() {
    const tags = document.querySelectorAll('.categories__tag');
    tags.forEach(categories__tag => {
        categories__tag.classList.remove('categories__tag--active')
    })
    // очистить кнопкой
    let clearBtn = document.getElementById('clear');
    if (clearBtn) {
        clearBtn.classList.add('categories__tag--active')
    } else {

        let clear = document.createElement('div');
        clear.classList.add('categories__tag', 'categories__tag--active');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();
            getMovies(API_URL);
        })
        categories_cont.append(clear);
    }

    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('categories__tag--active');
        })
    }
}
// получить фильмы
getMovies(API_URL)
function getMovies(url) {
    lastUrl = url;

    fetch(url).then(res => res.json()).then(data => {

        if (data.results.length !== 0) {
            showMovies(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;

            pagination(currentPage, totalPages)

            if (currentPage <= 1) {
                prev.classList.add('disabled');
                next.classList.remove('disabled')
            }
            else if (currentPage >= totalPages) {
                prev.classList.remove('disabled');
                next.classList.add('disabled')
            }
            else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled')
            }

        } else {
            main__section__films.innerHTML = `<h3 class="no-results">No Results Found</h3>`
        }
        get_move_andPlay()
    })
}
// нумерация страниц
function pagination(currentPage, totalPages) {
    current.innerHTML = `
    <span class="pages" id="pages">${currentPage - 4}</span>
    <span class="pages" id="pages">${currentPage - 3}</span>
    <span class="pages" id="pages">${currentPage - 2}</span>
    <span class="pages" id="pages">${currentPage - 1}</span>
    <span class="pages pages-active" id="pages">${currentPage}</span>
    <span class="pages" id="pages">${currentPage + 1}</span>
    <span class="pages" id="pages">${currentPage + 2}</span>
    <span class="pages" id="pages">${currentPage + 3}</span>
    <span class="pages" id="pages">${currentPage + 4}</span>
    `
    document.querySelectorAll('.pages').forEach((el) => {
        if (el.innerText < 1) {
            el.style.display = 'none'
        }
        if (el.innerText > totalPages) {
            el.style.display = 'none'
        }
    })

    pagination_click()
}
// показать фильмы
function showMovies(data) {
    main__section__films.innerHTML = '';

    data.forEach(el => {
        const movieEl = document.createElement('div');
        movieEl.className = 'movie'
        movieEl.id = el.id
        movieEl.setAttribute('move_data', `${el.title} ${el.original_title} ${String(el.release_date).slice(0, 4)}/`)
        // есле у фильма отсутствует название не показывать фильм
        if (Boolean(el.title) && el.poster_path) {
            movieEl.innerHTML = `
            <img src="${IMG_URL + el.poster_path}" alt="${el.title}">
            <div class="watch__now"><img src="./assets/svg/play-icon.svg" alt="play-button"></div>
            <div class="movie-info">
                <h3 class="movie-info-title movie-title">${el.title}</h3>
                <div class='movie-info-subtitle-cont'>
                    <p class="movie-info-paragraph">${String(el.release_date).slice(0, 4)}</p>
                    <span>${(el.adult == true) ? "Для взрослых 18+" : ""}</span>
                    <span class="movie-info-reyting ${getColor(el.vote_average)}">${String(el.vote_average).slice(0, 3)}</span>
                </div>
            </div>`
            main__section__films.appendChild(movieEl)
        }
    })
}
// получить цвет
function getColor(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}
// search_btn
search_btn.addEventListener('click', (e) => {
    serchLogic(e)
})
// search_inp
search_inp.addEventListener('keyup', (e) => {
    serchLogic(e)
})
// serch click logic
function serchLogic(e) {
    if (e.code == 'Enter' || e.code == 'NumpadEnter' || e.target.id == "search_btn") {
        const searchTerm = search_inp.value;
        selectedGenre = [];
        setGenre();
        if (searchTerm) {
            getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
        } else {
            getMovies(API_URL);
        }
        setTimeout(() => {
            document.getElementById('main').scrollIntoView({ behavior: 'smooth' })
        }, 150);
    }
}
// нумерация страниц назад 
prev.addEventListener('click', () => {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
})
// нумерация страниц вперед 
next.addEventListener('click', () => {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
})

document.getElementById('top_movies').addEventListener('click', () => {
    getMovies(`https://api.themoviedb.org/3/discover/movie?${API_KEY}&language=${language}?language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${thisYear}-01-01`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('animation').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=16`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('action').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=28`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('comedy').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=35`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

document.getElementById('Family').addEventListener('click', () => {
    getMovies(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&${API_KEY}&with_genres=10751`)
    document.getElementById('main__section__films').scrollIntoView({ behavior: 'smooth' })
})

// нумерация страниц
function pagination_click() {
    document.querySelectorAll('#pages').forEach(p => {
        p.addEventListener('click', () => {
            pageCall(Number(p.textContent))
        })
    })
}
// страница созвать
function pageCall(page) {
    let urlSplit = lastUrl.split('?');
    let queryParams = urlSplit[1].split('&');
    let key = queryParams[queryParams.length - 1].split('=');
    if (key[0] != 'page') {
        let url = lastUrl + '&page=' + page
        getMovies(url);
    } else {
        key[1] = page.toString();
        let a = key.join('=');
        queryParams[queryParams.length - 1] = a;
        let b = queryParams.join('&');
        let url = urlSplit[0] + '?' + b
        getMovies(url);
    }

}

function move_info_cont_play() {
    document.querySelector('.move_info_cont_play').addEventListener('click', () => {
        let el = document.querySelector('.swiper-slide-active')
        // get data
        let move_data = el.getAttribute('move_data')
        let move_id = el.getAttribute('id')

        // save in localStorage
        localStorage.setItem("move_data", `${move_data}`);
        localStorage.setItem("move_id", `${move_id}`);

        // location
        window.location.href = './pages/watchMovie/watchMovie.html';
    })
}

get_move_andPlay()
function get_move_andPlay() {
    document.querySelectorAll('.movie').forEach(el => {
        el.addEventListener('click', () => {

            // get data
            let move_data = el.getAttribute('move_data')
            let move_id = el.getAttribute('id')

            // save in localStorage
            localStorage.setItem("move_data", `${move_data}`);
            localStorage.setItem("move_id", `${move_id}`);

            // location
            window.location.href = './pages/watchMovie/watchMovie.html';
        })
    })
}

// loader off
setTimeout(() => {
    document.querySelector('.loader').style.opacity = '0'
}, 2000)

setTimeout(() => {
    document.querySelector('.loader').style.display = 'none'
}, 2500)