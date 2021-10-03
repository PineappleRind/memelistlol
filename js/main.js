var bod = document.querySelector(".items-cont") // The variables. These are "shortcuts" I select the element on the page and store it. This one can be referred to as "bod" in the code.
var main = document.querySelector('main')
var inp = document.getElementById('input')
var achl = document.querySelector('.achievements-list')
var srchRes = $('searchResult')
var controls = document.querySelector('.controls-overlay')
var cloneCount = 0
var curMeme = 0

var memeStreak = true
var loaded, modalOpen, debugb
let clearShowing = false
let hue = Math.floor(Math.random() * 365)

inp.style.display = 'inline-block'
document.getElementById('search').style.display = 'inline-block'
document.getElementById('info').style.display = 'block'
document.getElementById('loadText').style.display = 'none'
loadMemes()
achCheck()

debugb = false
function debug(to) {
	if (debugb == true) {
		var stack = new Error().stack.replace("Error", '')
		console.log('____________' + new Date().toLocaleTimeString() + '_____________\n' + to + '\n Called: ' + stack)
		return to
	} else return
}
$('closeachl').onmouseup = () => {
	achl.classList.remove('open')
}
$('achievements').onclick = () => {
	loadAchs()
	achl.classList.add('open')
}
$('controlsOpen').onclick = () => {
	controls.classList.add('open')
}

function $(e) {
	return document.getElementById(e)
}

function clr() { // The function for colors, so that the buttons' background color goes from red, to pink, and back again
	hue += 4
	if (hue <= 100 || hue >= 50) return `hsl(${hue},100%,30%)`
	else return `hsl(${hue},100%,50%,)`
}

function loadMemes() {
	loaded = true
	for (let i = 0; i < memes.length; i++) { // For each meme,
		var y = document.createElement('BUTTON') // Create a button
		y.classList.add('item') // Add a class to it to refer to it in the style sheet
		y.innerHTML = memes[i].name // Set the content to the meme's name
		y.style.background = clr() // Calls the color function
		let p = y
		p.onclick = () => { // When the button is clicked,
			save() // Save 
			buttonClone(p) // Button animation
			setTimeout(function () {
				mdShowMemeModal(memes[i].name, memes[i].description)
			}, 200) // Open the modal 
			saveData.memes[i].viewed++ // Increase the view count of the specific meme
			saveData.timesClicked++ // Increase the overall view count

			/**/
			if (saveData.viewedAMemeBefore == false) {
				if (i == 0) achGet('Orderly', 'View the first meme first')
				if (i == memes.length - 1) achGet('Orderly in a different sense', 'View the last meme first')
				achGet('Your first meme', 'View 1 meme')
				saveData.viewedAMemeBefore = true
			}

			/**/
			console.log('Current =' + curMeme + '. Memestreak = ' + memeStreak)
			console.log(i)
			if (curMeme == memes.length && memeStreak == true) {
				achGet('The Real Kitchen Party!', 'View all memes in a row.')
			} else if (curMeme != i) {
				memeStreak = false
			} else {
				curMeme++
			}
			/**/
			achCheck() // Check if the user unlocked an achievement
		}
		bod.appendChild(p) // Add the button to the page
	}

	return debug('Memes loaded.')
}

function buttonClone(btn) {
	if (btn.childElementCount < 1) {
		let y = document.createElement('BUTTON')
		y.classList.add('item')
		y.style.backgroundColor = btn.style.backgroundColor
		y.innerHTML = btn.innerHTML
		btn.appendChild(y)
		setTimeout(function () {
			y.remove()
		}, 700)
	} else return cloneCount++
	return debug('Button "' + btn.innerHTML + '" cloned.')
}

inp.onkeyup = e => {
	if (e.key == 'Enter') {
		e.preventDefault()
		document.getElementById('search').click() // If the user pressed the key "Enter" search the value
		let y = document.createElement('div')
		y.onclick = () => {
			y.remove()
			search('')
		}
		inp.appendChild(y)
	}
}
/***********************
 * Modal Functions
 ***********************/
