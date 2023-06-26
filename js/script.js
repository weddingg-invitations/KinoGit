
// // // // // data
// // const D = new Date();
// // const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
// // const thisYear = D.getFullYear() // 2023

// // document.getElementById('FullYear').innerText = thisYear

// // //TMDB 
// // // themoviedb
// // // -------------------

// // const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
// // const BASE_URL = 'https://api.themoviedb.org/3';
// // const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
// // const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// // const searchURL = BASE_URL + '/search/movie?' + API_KEY;
// // const genres = [
// //     {
// //         "id": 28,
// //         "name": "Action"
// //     },
// //     {
// //         "id": 12,
// //         "name": "Adventure"
// //     },
// //     {
// //         "id": 16,
// //         "name": "Animation"
// //     },
// //     {
// //         "id": 35,
// //         "name": "Comedy"
// //     },
// //     {
// //         "id": 80,
// //         "name": "Crime"
// //     },
// //     {
// //         "id": 99,
// //         "name": "Documentary"
// //     },
// //     {
// //         "id": 18,
// //         "name": "Drama"
// //     },
// //     {
// //         "id": 10751,
// //         "name": "Family"
// //     },
// //     {
// //         "id": 14,
// //         "name": "Fantasy"
// //     },
// //     {
// //         "id": 36,
// //         "name": "History"
// //     },
// //     {
// //         "id": 27,
// //         "name": "Horror"
// //     },
// //     {
// //         "id": 10402,
// //         "name": "Music"
// //     },
// //     {
// //         "id": 9648,
// //         "name": "Mystery"
// //     },
// //     {
// //         "id": 10749,
// //         "name": "Romance"
// //     },
// //     {
// //         "id": 878,
// //         "name": "Science Fiction"
// //     },
// //     {
// //         "id": 10770,
// //         "name": "TV Movie"
// //     },
// //     {
// //         "id": 53,
// //         "name": "Thriller"
// //     },
// //     {
// //         "id": 10752,
// //         "name": "War"
// //     },
// //     {
// //         "id": 37,
// //         "name": "Western"
// //     }
// // ]
// // // -----------------
// // fetch(API_URL)
// //     // slider top 20
// //     .then(r => r.json())
// //     .then(r => {
// //         let films = r.results
// //         console.log(films);
// //         const swiper_wrapper = document.getElementById('head-swiper-wrapper')

// //         films.forEach(el => {
// //             const div = document.createElement('div')
// //             div.className = 'swiper-slide head-swiper-slide'
// //             div.id = el.id
// //             div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
// //             div.innerHTML = `
// // 					<div class="head-swiper-wrapper-play-img-cont">
// // 						<img src="./assets/svg/play-button.svg" alt="play-button">
// // 					</div>

// // 					<span class="head-slide-reyting ${getColor(el.vote_average)}">${String(el.vote_average).slice(0, 3)}</span>
					
// // 					<div class="head-info">
// // 						<h4 class="head-info-title">${el.title}</h4>
// // 					</div>`
// //             swiper_wrapper.appendChild(div)
// //         })
// //         headSwiper()
// //     })
// // // ----------------
// // const main = document.getElementById('main');
// // const search_inp = document.getElementById('search_inp');
// // const search_btn = document.getElementById('search_btn');
// // const tagsEl = document.getElementById('categories');

// // const prev = document.getElementById('prev')
// // const next = document.getElementById('next')
// // const current = document.getElementById('current')

// // var currentPage = 1;
// // var nextPage = 2;
// // var prevPage = 3;
// // var lastUrl = '';
// // var totalPages = 100;
// // var selectedGenre = []

// // // установить Жанр
// // setGenre();
// // function setGenre() {
// //     tagsEl.innerHTML = '';
// //     genres.forEach(genre => {
// //         const t = document.createElement('div');
// //         t.classList.add('categories__tag');
// //         t.id = genre.id;
// //         t.innerText = genre.name;
// //         t.addEventListener('click', () => {
// //             if (selectedGenre.length == 0) {
// //                 selectedGenre.push(genre.id);
// //             } else {
// //                 if (selectedGenre.includes(genre.id)) {
// //                     selectedGenre.forEach((id, idx) => {
// //                         if (id == genre.id) {
// //                             selectedGenre.splice(idx, 1);
// //                         }
// //                     })
// //                 } else {
// //                     selectedGenre.push(genre.id);
// //                 }
// //             }
// //             getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')))
// //             highlightSelection()
// //         })
// //         tagsEl.append(t);
// //     })
// // }

