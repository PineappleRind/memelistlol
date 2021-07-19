var bod = document.querySelector(".items-cont"); // The variables. These are "shortcuts"; I select the element on the page and store it. This one can be referred to as "bod" in the code.
var main = document.querySelector('main')
var inp = document.getElementById('input')
var achl = document.querySelector('.achievements-list')
var cloneCount = 0
var loaded

var Memes = {
    load: function() {
        inp.style.display = 'inline-block'
        document.getElementById('search').style.display = 'inline-block'
        document.getElementById('info').style.display = 'block'
        document.getElementById('loading').style.display = 'none'
        loadMemes() 
    }
}
$('closeachl').onmouseup = () => {
    achl.classList.remove('open')
}
$('achievements').onclick = () => {
    achl.classList.add('open')
}
function $(e) {
    return document.getElementById(e)
}

function getVal(e) {
    return Object.values(e)
}

let light = 0;

function clr() { // The function for colors, so that the buttons' background color goes from red, to pink, and back again
    light = light + 10
    if (light <= 100 || light >= 50) return `hsl(${light},100%,30%)`
    else return `hsl(${light},100%,50%)`
}

function loadMemes() {
    loadAchs()
    loaded = true;
    for (let i = 0; i < memes.length; i++) { // For each meme,
        var y = document.createElement('BUTTON') // Create a button
        y.classList.add('item') // Add a class to it to refer to it in the style sheet
        y.innerHTML = memes[i].name // Set the content to the meme's name
        y.style.background = clr() // Calls the color function
        y.onclick = () => { // When the button is clicked,
            save() // Save 
            setTimeout(function(){showModal(memes[i].name, memes[i].description)},200) // Open the modal 
            cookie.memes[i].viewed++ // Increase the view count of the specific meme
            buttonClone(y) // Button animation
            cookie.timesClicked++ // Increase the overall view count
            achievement(true) // Check if the user unlocked an achievement
        }
        if (memes[i].compatible === true) y.style.fontWeight = '900'; // If the meme is compatible with Meme Craziness bold it
        bod.appendChild(y) // Add the button to the page
            //console.clear()
    }
}

function buttonClone(e) { // Button animation (Pretty complicated)
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
    if (e.key == 'Enter') document.getElementById('search').click() // If the user pressed the key "Enter" search the value
}
function showModal(r, t) { 
    let o = $('overlay') // Overlay variable (for the overlay)
    o.setAttribute('style', 'opacity:1;filter:blur(60px);')
    let y = document.createElement('DIV') // Creates a miscellanous object
    y.classList.add('modal')  // adds a class to it
    y.innerHTML = ` <h1>Meme Info - ${r}</h1> 
            <hr>
            <p>${t}</p>
            <p id="close" onclick="closeModal($('overlay'),document.querySelector('.modal'))">&times;</p>
            ` // Puts the content of the modal
    let wr = document.querySelector('.modalwrap')
    wr.innerHTML = '' // Closes any currently open modals
    wr.appendChild(y) // adds the modal to the overlay
}