class Modal {
	constructor() {
		let y = document.createElement('DIV')
		y.classList.add('modal') //adds class
		//y.style.height = '70%' // height
		let wr = document.querySelector('.modalwrap')
		wr.innerHTML = '' // Closes any currently open modals
		wr.appendChild(y) // adds the modal to the overlay

		this.element = y
		this.setClose = function () {
			mdSetClose(this.element)
		}
		let o = $('overlay') // Overlay variable (for the overlay)
		o.setAttribute('style', 'opacity:1') // shows overlay
	}
}

function mdShowMemeModal(r, t) {
	modalOpen = true
	let mod = new Modal()
	mod.element.innerHTML = ` <h1>Meme Info <span>${r}</span></h1> 
            <hr>
            <p>${t}</p>
            <p id="close" onclick="mdCloseModal($('overlay'),document.querySelector('.modal'))">×</p>
            ` // Puts the content of the modal
	document.body.onkeyup = e => {
		if (e.code == 'Escape' && modalOpen == true) mdCloseModal($('overlay'), document.querySelector('.modal'))
	}
	mod.setClose()
	return debug('Showed modal.')
}

function mdCloseModal(o, m) { // Function to close the modal
	modalOpen = false
	m.style.opacity = '0' // Set the opacity of the modal to 0
	m.style.transform = 'scale(1.1)'
	setTimeout(function () {
		m.remove() // After a second, remove the modal from the page completely
		o.setAttribute('style', 'opacity:0;pointer-events: none;') // Hides the overlay
	}, 200)
	return debug('Closed modal.')
}

function mdSetClose(mo) {
	onkeydown = e => {
		if (e.key == 'Escape') mdCloseModal($('overlay'), mo), onkeydown = () => { }
	}
	$('close').onclick = () => mdCloseModal($('overlay'), mo)
	return debug('Set close onclicks for modal ' + mo.children[0].innerHTML + '.')
}
/************************** 
 * SEARCH FUNCTIONS
 * by me lol
 * These functions power the search algorithm. 
 ***************************/
function search(term) {
	let plural
	let r = document.getElementsByClassName("item") // Gets all of the memes
	let removed = 0 // Amount of memes removed that didn't match term
	saveData.timesSearched++ // Increases times searched locally
	achCheck() // Check for achievements
	save()//Save
	for (let t = 0; t < memes.length; t++) { // For each meme,

		if (
			r[t].textContent.toLowerCase().indexOf(term.toLowerCase()) == -1 // IF the current meme contains the search term,
			&& //AND
			removed != memes.length //all of the memes weren't already removed,
		) {

			r[t].classList.add('not-found')
			r[t].classList.remove('found')
			removed++// increase amount removed
		} else { // if conditions weren't matched
			if (clearShowing == true) $('nores').remove(), clearShowing = false
			r[t].classList.add('found')
			r[t].classList.remove('not-found')
		}

		if (!term) {
			r[t].classList.remove('found')
			r[t].classList.remove('not-found')
		}

	}
	Math.abs(removed - memes.length) == 1 ? plural = '' : plural = 's'
	let y = document.createElement('P')
	window.innerWidth > 850 ?
		y.innerHTML = Math.abs(removed - memes.length) + ' result' + plural
		:
		y.innerHTML = Math.abs(removed - memes.length) + ' result' + plural + '. Scroll down if you don\'t see it'
	srchRes.appendChild(y)
	setTimeout(() => {
		y.remove()
	}, 2000)
	if (removed == memes.length && clearShowing == false) {
		clearShowing = true
		bod.insertAdjacentHTML('afterbegin', '<div id="nores">No results <button onclick="clearShowing = false;search(\'\');this.parentElement.remove()">clear</button></div>')
	}
	return debug('Searched for ' + term)
}