// // // множественный выбор жанор 
// // function highlightSelection() {
// //     const tags = document.querySelectorAll('.categories__tag');
// //     tags.forEach(categories__tag => {
// //         categories__tag.classList.remove('categories__tag--active')
// //     })
// //     // очистить кнопкой
// //     let clearBtn = document.getElementById('clear');
// //     if (clearBtn) {
// //         clearBtn.classList.add('categories__tag--active')
// //     } else {

// //         let clear = document.createElement('div');
// //         clear.classList.add('categories__tag', 'categories__tag--active');
// //         clear.id = 'clear';
// //         clear.innerText = 'Clear x';
// //         clear.addEventListener('click', () => {
// //             selectedGenre = [];
// //             setGenre();
// //             getMovies(API_URL);
// //         })
// //         tagsEl.append(clear);
// //     }

// //     if (selectedGenre.length != 0) {
// //         selectedGenre.forEach(id => {
// //             const hightlightedTag = document.getElementById(id);
// //             hightlightedTag.classList.add('categories__tag--active');
// //         })
// //     }
// // }

// // // получить фильмы
// // getMovies(API_URL);
// // function getMovies(url) {
// //     lastUrl = url;
// //     fetch(url).then(res => res.json()).then(data => {
// //         if (data.results.length !== 0) {
// //             showMovies(data.results);
// //             currentPage = data.page;
// //             nextPage = currentPage + 1;
// //             prevPage = currentPage - 1;
// //             totalPages = data.total_pages;

// //             pagination(currentPage, totalPages)

// //             if (currentPage <= 1) {
// //                 prev.classList.add('disabled');
// //                 next.classList.remove('disabled')
// //             } else if (currentPage >= totalPages) {
// //                 prev.classList.remove('disabled');
// //                 next.classList.add('disabled')
// //             } else {
// //                 prev.classList.remove('disabled');
// //                 next.classList.remove('disabled')
// //             }

// //             // tagsEl.scrollIntoView({ behavior: 'smooth' })

// //         } else {
// //             main.innerHTML = `<h1 class="no-results">No Results Found</h1>`
// //         }
// //     })
// // }

// // // нумерация страниц
// // function pagination(currentPage, totalPages) {
// //     document.querySelector('#total').textContent = '... ' + totalPages

// //     current.innerHTML = `
// //     <span class="pages" id="pages">${currentPage - 4}</span>
// //     <span class="pages" id="pages">${currentPage - 3}</span>
// //     <span class="pages" id="pages">${currentPage - 2}</span>
// //     <span class="pages" id="pages">${currentPage - 1}</span>
// //     <span class="pages pages-active" id="pages">${currentPage}</span>
// //     <span class="pages" id="pages">${currentPage + 1}</span>
// //     <span class="pages" id="pages">${currentPage + 2}</span>
// //     <span class="pages" id="pages">${currentPage + 3}</span>
// //     <span class="pages" id="pages">${currentPage + 4}</span>
// //     `
// //     document.querySelectorAll('.pages').forEach((el) => {
// //         if (el.innerText < 1) {
// //             el.style.display = 'none'
// //         }
// //         if (el.innerText > totalPages) {
// //             el.style.display = 'none'
// //         }
// //     })
// //     pagination_click()
// // }

// // // показать фильмы
// // function showMovies(data) {
// //     main.innerHTML = '';

// //     data.forEach(movie => {
// //         const { title, poster_path, vote_average, overview, id } = movie;
// //         const movieEl = document.createElement('div');
// //         movieEl.classList.add('movie');
// //         movieEl.innerHTML = `
// //             <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
// //             <span class="movie-info-reyting ${getColor(vote_average)}">${String(vote_average).slice(0, 3)}</span>
// //             <div class="watch__now" id="${id}"><img src="./assets/svg/play-icon.svg" alt="play-button"></div>

// //             <div class="movie-info">
// //                 <h3 class="movie-info-title">${title}</h3>
// //             </div>
// //             `
// //         // <div class="overview">
// //         //     <h3>Overview</h3>${overview}
// //         // </div>
// //         main.appendChild(movieEl);