function closeModal(o, m) { // Function to close the modal
    m.style.opacity = '0'// Set the opacity of the modal to 0
    m.style.transform = 'translateY(30px)'
    setTimeout(function() {
        m.remove() // After a second, remove the modal from the page completely
        o.setAttribute('style', 'opacity:0;pointer-events: none;') // Hides the overlay
    }, 1000)
}
onload = () => {if (cookie.lightMode == true) smoothLightMode()} // On page load, checks if the user had light mode enabled on the previous session. 
$('darkToggle').onclick = () => { // Toggles dark mode
    document.body.classList.toggle('dark') 
    if (!document.body.classList.contains('dark')) cookie.lightMode = true; // Saves the preference locally (Page-limited)
    else cookie.lightMode = false

    save() // Saves the preference globally (On the user's device)
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
    achievement()
    cookie.timesSearched++
  //  setTimeout(function() {
        loadMemes();
       // setTimeout(function() {
            searchDups()
            for (let i = 0; i < 15; i++) {
                for (let j = 0; j < document.getElementsByClassName('item').length; j++) {
                    let content = document.getElementsByClassName('item')[j].textContent.toLowerCase()
                    if (!content.includes(input.value)) document.getElementsByClassName('item')[j].remove() 
                    removeCount++
                    if (document.getElementsByClassName('item').length == 0) main.innerHTML += 'No results :( <button onclick="window.location.href=\' https://memelist.ml\'">Try again</button>'
                }
            }
      //  }, 100)
  //  }, 100)
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

        setTimeout(function(){
            cookie.timesViewed++
            save()
        },5000)

if (!lscache.get('visited')) {
    save()
    set('visited','true')
} else {
    loadFromSave()
   // setTimeout(function(){achievement(false)})
}

function save(){
    let notSaved = JSON.stringify(cookie)
    set('achievements',notSaved)
}

function loadAchs() {
    if (cookie.achievementsList.length == 0) achl.innerHTML = `<p id="closeachl">&times;</p><div class="inner"><h1>No achievements yet..</h1></div>`
    else achl.innerHTML = `<p id="closeachl">&times;</p><div class="inner"></div>`
$('closeachl').onmouseup = () => {
        achl.classList.remove('open')
}
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
      if (cookie.memes[i].viewed >= cookie.memes[i].reqs[0]) {
        setTimeout(achClr(i))
        if (e == true) {
            notification(memes[i].achievements[0],`View "${memes[i].name}" ${cookie.memes[i].viewed} times`)
            setTimeout(function(){cookie.achievementsList = remDupObj(cookie.achievementsList,'desc');save()})
            cookie.achievementsList.push({name: memes[i].achievements[0], desc: `View the meme ${memes[i].name} ${cookie.memes[i].viewed} times`})
        }
      }
    }
    loadAchs()
        if (cookie.timesViewed >= 5 && searchName('Welcome back') === undefined) {
            notification('Welcome back',`View the meme list ${cookie.timesViewed} times`)
            cookie.achievementsList.push({name: 'Welcome back', desc: `View the meme list ${cookie.timesViewed} times`})
        }
    if (cookie.timesSearched >= 1 && searchName('Seeker') === undefined) {
            notification('Seeker',`Search for the first time`)
            cookie.achievementsList.push({name: 'Seeker', desc: `Search for the first time`})
        }
}
function achClr(i) {

    memes[i].reqs.shift()
    cookie.memes[i].reqs.shift()
    cookie.memes[i].achievements.shift()

    setTimeout(function(){console.log('removed achievements of ' + memes[i].name + ', there are now ' + cookie.memes[i].achievements.length + ' achievements left')}) 
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
    theme: cookie.determineTheme()
});
}
function searchName(e) {
    var result = cookie.achievementsList.find(obj => {
  return obj.name === e
})
return result
}



/************** FRUIT OF THE PERSON QUIZ *****************/
/* by me lol
 * started july 18 2021
*/

function fotpModal() {
    var iid = 0;
    let y = document.createElement('DIV')
    y.classList.add('modal')
    for (let i = 0; i < fotpQuestions.length; i++) {
        iid = 0
        y.innerHTML += `<br><h2>${fotpQuestions[i].name}</h2>`
        for (let j = 0; j < fotpQuestions[i].answers.length; j++) {
            iid++
            y.innerHTML += `<input type="radio" name="${fotpQuestions[i].id}" id="${fotpQuestions[i].id + iid}"><label for="${fotpQuestions[i].id + iid.toString()}">${fotpQuestions[i].answers[j].name}</label><br>`
        }
        if (i == fotpQuestions.length - 1)  y.innerHTML += `<button onclick="fotpEval(document.querySelector('.modalwrap').children[0])">Evaluate!</button><p id="close" onclick="closeModal($('overlay'),document.querySelector('.modal'))">&times;</p>`
    }
    let wr = document.querySelector('.modalwrap')
    wr.innerHTML = '' // Closes any currently open modals
    wr.appendChild(y) // adds the modal to the overlay
}
function fotpEval(mod) {
    setTimeout(function(){mod.innerHTML = 'Evaluating...'})
    setTimeout(function(){fotpShowResults(mod)},500)
    for (let i = 0; i < fotpQuestions.length; i++) {
        for (let j = 0; j < fotpQuestions[i].answers.length; j++) {
            if (document.getElementById(`${fotpQuestions[i].id + (j+1).toString()}`).checked == true) {
                fotpQuestions[i].answers[j].points()
            }
        }
    }
}
function fotpGetFruit() {
    var maxVotes = Math.max(...fotpData.map(e => e.count));
    return fotpData.find(game => game.count === maxVotes);
}
function fotpShowResults(mod) {
    var article = getArticle(fotpGetFruit().name)
    mod.innerHTML = `<h1>You're ${article} ${fotpGetFruit().name}</h1>`
}
function getArticle(u) {
    let e = u.toLowerCase()
    if (e.startsWith('a') || e.startsWith('e')|| e.startsWith('i')|| e.startsWith('o')|| e.startsWith('u')) return 'an'
    else return 'a'
}