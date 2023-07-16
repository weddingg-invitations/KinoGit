document.getElementById('mob_open_close').addEventListener('click', () => {
    document.querySelector('.links-cont').classList.toggle('links-cont-active')
})

window.addEventListener('scroll', () => {
    if (scrollY > 150) {
        document.querySelector('.links-cont').classList.remove('links-cont-active')
    }
})