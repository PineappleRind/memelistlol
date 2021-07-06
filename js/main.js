var bod = document.querySelector(".items-cont");
var main = document.querySelector('main')
var inp = document.getElementById('input')
var achl = document.querySelector('.achievements-list')
var cloneCount = 0
var loaded
var date = new Date()
date.setTime(date.getTime() + (86400000000));
var expires = date.toGMTString()

var Memes = {
    load: function() {
        inp.style.display = 'inline-block'
        document.getElementById('search').style.display = 'inline-block'
        document.getElementById('info').style.display = 'block'
        document.getElementById('loading').style.display = 'none'
        loadMemes()
    }
}

function $(e) {
    return document.getElementById(e)
}

function getVal(e) {
    return Object.values(e)
}

let light = 0;

function clr() {
    light = light + 10
    if (light <= 100 || light >= 50) return `hsl(${light},100%,30%)`
    else return `hsl(${light},100%,50%)`
}

function loadMemes() {
    loadAchs()
    loaded = true;
    for (let i = 0; i < memes.length; i++) {
        var y = document.createElement('BUTTON')
        y.classList.add('item')
        y.innerHTML = memes[i].name
        y.style.background = clr()
        if (memes[i].compatible === true) y.style.fontWeight = '900';
        bod.appendChild(y)
            var o = document.querySelectorAll('.item')[i] 
            o.onclick = () => {
                save()
                modal(o, memes[i].name, memes[i].description)
                cookie.memes[i].viewed++
                
                cookie.timesClicked++
                achievement(true)
            }
        setTimeout(function(){removeText(bod.firstChild)})
            //console.clear()
    }
    bod.insertAdjacentHTML('beforeend', y)
}

function modal(btn, name, desc) {
    let o = $('overlay')
    o.setAttribute('style', 'opacity:1;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px;)')
    buttonClone(btn)
    showModal(name, desc)
}

function buttonClone(e) {
    if (e.childElementCount < 1) {
        let y = document.createElement('BUTTON')
        y.classList.add('item')
        y.style.backgroundColor = e.style.backgroundColor
        y.innerHTML = e.innerHTML
        e.appendChild(y)
        setTimeout(function() {
            y.remove()
        }, 1000)
    } else return cloneCount++
}
inp.onkeypress = e => {
    if (e.key == 'Enter') document.getElementById('search').click()
}
function showModal(r, t) {
    let y = document.createElement('DIV') 
    y.classList.add('modal') 
    y.innerHTML = ` <h1>Meme Info - ${r}</h1>
            <hr>
            <p>${t}</p>
            <p id="close" onclick="closeModal($('overlay'),document.querySelector('.modal'))">&times;</p>
            `
    let wr = document.querySelector('.modalwrap')
    wr.innerHTML = ''
    wr.appendChild(y)
}

function closeModal(o, m) {
    m.style.opacity = '0'
    m.style.transform = 'translateY(30px)'
    setTimeout(function() {
        m.remove()
        o.setAttribute('style', 'opacity:0;pointer-events: none;')
    }, 1000)
}
onload = () => {if (cookie.lightMode == true) smoothLightMode()}
$('darkToggle').onclick = () => {
    document.body.classList.toggle('dark')
    if (!document.body.classList.contains('dark')) cookie.lightMode = true;
    else cookie.lightMode = false

    save()
    //updateAndLoadCookie(false)
}

function smoothLightMode() {
    document.body.classList.remove('dark')
    document.body.style.transition = 'none'
    main.style.transition = 'none'
    inp.style.transition = 'none'
    setTimeout(function(){document.body.style.transition = '1s';main.style.transition = '1s';inp.style.transition = '1s'},1000)
}