function loadAchs() {
	let plural
	saveData.achievementsList.length == 1 ? plural = '' : plural = 's'
	if (saveData.achievementsList.length == 0) achl.innerHTML = `<p id="closeachl">×</p><div class="inner"><h1>No achievements yet..</h1></div>`
	else achl.innerHTML = `<p id="closeachl">×</p><div class="inner"><h1>Your achievement${plural} (${saveData.achievementsList.length})</h1></div>`
	$('closeachl').onmouseup = () => {
		achl.classList.remove('open')
	}
	for (let i = 0; i < saveData.achievementsList.length; i++) {
		document.querySelector('.inner').insertAdjacentHTML('beforeend', `<div class="list-item"><p class="date">${saveData.achievementsList[i].at}</p><h1>${saveData.achievementsList[i].name} </h1><p>${saveData.achievementsList[i].desc}</p></div>`)
	}
	return debug('Loaded achievements.')
}
function set(e, r) {
	lscache.set(e, r, 1000000000)
}
function len(e) {
	var size = 0,
		key
	for (key in e) {
		if (e.hasOwnProperty(key)) size++
	}
	return size
}

function ind(e, i) {
	return e[Object.keys(e)[i]]
}

function achCheck() {
	for (let i = 0; i < memes.length; i++) { // For each meme:
		if (saveData.memes[i].viewed >= saveData.memes[i].reqs[0]) { // If this meme has been viewed more times than the requirement,
			achGet(memes[i].achievements[0], `View "${memes[i].name}" ${saveData.memes[i].reqs[0]} times`) // Get the achievement
			setTimeout(function () {
				saveData.achievementsList = remDupObj(saveData.achievementsList, 'desc')
				achClr(i)
				save()
			})
		}
	}
	if (saveData.timesViewed == 2 && achSearchName('Hey') == undefined) {
		achGet('Hey', `View the meme list 2 times`)
	} else if (saveData.timesViewed == 5 && achSearchName('Welcome back') == undefined) {
		achGet('Welcome back', `View the meme list 5 times`)
	}
	if (saveData.timesSearched >= saveData.search.reqs[0] && achSearchName(saveData.search.achievements[0]) == undefined) {
		achGet(saveData.search.achievements[0], `Search ${saveData.search.reqs[0]} time(s)`)
		saveData.search.achievements.shift()
		saveData.search.reqs.shift()
	}
	return debug('Checked for achievements.')
}

function achClr(i) {
	setTimeout(function () {
		memes[i].achievements.shift()
		memes[i].reqs.shift()
		saveData.memes[i].reqs.shift()
		saveData.memes[i].achievements.shift()
	})
	return debug('Shifted requirements for meme' + memes[i].name)
}

function achGet(name, desc) {
	if (achSearchName(name) == undefined) {
		saveData.achievementsList.push({
			name: name,
			desc: desc,
			at: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
		});
		iziToast.show({
			title: `Achievement Unlocked: ${name}<p style="display:block;font-weight:200;margin-bottom:10px;margin-right:14px;margin-top:10px;">${desc}</p>`,
			timeout: 8000,
			theme: 'dark'
		})
		save()
		return debug('Got achievement "' + name + '"')
	} else {
		return debug('Cannot get achievement "' + name + '", it already exists')
	}
}

function remDupObj(array, key) {
	var check = {}
	var res = []
	array.forEach(element => {
		if (!check[element[key]]) {
			check[element[key]] = true
			res.push(element)
		}
	})
	if (!res) return ('Checked for duplicates; however there were none.')
	else return res
}

function achSearchName(e) {
	var result = saveData.achievementsList.find(obj => {
		return obj.name === e
	})
	debug('Searched for "' + e + '" in achievements list.')
	return result
}

/************** FRUIT OF THE PERSON QUIZ *****************/
/* by me lol
 * started july 18 2021
 */

