Loc_storaeg = localStorage.getItem("move_data")
move_id = localStorage.getItem("move_id")

if (Loc_storaeg)
    window.history.replaceState(null, null, `?id=${move_id}&data=${Loc_storaeg}`)

let movieUrl = decodeURI(window.location.search)

let get_move_data = movieUrl.slice(movieUrl.indexOf('&') + 6, length - 1)


document.getElementById('kinoplayertop').setAttribute('data-title', get_move_data)