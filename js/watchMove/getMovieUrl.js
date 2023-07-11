Loc_storaeg = localStorage.getItem("move_data")
if (Loc_storaeg)
    window.history.replaceState(null, null, `?data=${Loc_storaeg}`)

let movieUrl = decodeURI(window.location.search.slice(6, length - 1))

document.getElementById('kinoplayertop').setAttribute('data-title', movieUrl)