function fotpModal() {
	var iid = 0
	let y = document.createElement('DIV')
	y.classList.add('modal')
	y.innerHTML += `<h1>Fruit of the Person Quiz</h1>
  <i>Fill out the quiz below. Please, <b>BE HONEST</b> to improve accuracy!</i> <small><a href="privacy" style="display:inline">Privacy</a></small>`
	for (let i = 0; i < fotpQuestions.length; i++) {
		iid = 0
		y.innerHTML += `<br><h2>${fotpQuestions[i].name}</h2>`
		for (let j = 0; j < fotpQuestions[i].answers.length; j++) {
			iid++
			y.innerHTML += `<input type="radio" name="${fotpQuestions[i].id}" id="${fotpQuestions[i].id + iid}"><label for="${fotpQuestions[i].id + iid.toString()}">${fotpQuestions[i].answers[j].name}</label><br>`
		}
		if (i == fotpQuestions.length - 1) y.innerHTML += `<button onclick="fotpEval(document.querySelector('.modalwrap').children[0])">Evaluate!</button><p id="close" onclick="mdCloseModal($('overlay'),document.querySelector('.modal'))">×</p>`
	}
	let wr = document.querySelector('.modalwrap')
	wr.innerHTML = '' // Closes any currently open modals
	wr.appendChild(y) // adds the modal to the overlay
	return debug('Fruit of the person modal compiled and shown.')
}

function fotpEval(mod) {
	setTimeout(function () { mod.innerHTML = 'Evaluating...'; fotpMakeSurePerc() })
	setTimeout(function () { fotpShowResults(mod) }, 500)
	for (let i = 0; i < fotpQuestions.length; i++) {
		for (let j = 0; j < fotpQuestions[i].answers.length; j++) {
			if (document.getElementById(`${fotpQuestions[i].id + (j + 1).toString()}`).checked == true) {
				fotpQuestions[i].answers[j].points()
			}
		}
	}
	return debug('Evaluated fotp quiz results.')
}

function fotpMakeSurePerc() {
	for (let i = 0; i < fotpData.length; i++) {
		if (fotpData[i].count >= 100) fotpData[i] = 100
		fotpData[i].count = Math.round(fotpData[i].count * 2) / 2
	}
}

function fotpGetFruit() {
	var arr = []
	fotpData.sort(function (a, b) {
		return parseFloat(b.count) - parseFloat(a.count)
	})
	for (let i = 0; i < fotpData.length; i++) {
		arr.push({
			name: fotpData[i].name,
			count: fotpData[i].count
		})
		if (i == fotpData.length - 1) return arr
	}
	debug('Got fruit from results.')
}

function fotpShowResults(mod) {
	mod.innerHTML = `<h1>You're ${fotpGetFruit()[0].count}% ${fotpGetFruit()[0].name}.</h1>
    Next best matches were:<br>
     ${fotpGetFruit()[1].name} (${fotpGetFruit()[1].count}%)<br>
     ${fotpGetFruit()[2].name} (${fotpGetFruit()[2].count}%)
     <p id="close" onclick="mdCloseModal($('overlay'),document.querySelector('.modal'))">×</p>`
	saveData.myFruit = fotpGetFruit()[0]
	debug('Showed results.')
}

function getArticle(u) {
	let e = u.toLowerCase()
	if (e.startsWith('a') || e.startsWith('e') || e.startsWith('i') || e.startsWith('o') || e.startsWith('u')) return 'an'
	else return 'a'
}
/************** SAVING FUNCTIONS *****************/
/* by me lol
 * started july 23 2021
 * These functions handle the save part of the memelist.
 */

setTimeout(function () {
	saveData.timesViewed++
	save()
}, 2000)
if (lscache.get('achievements')) { // Backwards compatibility
	alert('You have save data that is only compatible with the old version (v1.3.0). The data will be cleared in order to migrate it to the new version (v2.0.0)')
	lscache.flush()
	lscache.remove('achievements')
}
if (!lscache.get('visited')) {
	save()
	set('visited', 'true')
	checkPlatform()
} else {
	loadFromSave()
	document.body.style.backgroundImage = 'url("./imgs/bg' + saveData.settings.background + '.jpg")'
	setTimeout(() => {
		checkPlatform()
	}, 1000)
}

function save() {
	let notSaved = JSON.stringify(saveData)
	set('data', notSaved)
	return debug('Saved.')
}

