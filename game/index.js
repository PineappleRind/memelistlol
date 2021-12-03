var games = [
    {
        name: "Hooie Type",
        description: "Type a series of HOOIEEEEEs as fast as you can!",
        image: '../imgs/hooyType.thumb.png',
        highScore: 0,
        loadfunc: `hooyTypeBegin()`,
    }, {
        name: "Auringe Juice",
        description: "Pour Auringe juice as close as you can to the red line!",
        image: '../imgs/auringe.thumb.png',
        highScore: 0,
        loadFilesDir: 'auringeBegin()',
    }
]


function loadTitle() {
    let name = document.querySelector('.title'), gameIndex = window.location.hash.replace('#', '')
    name.children[0].src = games[gameIndex].image
    name.children[1].children[1].innerHTML = games[gameIndex].name
    name.children[1].children[2].innerHTML = games[parseInt(gameIndex)].description
    name.children[1].children[3].onclick = function () {
        name.classList.add('hidden')
        setTimeout(function () {
            document.querySelector('.title').remove()
            document.querySelector('.container').classList.remove('hidden')
            eval(games[gameIndex].loadfunc)
        }, 300)
    }
}
function animate() {
    let name = document.querySelector('.title')
    for (let i = 0; i < name.children[1].children.length; i++) {
        setTimeout(() => {
            name.children[1].children[i].classList.remove('hidden')
        }, i * 900);
    }
}
loadTitle()
animate()