// //         document.getElementById(id).addEventListener('click', () => {
// //             openNav(movie)
// //         })
// //     })
// // }

// // // получить цвет
// // function getColor(vote) {
// //     if (vote >= 8) {
// //         return 'green'
// //     } else if (vote >= 5) {
// //         return "orange"
// //     } else {
// //         return 'red'
// //     }
// // }

// // // search_btn | search_inp
// // search_btn.addEventListener('click', () => {
// //     const searchTerm = search_inp.value;
// //     selectedGenre = [];
// //     setGenre();
// //     if (searchTerm) {
// //         getMovies(searchURL + '&query=' + searchTerm)
// //     } else {
// //         getMovies(API_URL);
// //     }
// // })

// // // нумерация страниц вперед назад 
// // prev.addEventListener('click', () => {
// //     if (prevPage > 0) {
// //         pageCall(prevPage);
// //     }
// // })

// // next.addEventListener('click', () => {
// //     if (nextPage <= totalPages) {
// //         pageCall(nextPage);
// //     }
// // })

// // // нумерация страниц
// // function pagination_click() {
// //     document.querySelectorAll('#pages').forEach(p => {
// //         p.addEventListener('click', () => {
// //             pageCall(Number(p.textContent))
// //         })
// //     })
// // }

// // // страница созвать
// // function pageCall(page) {
// //     let urlSplit = lastUrl.split('?');
// //     let queryParams = urlSplit[1].split('&');
// //     let key = queryParams[queryParams.length - 1].split('=');
// //     if (key[0] != 'page') {
// //         let url = lastUrl + '&page=' + page
// //         getMovies(url);
// //     } else {
// //         key[1] = page.toString();
// //         let a = key.join('=');
// //         queryParams[queryParams.length - 1] = a;
// //         let b = queryParams.join('&');
// //         let url = urlSplit[0] + '?' + b
// //         getMovies(url);
// //     }
// // }


// // new

// // // // data
// const D = new Date();
// const thisMonth = D.toLocaleString('en', { month: 'long' }); // june
// const thisYear = D.getFullYear() // 2023

// document.getElementById('FullYear').innerText = thisYear


// //TMDB themoviedb
// // ------------------
// let language = 'ru-RU'
// const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';

// const BASE_URL = 'https://api.themoviedb.org/3';
// const API_URL = BASE_URL + `/trending/all/week?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY;
// const IMG_URL = 'https://image.tmdb.org/t/p/w500';
// const searchURL = BASE_URL + `/search/movie?` + API_KEY;
// const genres = [
//     {
//         "id": 28,
//         "name": "Action"
//     },
//     {
//         "id": 12,
//         "name": "Adventure"
//     },
//     {
//         "id": 16,
//         "name": "Animation"
//     },
//     {
//         "id": 35,
//         "name": "Comedy"
//     },
//     {
//         "id": 80,
//         "name": "Crime"
//     },
//     {
//         "id": 99,
//         "name": "Documentary"
//     },
//     {
//         "id": 18,
//         "name": "Drama"
//     },
//     {
//         "id": 10751,
//         "name": "Family"
//     },
//     {
//         "id": 14,
//         "name": "Fantasy"
//     },
//     {
//         "id": 36,
//         "name": "History"
//     },
//     {
//         "id": 27,
//         "name": "Horror"
//     },
//     {
//         "id": 10402,
//         "name": "Music"
//     },
//     {
//         "id": 9648,
//         "name": "Mystery"
//     },
//     {
//         "id": 10749,
//         "name": "Romance"
//     },
//     {
//         "id": 878,
//         "name": "Science Fiction"
//     },
//     {
//         "id": 10770,
//         "name": "TV Movie"
//     },
//     {
//         "id": 53,
//         "name": "Thriller"
//     },
//     {
//         "id": 10752,
//         "name": "War"
//     },
//     {
//         "id": 37,
//         "name": "Western"
//     }
// ]
// // -----------------
// fetch(BASE_URL + `/discover/movie?language=${language}?language=en-EN?sort_by=popularity.desc&` + API_KEY)
//     // slider top 20
//     .then(r => r.json())
//     .then(r => {
//         let films = r.results
//         const swiper_wrapper = document.getElementById('head-swiper-wrapper')