function loadFromSave() {
	saveData = JSON.parse(lscache.get('data'))
	return debug('Loaded from save.')
}
function svModal() { // Function to open modal. Kinda identical to the previous one (I could merge them, but its not the priority now)
	let y = new Modal() // creates element

	let save = btoa(unescape(encodeURIComponent(JSON.stringify(saveData).replace(/(\r\n|\n|\r)/gm, "")))) // The save code. Since local save was a raw object and not a string, it converts (Stringifys) local save (What the user did during browser session) to a string, then converts to base64.
	y.element.innerHTML = `
    <h1>Save Code</h1> 
    <p>This code is what's currently saved. You can change it to load a previous code, or save your code to use on a different device/browser.</p>
    <textarea id="saveTextarea" style="width:98%;height:50%;">${save}</textarea>
    <button onclick="svSetSave()">Load</button>
    <hr>
    <h1>Manage Save</h1>
    <p>If you want to save your progress, click the button below. (It's probably already saved though)</p>
    <button onclick="save()">Save Now</button>
    <br><br>
    <p>If you want to <b>clear everything</b>, click the button below. There is no going back from this option.</p>
    <button style="background:red;" onclick="svClearEverything()">Clear everything!!!!</button>
	<br><br>
	<p>This is the cheat button! Press this to get all the achievements. May cause your device to slow down temporarily (or even crash). </p>
	<button onclick="svCheat();" style="background:linear-gradient(45deg, red,orange)">Get all achievements</button>
    <p id="close">×</p>` // inner html of modal
	y.setClose()
	debug('Showed saves modal.')
}
$('getSave').onclick = () => svModal() // on click opens save modal

function svSetSave() { // sets save
	let saveContent = document.getElementById('saveTextarea') // save content
	try {
		if (typeof JSON.parse(atob(saveContent.value)) == undefined) saveData = JSON.parse(atob(saveContent.value)) // sets local save to be the converted save the user inputted
		save() // saves globally on user's device
		iziToast.show({
			title: `Loaded!<p style="display:block;font-weight:200;margin-bottom:10px;margin-right:14px;margin-top:10px;">Save was loaded successfully.</p>`,
			timeout: 10000,
			theme: 'dark'
		})
	} catch (err) {
		if (err == "InvalidCharacterError: Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.") alert(`Error! The Save Code you've entered in is invalid. (${err})`)
		else alert('Buddy, this doesn\'t look like a code to me. ' + err)
	}
}
debug('Set save.')

function svClearEverything() {
	let words = ['Ricky the Cruise Director', 'Put a little fresh auringe juice in there', 'Chocolo-fudge Peanuto-caramel', 'At the business centre, I\'m Mike Eppel']

	let rand = words[Math.floor(Math.random() * words.length)]
	if (prompt('Are you sure? Type \"' + rand + '\" if you want to continue...').toLowerCase() == rand.toLowerCase()) {
		lscache.remove('visited')
		alert('Your progress has been cleared. The Memelist will refresh after you dismiss this alert.')
		window.location.href = window.location.href
	} else {
		alert("Too bad lol")
	}
}