function autocomplete() {
    let input = document.getElementById('input')
    let removeCount = 0
    clear()
    setTimeout(function() {
        loadMemes();
        setTimeout(function() {
            searchDups()
            for (let i = 0; i < 15; i++) {
                for (let j = 0; j < document.getElementsByClassName('item').length; j++) {
                    let content = document.getElementsByClassName('item')[j].textContent.toLowerCase()
                    if (!content.includes(input.value)) document.getElementsByClassName('item')[j].remove() 
                    removeCount++
                    if (document.getElementsByClassName('item').length == 0) main.innerHTML += 'No results :( <button onclick="window.location.href=\' https://memelist.ml\'">Try again</button>'
                }
            }
        }, 100)
    }, 100)
}

function clear() {
    bod.innerHTML = ''
}

function searchDups() {
    let items = document.getElementsByClassName('item')
    for (let i = 0; i > items.length; i++) {
        for (let j = 0; j > items.length; j++) {
            if (items[i].innerHTML == items[j].innerHTML) {
                items[j].remove()
            }
        }
    }
}

function removeText(child) {
    while (child) {
        nextSibling = child.nextSibling;
        if (child.nodeType == 3) {
            child.parentNode.removeChild(child);
        }
        child = nextSibling;
    }
}



















        setTimeout(function(){
            cookie.timesViewed++
            save()
        },5000)

if (!lscache.get('visited')) {
    save()
    set('visited','true')
} else {
    loadFromSave()
    achievement(false)
}

function save(){
    let notSaved = JSON.stringify(cookie)
    set('achievements',notSaved)
}

function loadAchs() {
    if (cookie.achievementsList.length == 0) achl.innerHTML = `<p id="closeachl">&times;</p><div class="inner"><h1>No achievements yet..</h1></div>`
    else achl.innerHTML = `<p id="closeachl">&times;</p><div class="inner"></div>`

    for (let i = 0; i < cookie.achievementsList.length; i++) {
        document.querySelector('.inner').insertAdjacentHTML('beforeend',`<div class="list-item"><h1>${cookie.achievementsList[i].name}</h1><p>${cookie.achievementsList[i].desc}</p></div>`)
    }
}
function loadFromSave() {
    cookie = JSON.parse(lscache.get('achievements'))
}
function set(e,r) {
    lscache.set(e,r,10000000000)
}
function len(e) {
    var size = 0,
        key;
    for (key in e) {
     if (e.hasOwnProperty(key)) size++;
    }
    return size
}

function ind(e,i) {
    return e[Object.keys(e)[i]];
}

function achievement(e) {
    for (let i = 0; i < memes.length; i++) {
      if (cookie.memes[i].viewed >= memes[i].reqs[0]) {
        notification(memes[i].achievements[0],`View "${memes[i].name}" ${memes[i].reqs[0]} times`)
        if (e == true) {
            achClr()
        }
        setTimeout(function(){cookie.achievementsList = remDupObj(cookie.achievementsList,'desc');save()})

        cookie.achievementsList.push({name: cookie.memes[i].achievements[0], desc: `View the meme ${memes[i].name} ${memes[i].reqs[0]} times`})
      }
    }
    loadAchs()
        if (cookie.timesViewed >= 5 && searchName('Welcome back') === undefined) {
            notification('Welcome back',`View the meme list ${cookie.timesViewed} times`)
            cookie.achievementsList.push({name: 'Welcome back', desc: `View the meme list ${cookie.timesViewed} times`})
        }
}
function achClr() {
    memes[i].reqs.shift()
    cookie.memes[i].reqs.shift()
    memes[i].achievements.shift()
    cookie.memes[i].achievements.shift()
}
function remDupObj(array, key) {
    var check = {};
    var res = [];
    array.forEach(element => {
        if(!check[element[key]]) {
            check[element[key]] = true;
            res.push(element);
        }
    });
    return res;
}
function notification(name,desc) {
   iziToast.show({
    title: `Achievement Unlocked: ${name}<p style="display:block;font-weight:200;margin-bottom:10px;margin-right:14px;margin-top:10px;">${desc}</p>`,
    timeout: 15000,
    titleSize: '25px',
    theme:'dark'
});
}
function searchName(e) {
    var result = cookie.achievementsList.find(obj => {
  return obj.name === e
})
return result
}