//         films.forEach(el => {
//             const div = document.createElement('div')
//             div.className = 'movie swiper-slide head-swiper-slide'
//             div.id = el.id
//             div.style = `background-image:url(https://image.tmdb.org/t/p/w500/${el.poster_path})`
//             div.innerHTML = `
// 					<div class="head-swiper-wrapper-play-img-cont">
// 						<img src="./assets/svg/play-icon.svg" alt="play-button">
// 					</div>

// 					<span class="head-slide-reyting ${getColor(el.vote_average)}">${String(el.vote_average).slice(0, 3)}</span>
					
// 					<div class="head-info">
// 						<h4 class="head-info-title movie-title">${el.title}</h4>
// 					</div>`
//             swiper_wrapper.appendChild(div)
//         })
//         headSwiper()
//         get_move_id()
//     })
// // ----------------
// const main__section__films = document.getElementById('main__section__films');
// const search_inp = document.getElementById('search_inp');
// const search_btn = document.getElementById('search_btn');
// const tagsEl = document.getElementById('categories');

// const prev = document.getElementById('prev')
// const next = document.getElementById('next')
// const current = document.getElementById('current')

// var currentPage = 1;
// var nextPage = 2;
// var prevPage = 3;
// var lastUrl = '';
// var totalPages = 100;
// var selectedGenre = []

// // установить Жанр
// setGenre();
// function setGenre() {
//     tagsEl.innerHTML = '';
//     genres.forEach(genre => {
//         const t = document.createElement('div');
//         t.classList.add('categories__tag');
//         t.id = genre.id;
//         t.innerText = genre.name;
//         t.addEventListener('click', () => {
//             if (selectedGenre.length == 0) {
//                 selectedGenre.push(genre.id);
//             } else {
//                 if (selectedGenre.includes(genre.id)) {
//                     selectedGenre.forEach((id, idx) => {
//                         if (id == genre.id) {
//                             selectedGenre.splice(idx, 1);
//                         }
//                     })
//                 } else {
//                     selectedGenre.push(genre.id);
//                 }
//             }
//             getMovies(BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&with_genres=' + encodeURI(selectedGenre.join(',')))
//             highlightSelection()
//         })
//         tagsEl.append(t);
//     })
// }

// // множественный выбор жанор 
// function highlightSelection() {
//     const tags = document.querySelectorAll('.categories__tag');
//     tags.forEach(categories__tag => {
//         categories__tag.classList.remove('categories__tag--active')
//     })
//     // очистить кнопкой
//     let clearBtn = document.getElementById('clear');
//     if (clearBtn) {
//         clearBtn.classList.add('categories__tag--active')
//     } else {

//         let clear = document.createElement('div');
//         clear.classList.add('categories__tag', 'categories__tag--active');
//         clear.id = 'clear';
//         clear.innerText = 'Clear x';
//         clear.addEventListener('click', () => {
//             selectedGenre = [];
//             setGenre();
//             getMovies(API_URL);
//         })
//         tagsEl.append(clear);
//     }

//     if (selectedGenre.length != 0) {
//         selectedGenre.forEach(id => {
//             const hightlightedTag = document.getElementById(id);
//             hightlightedTag.classList.add('categories__tag--active');
//         })
//     }
// }

// // получить фильмы
// getMovies(API_URL);
// function getMovies(url) {
//     lastUrl = url;
//     fetch(url).then(res => res.json()).then(data => {
//         if (data.results.length !== 0) {
//             showMovies(data.results);
//             currentPage = data.page;
//             nextPage = currentPage + 1;
//             prevPage = currentPage - 1;
//             totalPages = data.total_pages;

//             pagination(currentPage, totalPages)

//             if (currentPage <= 1) {
//                 prev.classList.add('disabled');
//                 next.classList.remove('disabled')
//             } else if (currentPage >= totalPages) {
//                 prev.classList.remove('disabled');
//                 next.classList.add('disabled')
//             } else {
//                 prev.classList.remove('disabled');
//                 next.classList.remove('disabled')
//             }

//             // tagsEl.scrollIntoView({ behavior: 'smooth' })

//         } else {
//             main__section__films.innerHTML = `<h1 class="no-results">No Results Found</h1>`
//         }
//     })
// }