function svCheat() {
	for (let i = 0; i < 10; i++) {
		setTimeout(() => {
			for (let e = 0; e < memes.length; e++) {
				saveData.memes[e].viewed += 1
				if (e == memes.length - 1) {
					achCheck()
					setTimeout(() => {
						achCheck()
					}, 100)

					save()
				}
			}
		}, 100)
	}
	achGet("Hey", "View the meme list 2 times")
	achGet("Welcome back", "View the meme list 5 times")
	achGet("Hello again", "View the meme list 10 times")
	achGet("Hey, how are you?", "View the meme list 15 times")
	achGet("Woah, are you an addict?", "View the meme list 30 times")
	achGet("Just looking", "Search 1 time")
	achGet("Searching", "Search 10 times")
	achGet("Seeker", "Search 30 times")
	achGet("Metallic", "Use the meme list on Chrome (or a Chromium-based browser)")
	achGet("Blazing Hot", "Use the meme list on Firefox")
	achGet("Explorer", "Use the meme list on Safari")
	achGet("Internet Explorer can not display this title.", "Use the meme list on Internet Explorer")
	achGet("Mobile Memer", "Use the meme list on mobile")
	achGet("Orderly", "View the first meme first")
	achGet("Orderly in a different sense", "View the last meme first")
	achGet("Your first meme", "View 1 meme")
	achGet("The Real Kitchen Party!", "View all memes in a row.")
	save()
	achCheck()
}
/* Platform checking  */
function checkPlatform() {
	if (platform.name == "Chrome") {
		if (achSearchName('Metallic') == undefined) achGet('Metallic', 'Use the meme list on Chrome (or a Chromium-based browser)')
	} else if (platform.name == "Firefox") {
		if (achSearchName('Blazing Hot') == undefined) achGet('Blazing Hot', 'Use the meme list on Firefox')
	} else if (platform.name == "Safari") {
		if (achSearchName('Explorer') == undefined) achGet('Explorer', 'Use the meme list on Safari')
	} else if (platform.name == "IE") {
		if (achSearchName('Internet Explorer can not display this title.') == undefined) achGet('Internet Explorer can not display this title.', 'Use the meme list on Internet Explorer')
	} else if (platform.os.family == "iOS") {
		if (achSearchName('Mobile Memer') == undefined) achGet('Mobile Memer', 'Use the meme list on mobile')
	}
}

/* Games modal handling */
$('games').onclick = () => {
	gamesShowModal()
}
function gamesShowModal() {
	let html = `<h1> Games! </h1> <p id="close">&times;</p>`
	for (let i = 0; i < games.length; i++) {
		html += `<div class="games-card" onclick="${games[i].loadFunc}">
		<img src="${games[i].image}">
		<div>
			<h1 class="title">${games[i].name}</h1>
			<p class="highScore">Your High score: ${saveData.gameScores[i].score}</h2>
			<p class="description">${games[i].description}</p>
		</div>
		</div>`
	}
	let mod = new Modal()
	mod.element.innerHTML = html
	mod.setClose()
}
/****************************************
 * Hooy Typing Game
 * also by me lol
 * started oct 1
 ***************************************/
var hooyTimer = {
	seconds: 0,
	start: function (func) {
		func(hooyTimer.seconds)
		setInterval(function () {
			hooyTimer.seconds = Math.round((hooyTimer.seconds + 0.1) * 10) / 10
			func(hooyTimer.seconds)
		}, 100)
	},
	getResult: function () {
		for (let i = 0; i < 150; i++) window.clearInterval(i);
		return hooyTimer.seconds
	},
	reset: function () {
		hooyTimer.seconds = 0
	}
}
function hooyGenStr() {
	let hooies = []
	for (let i = 0; i < 10; i++) {
		let os = ``
		for (let j = 0; j < Math.round(Math.random() * 3) + 2; j++) {
			os += 'o'
		}

		let es = ``
		for (let k = 0; k < Math.round(Math.random() * 10) + 1; k++) {
			es += 'e'
		}
		hooies.push('h' + os + 'i' + es)
		if (i == 9) return hooies.join(' ')
	}
}
function hooyTypeModal() {
	let mod = new Modal()
	mod.element.innerHTML = `
	<p id="close">&times;</p>
	<h1>Hooie Typing Game</h1>
	<p>Type 10 Hooies with randomly generated lengths as fast as you can! <b>Tip: being slower instead of getting letters wrong gets you a higher score. </b><p>
	<button onclick="hooyTypeBegin()">Start</button>
	`
	mod.setClose()
}

function hooyTypeBegin() {
	let curLetter = 0, wrongLetters = 0, str = hooyGenStr(), mod = document.querySelector('.modal')
	mod.innerHTML = `
	<h1>Hooie Typing Game</h1>
	<p><span id="progress">0</span>/${str.length} | <span id="time"></span>s</p>
	<div id="typediv"><div class="carot"></div></div>
	`
	let td = $('typediv')
	for (let i = 0; i < str.length; i++) {
		td.innerHTML += `<span class="letter">${str.charAt(i)}</span>`
	}

	let currentLetterBCR = document.getElementsByClassName('letter')[curLetter].getBoundingClientRect()
	let carot = document.querySelector('.carot')
	var loffset = carot.getBoundingClientRect().left
	var toffset = carot.getBoundingClientRect().top
	let relativeBCRLeft = Math.round(currentLetterBCR.left - loffset) + 15
	let relativeBCRTop = Math.round(currentLetterBCR.top - toffset) + 20
	carot.style.left = relativeBCRLeft + 'px'
	carot.style.top = relativeBCRTop + 'px'
	onkeydown = e => {
		setTimeout(function () {
			if (curLetter == 0) {
				hooyTimer.start(function (seconds) {
					$('time').innerHTML = seconds
				})
			}
			$('progress').innerHTML = curLetter + 1

			if (curLetter == str.length - 1) hooyResults(str.length, wrongLetters)
			currentLetterBCR = document.getElementsByClassName('letter')[curLetter].getBoundingClientRect()
			let currentLetter = document.getElementsByClassName('letter')[curLetter]
			let relativeBCRLeft = Math.round(currentLetterBCR.left - loffset) + 35
			let relativeBCRTop = Math.round(currentLetterBCR.top - toffset) + 20
			carot.style.left = relativeBCRLeft + 'px'
			carot.style.top = relativeBCRTop + 'px'
			if (e.key == str.charAt(curLetter)) {
				currentLetter.classList.add('passed')
			} else {
				wrongLetters++
				currentLetter.classList.add('passed-red')
			}
			if (e.key == 'Backspace') {
				curLetter = Math.abs(curLetter - 1)
				currentLetter.classList.remove('passed')
				currentLetter.classList.remove('passed-red')
			}
			else curLetter++, currentLetter.classList.add('passed')
		}, 0)
	}
}
function hooyResults(typed, wrong) {
	onkeydown = () => { }
	let res = hooyTimer.getResult()
	let score = (Math.round(((typed - (wrong * 1.6)) / res) * 100) / 100) * 100
	let modal = document.querySelector('.modal')
	let grade
	if (score < 0) grade = 'You scored so low I had to make it 0 instead of ' + score, score = 0
	else if (score >= 0 && score <= 300) grade = 'You\'re horrible.'
	else if (score > 300 && score < 400) grade = 'I\'ve seen better'
	else if (score >= 400 && score < 500) grade = 'Average'
	else if (score >= 500 && score < 575) grade = 'Pretty good :)'
	else if (score >= 575 && score < 650) grade = 'Good job!'
	else if (score >= 650 && score < 700) grade = 'Amazing!! :D'
	else if (score >= 700) grade = 'Superhuman :O'
	else grade = 'Buddy you kind of broke the algorithm.'
	modal.innerHTML = `
	<p id="close" onclick="mdCloseModal($('overlay'),document.querySelector('.modal'))">&times;</p>
	<h1>Your Results</h1>
	<h2>${grade}</h2>
	<p>Elapsed time <light>${res}</light></p>
	<p>Letters Typed <light>${typed}</light></p>
	<p>Wrong Letters <light>${wrong}</light></p>
	<p>Your Score   <light>${score}</light></p>`

	saveData.gameScores[0].score = score
	save()
}
/***************************
 * Auringe Juice Game
 * started oct 2 2021
 * by me lol
 */

let auringePitcher, isAuringePouring, auringeJuiceAmt, auringeGamearea, auringeBeaker, timeToStopPouringAuringeJuice