// // нумерация страниц
// function pagination(currentPage, totalPages) {
//     current.innerHTML = `
//     <span class="pages" id="pages">${currentPage - 4}</span>
//     <span class="pages" id="pages">${currentPage - 3}</span>
//     <span class="pages" id="pages">${currentPage - 2}</span>
//     <span class="pages" id="pages">${currentPage - 1}</span>
//     <span class="pages pages-active" id="pages">${currentPage}</span>
//     <span class="pages" id="pages">${currentPage + 1}</span>
//     <span class="pages" id="pages">${currentPage + 2}</span>
//     <span class="pages" id="pages">${currentPage + 3}</span>
//     <span class="pages" id="pages">${currentPage + 4}</span>
//     `
//     document.querySelectorAll('.pages').forEach((el) => {
//         if (el.innerText < 1) {
//             el.style.display = 'none'
//         }
//         if (el.innerText > totalPages) {
//             el.style.display = 'none'
//         }
//     })
//     pagination_click()
// }

// // показать фильмы
// function showMovies(data) {
//     main__section__films.innerHTML = '';

//     data.forEach(movie => {

//         const movieEl = document.createElement('div');
//         movieEl.className = 'movie'
//         movieEl.id = movie.id

//         if (Boolean(movie.title) && movie.poster_path) {
//             movieEl.innerHTML = `
//             <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
//             <span class="movie-info-reyting ${getColor(movie.vote_average)}">${String(movie.vote_average).slice(0, 3)}</span>
//             <div class="watch__now"><img src="./assets/svg/play-icon.svg" alt="play-button"></div>

//             <div class="movie-info">
//                 <h3 class="movie-info-title movie-title">${movie.title}</h3>
//             </div>
//             `
//             main__section__films.appendChild(movieEl);
//         }
//     })

//     get_move_id()
// }

// // получить цвет
// function getColor(vote) {
//     if (vote >= 8) {
//         return 'green'
//     } else if (vote >= 5) {
//         return "orange"
//     } else {
//         return 'red'
//     }
// }

// // search_btn | search_inp
// search_btn.addEventListener('click', () => {
//     const searchTerm = search_inp.value;
//     selectedGenre = [];
//     setGenre();
//     if (searchTerm) {
//         getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
//     } else {
//         getMovies(API_URL);
//     }
// })

// search_inp.addEventListener('keydown', (e) => {
//     if (e.code == 'Enter' || e.code == 'NumpadEnter') {
//         const searchTerm = search_inp.value;
//         selectedGenre = [];
//         setGenre();
//         if (searchTerm) {
//             getMovies(searchURL + '&query=' + searchTerm + `&language=${language}`)
//         } else {
//             getMovies(API_URL);
//         }
//     }
// })

// // нумерация страниц вперед назад 
// prev.addEventListener('click', () => {
//     if (prevPage > 0) {
//         pageCall(prevPage);
//     }
// })

// next.addEventListener('click', () => {
//     if (nextPage <= totalPages) {
//         pageCall(nextPage);
//     }
// })

// // нумерация страниц
// function pagination_click() {
//     document.querySelectorAll('#pages').forEach(p => {
//         p.addEventListener('click', () => {
//             pageCall(Number(p.textContent))
//         })
//     })
// }

// // страница созвать
// function pageCall(page) {
//     let urlSplit = lastUrl.split('?');
//     let queryParams = urlSplit[1].split('&');
//     let key = queryParams[queryParams.length - 1].split('=');
//     if (key[0] != 'page') {
//         let url = lastUrl + '&page=' + page
//         getMovies(url);
//     } else {
//         key[1] = page.toString();
//         let a = key.join('=');
//         queryParams[queryParams.length - 1] = a;
//         let b = queryParams.join('&');
//         let url = urlSplit[0] + '?' + b
//         getMovies(url);
//     }
// }

// function get_move_id() {
//     document.querySelectorAll('.movie').forEach((el, i) => {
//         el.addEventListener('click', () => {
//             let move_id = el.id
//             let move_title = document.querySelectorAll('.movie-title')[i].textContent

//             main__section__films.style.display = 'none'
            
//             // document.getElementById('main').innerHTML=`
//             // <div class="video_player">
//             //     <div id="kinoplayertop" data-title="${move_title}"></div>
//             //     <script src="//kinoplayer.top/top.js"></script>
//             // </div>
//             // `
            

//             document.getElementById('kinoplayertop').setAttribute('data-title', `${move_title}`)
//         })
//     })
// }