function auringeModal() {
	let mod = new Modal()
	mod.element.innerHTML = `<h1>Auringe Juice Game</h1><p>Pour auringe juice into a beaker. When you stop pouring, the closer you get to the red line, the higher your score!</p><button onclick="auringeStart()">Start</button>`
	auringeGamearea = mod.element
}
function auringeStart(e) {
	if (!e) {
		auringeGamearea.classList.add('auringe-modal')
		auringeGamearea.innerHTML = `
	<div class="auringe-gamearea">
	<div class="pitcher"></div>
	<div class="beaker">
		<img draggable="false" src="./imgs/beaker.png" alt="">
		<div class="beakerContent"></div>
		<div class="redLine"></div>
	</div>
	</div>`
	}
	auringeBeaker = document.querySelector('.beaker')
	timeToStopPouringAuringeJuice = Math.round(Math.random() * (auringeBeaker.children[0].getBoundingClientRect().height - 100) + 50)
	document.querySelector('.redLine').style.bottom = timeToStopPouringAuringeJuice + 'px'
	auringePitcher = document.querySelector('.pitcher')
	isAuringePouring = false, auringeJuiceAmt = 0
	onmousedown = () => {
		if (isAuringePouring == false) auringeStartPouring()
		else auringeStopPouring()
	}
}
let pouringInterval
function auringeStartPouring() {
	isAuringePouring = true
	auringePitcher.classList.add('upside-down')

	pouringInterval = setInterval(function () {
		if (auringeJuiceAmt <= 248) {
			auringeJuiceAmt += 1
			console.log(auringeJuiceAmt)
			auringeBeaker.children[1].style.height = auringeJuiceAmt + 'px'
		} else auringeStopPouring()
	}, 10)
	setTimeout(function () {
		if (auringePitcher.classList.contains('upside-down')) auringePitcher.classList.add('pouring')
	}, 200)
}
function auringeTryAgain() {
	auringePitcher.classList.remove('upside-down')
	auringeJuiceAmt = 0
	document.querySelector('.beakerContent').style.height = '0px'
	auringeStart(true)
}
function auringeStopPouring() {
	onmousedown = () => { }
	isAuringePouring = false
	auringePitcher.classList.remove('upside-down')
	auringePitcher.classList.remove('pouring')
	clearInterval(pouringInterval)
	setTimeout(function () {
		if (!auringePitcher.classList.contains('pouring')) auringePitcher.classList.remove('upside-down')
	}, 200)
	auringeResults(auringeJuiceAmt, timeToStopPouringAuringeJuice)
}
function auringeResults(score, actual) {
	let finscore = (50 - Math.abs(actual - 4 - score)) / 2.4
	auringeGamearea.innerHTML += `<div class="results">
		 Your score is ${(Math.round(finscore * 10))}.
		 <button>Quit</button>
		 <button onclick="auringeTryAgain();this.parentElement.remove()">Try again</button>
		 </div>
		 `
}

/*******************************
 * Settings!
 * Started oct 1 2021 :D
 * by me lol, everything here is by me
 ******************************/

function stOpenAndHandleSettings() {
	let imgs = ``
	for (let i = 0; i < 5; i++) {
		if (document.body.style.backgroundImage == 'url("./imgs/bg' + (i + 1) + '.jpg")') {
			imgs += `<div class="img selected"  onclick="document.body.style.backgroundImage = 'url(./imgs/bg${i + 1}.jpg)';stCheckThis(this)"style="background-image:url(./imgs/bg${i + 1}.jpg)"></div>`
		} else imgs += `<div class="img" onclick="document.body.style.backgroundImage = 'url(./imgs/bg${i + 1}.jpg)';saveData.settings.background = ${i + 1};stCheckThis(this)" style="background-image:url(./imgs/bg${i + 1}.jpg)"></div>`
	}
	let settingsModal = new Modal()
	settingsModal.element.innerHTML = `
	<h1>Settings</h1>
	<p id="close">&times;</p>
	<h2>Background</h2>
	<div class="imgs-cont">${imgs}</div>`
	settingsModal.setClose()
}
function stCheckThis(el) {
	$('overlay').style.opacity = '0';
	document.querySelector('.modal').style.opacity = '0.2'
	setTimeout(() => {
		$('overlay').style.opacity = '';
		document.querySelector('.modal').style.opacity = ''
	}, 1500);
	for (let i = 0; i < document.querySelectorAll('.img').length; i++) {
		document.querySelectorAll('.img')[i].classList.remove('selected')
	}
	el.classList.add('selected')

	save()
}
