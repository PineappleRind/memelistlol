var bod = document.querySelector(".items-cont"); // The variables. These are "shortcuts"; I select the element on the page and store it. This one can be referred to as "bod" in the code.
var main = document.querySelector('main')
var inp = document.getElementById('input')
var achl = document.querySelector('.achievements-list')
var cloneCount = 0
var curMeme = 0
var memeStreak = true
var loaded, modalOpen
let light = Math.round(Math.random() * 365);

inp.style.display = 'inline-block'
document.getElementById('search').style.display = 'inline-block'
document.getElementById('info').style.display = 'block'
document.getElementById('loading').style.display = 'none'
loadMemes()
achCheck()
$('closeachl').onmouseup = () => {
	achl.classList.remove('open')
}
$('achievements').onclick = () => {
	achl.classList.add('open')
}

function $(e) {
	return document.getElementById(e)
}

function clr() { // The function for colors, so that the buttons' background color goes from red, to pink, and back again
	light = light + 3
	if (light <= 100 || light >= 50) return `hsl(${light},100%,30%)`
	else return `hsl(${light},100%,50%)`
}

function loadMemes() {

	loaded = true;
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
				mdShowModal(memes[i].name, memes[i].description)
			}, 200) // Open the modal 
			cookie.memes[i].viewed++ // Increase the view count of the specific meme
			cookie.timesClicked++ // Increase the overall view count

			/**/
			if (cookie.viewedAMemeBefore == false) {
				if (i == 0) achGet('Orderly', 'View the first meme first')
				if (i == memes.length - 1) achGet('Orderly in a different sense', 'View the last meme first')
				achGet('Your first meme', 'View 1 meme')
				cookie.viewedAMemeBefore = true
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
		if (memes[i].compatible === true) p.style.fontWeight = '900'; // If the meme is compatible with Meme Craziness bold it
		bod.appendChild(p) // Add the button to the page
		
	}

	return 'Memes loaded.'
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
		}, 1 * 1000)
	} else return cloneCount++
	return 'Button "' + btn.innerHTML + '" cloned.'
}

inp.onkeydown = e => {
	if (e.key == 'Enter') document.getElementById('search').click() // If the user pressed the key "Enter" search the value
}
/***********************
 * Modal Functions
 ***********************/


function mdShowModal(r, t) {
	modalOpen = true
	let o = $('overlay') // Overlay variable (for the overlay)
	o.setAttribute('style', 'opacity:1;filter:blur(60px);')
	let y = document.createElement('DIV') // Creates a miscellanous object
	y.classList.add('modal') // adds a class to it
	y.innerHTML = ` <h1>Meme Info <span>${r}</span></h1> 
            <hr>
            <p>${t}</p>
            <p id="close" onclick="mdCloseModal($('overlay'),document.querySelector('.modal'))">×</p>
            ` // Puts the content of the modal
	let wr = document.querySelector('.modalwrap')
	document.body.onkeyup = e => {
		if (e.code == 'Escape' && modalOpen == true) mdCloseModal($('overlay'), document.querySelector('.modal'))
	}
	wr.innerHTML = '' // Closes any currently open modals
	wr.appendChild(y) // adds the modal to the overlay
	return 'Showed modal.'
}

function mdCloseModal(o, m) { // Function to close the modal
	modalOpen = false
	m.style.opacity = '0' // Set the opacity of the modal to 0
	m.style.transform = 'scale(1.1)'
	setTimeout(function () {
		m.remove() // After a second, remove the modal from the page completely
		o.setAttribute('style', 'opacity:0;pointer-events: none;') // Hides the overlay
	}, 200)
	return 'Closed modal.'
}

function mdSetClose(mo) {
	$('close').onclick = () => mdCloseModal($('overlay'), mo)
}
/************************** 
 * SEARCH FUNCTIONS
 * by me lol
 * These functions power the search algorithm. 
 * They were minified, so going to be hard to explain
 ***************************/
function search() {
	let term = document.getElementById("input")
	let r = document.getElementsByClassName("item")
	let removed = 0
	cookie.timesSearched++ // Increases times searched locally
	achCheck()
	save()
	for (let t = 0; t < memes.length; t++) {
		if (
			r[t].textContent.toLowerCase().indexOf(term.value) == -1
			&&
			removed != memes.length - 1
		) {
			r[t].style.display = 'none';
			removed++
		} else {
			r[t].style.display = 'inline-block'
		}
	}
	return 'Searched.'
}

function clear() {
	bod.innerHTML = ''
	return 'Cleared.'
}


setTimeout(function () {
	cookie.timesViewed++
	save()
}, 5000)

if (!lscache.get('visited')) {
	save()
	set('visited', 'true')
	checkPlatform()
} else {
	loadFromSave()
	setTimeout(() => {
		checkPlatform()
		save()
	}, 1000); 
}

loadAchs()

function save() {
	let notSaved = JSON.stringify(cookie)
	set('achievements', notSaved)
}

function loadAchs() {
	if (cookie.achievementsList.length == 0) achl.innerHTML = `<p id="closeachl">×</p><div class="inner"><h1>No achievements yet..</h1></div>`
	else achl.innerHTML = `<p id="closeachl">×</p><div class="inner"><h1>Your achievements (You have ${cookie.achievementsList.length})</h1></div>`
	$('closeachl').onmouseup = () => {
		achl.classList.remove('open')
	}
	for (let i = 0; i < cookie.achievementsList.length; i++) {
		document.querySelector('.inner').insertAdjacentHTML('beforeend', `<div class="list-item"><h1>${cookie.achievementsList[i].name}</h1><p>${cookie.achievementsList[i].desc}</p></div>`)
	}
}

function loadFromSave() {
	cookie = JSON.parse(lscache.get('achievements'))
}

function set(e, r) {
	lscache.set(e, r, 10000000000)
}
function len(e) {
	var size = 0,
		key;
	for (key in e) {
		if (e.hasOwnProperty(key)) size++;
	}
	return size
}

function ind(e, i) {
	return e[Object.keys(e)[i]];
}

function achCheck() {
	for (let i = 0; i < memes.length; i++) {
		if (cookie.memes[i].viewed >= cookie.memes[i].reqs[0]) {
			achGet(memes[i].achievements[0], `View "${memes[i].name}" ${cookie.memes[i].reqs[0]} times`)
			setTimeout(function () {
				cookie.achievementsList = remDupObj(cookie.achievementsList, 'desc');
				achClr(i)
				save()
			})
		}
	}
	loadAchs()
	if (cookie.timesViewed == 2 && achSearchName('Hey') == undefined) {
		achGet('Hey', `View the meme list 2 times`)
	} else if (cookie.timesViewed == 5 && achSearchName('Welcome back') == undefined) {
		achGet('Welcome back', `View the meme list 5 times`)
	}
	if (cookie.timesSearched >= cookie.search.reqs[0] && achSearchName(cookie.search.achievements[0]) == undefined) {
		achGet(cookie.search.achievements[0], `Search ${cookie.search.reqs[0]} time(s)`)
		cookie.search.achievements.shift()
		cookie.search.reqs.shift()
	}
}

function achClr(i) {
	setTimeout(function () {
		memes[i].achievements.shift()
		memes[i].reqs.shift()
		cookie.memes[i].reqs.shift()
		cookie.memes[i].achievements.shift()
	})
}
function remDupObj(array, key) {
	var check = {};
	var res = [];
	array.forEach(element => {
		if (!check[element[key]]) {
			check[element[key]] = true;
			res.push(element);
		}
	});
	return res;
}

function achGet(name, desc) {
	cookie.achievementsList.push({
		name: name,
		desc: desc
	});
	iziToast.show({
		title: `Achievement Unlocked: ${name}<p style="display:block;font-weight:200;margin-bottom:10px;margin-right:14px;margin-top:10px;">${desc}</p>`,
		timeout: 8000,
		theme: 'dark'
	});
}

function achSearchName(e) {
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
}

function fotpEval(mod) {
	setTimeout(function () {
		mod.innerHTML = 'Evaluating...'
		fotpMakeSurePerc()
	})
	setTimeout(function () {
		fotpShowResults(mod)
	}, 500)
	for (let i = 0; i < fotpQuestions.length; i++) {
		for (let j = 0; j < fotpQuestions[i].answers.length; j++) {
			if (document.getElementById(`${fotpQuestions[i].id + (j + 1).toString()}`).checked == true) {
				fotpQuestions[i].answers[j].points()
			}
		}
	}
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
		return parseFloat(b.count) - parseFloat(a.count);
	});
	for (let i = 0; i < fotpData.length; i++) {
		arr.push({
			name: fotpData[i].name,
			count: fotpData[i].count
		})
		if (i == fotpData.length - 1) return arr
	}
}

function fotpShowResults(mod) {
	mod.innerHTML = `<h1>You're ${fotpGetFruit()[0].count}% ${fotpGetFruit()[0].name}.</h1>
    Next best matches were:<br>
     ${fotpGetFruit()[1].name} (${fotpGetFruit()[1].count}%)<br>
     ${fotpGetFruit()[2].name} (${fotpGetFruit()[2].count}%)
     <p id="close" onclick="mdCloseModal($('overlay'),document.querySelector('.modal'))">×</p>`
	cookie.myFruit = fotpGetFruit()[0]
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

function svB64(str, en) { // Converts save data to base64.
	if (en == true) { // If en (the parameter that is passed) is true, convert *to* base64.
		try { // If there's no error,
			return window.btoa(unescape(encodeURIComponent(str))); // Return converted base64.
		} catch (err) { // If there is an error,
			svDisplayError(err) // Display the error in this function.
		}
	} else { // If it's false, convert *from* base64.
		try { // If there's no error,
			return window.atob(unescape(encodeURIComponent(str))); // Return.
		} catch (err) { // If there is an error,
			svDisplayError(err) // Display the error in this function.
		}
	}
}

function svDisplayError(error) { // Function to show error.
	let modal = document.querySelector('.modal') // Get modal
	modal.innerHTML += `<p style="color:red;">Error! More detailed info: ${error}</p>` // Adds this <P> element to the end of the modal.
}

function svModal() { // Function to open modal. Kinda identical to the previous one (I could merge them, but its not the priority now)
	let y = document.createElement('DIV') // creates element
	y.classList.add('modal') //adds class
	y.style.height = '70%' // height
	let wr = document.querySelector('.modalwrap')
	wr.innerHTML = '' // Closes any currently open modals
	wr.appendChild(y) // adds the modal to the overlay
	let o = $('overlay') // Overlay variable (for the overlay)
	o.setAttribute('style', 'opacity:1;filter:blur(60px);') // shows overlay
	let save = svB64(JSON.stringify(cookie).replace(/(\r\n|\n|\r)/gm, ""), true) // The save code. Since local save was a raw object and not a string, it converts (Stringifys) local save (What the user did during browser session) to a string, then converts to base64.
	y.innerHTML = `
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
	<p>This is the cheat button! Press this to get all the achievements! :D</p>
	<button onclick="svCheat();alert('Ready? You'll get ALL achievements. May cause your device to slow down temporarily.')" style="background:linear-gradient(45deg,cyan,rebeccapurple)">Hahahaha</button>
    <p id="close">×</p>` // inner html of modal
	mdSetClose(y) // sets the onclick events of the close button to close modal
}
$('getSave').onclick = () => svModal() // on click opens save modal

function svSetSave() { // sets save
	let saveContent = document.getElementById('saveTextarea') // save content
	try {
		if (typeof JSON.parse(saveContent.value) != object) cookie = JSON.parse(atob(saveContent.value)) // sets local save to be the converted save the user inputted
		save() // saves globally on user's device
		iziToast.show({
			title: `Loaded!<p style="display:block;font-weight:200;margin-bottom:10px;margin-right:14px;margin-top:10px;">Save was loaded successfully.</p>`,
			timeout: 10000,
			theme: 'dark'
		});
	} catch (err) {
		alert(`Error! The Save Code you've entered in is invalid. (${err})`)
	}
}

function svClearEverything() {
	if (prompt('Are you sure? Type \"forthememes\" if you want to continue...') == 'forthememes') {
		lscache.remove('visited')
		alert('Your progress has been cleared. The Memelist will refresh after you dismiss this alert.')
		window.location.href = window.location.href
	} else {
		alert("Lol, knew you didn't have enough courage KEK")
	}
}

function svCheat() {
	for (let e = 0; e < memes.length; e++) {
		cookie.memes[e].viewed = 10;
		if (e == memes.length - 1) {
			achCheck();
			achCheck();
			save();
		}
	}
	achGet("Hey", "View the meme list 2 times");
	achGet("Welcome back", "View the meme list 5 times");
	achGet("Hello again", "View the meme list 10 times");
	achGet("Hey, how are you?", "View the meme list 15 times");
	achGet("Woah, are you an addict?", "View the meme list 30 times");
	achGet("Just looking", "Search 1 time");
	achGet("Searching", "Search 10 times");
	achGet("Seeker", "Search 30 times");
	achGet("Metallic", "Use the meme list on Chrome (or a Chromium-based browser)");
	achGet("Blazing Hot", "Use the meme list on Firefox");
	achGet("Explorer", "Use the meme list on Safari");
	achGet("Internet Explorer can not display this title.", "Use the meme list on Internet Explorer");
	achGet("Mobile Memer", "Use the meme list on mobile");
	achGet("Orderly", "View the first meme first");
	achGet("Orderly in a different sense", "View the last meme first");
	achGet("Your first meme", "View 1 meme");
	achGet("The Real Kitchen Party!", "View all memes in a row.");
	save();
	achCheck();
	loadAchs()
}

/*
Platform checking 
*/

function checkPlatform() {
	if (platform.name == "Chrome") {
		if (achSearchName('Metallic') == undefined) achGet('Metallic', 'Use the meme list on Chrome (or a Chromium-based browser)')
	} else if (platform.name == "Chrome") {
		if (achSearchName('Blazing Hot') == undefined) achGet('Blazing Hot', 'Use the meme list on Firefox')
	} else if (platform.name == "Chrome") {
		if (achSearchName('Explorer') == undefined) achGet('Explorer', 'Use the meme list on Safari')
	} else if (platform.name == "Chrome") {
		if (achSearchName('Internet Explorer can not display this title.') == undefined) achGet('Internet Explorer can not display this title.', 'Use the meme list on Internet Explorer')
	} else if (platform.os.family == "iOS") {
		if (achSearchName('Mobile Memer') == undefined) achGet('Mobile Memer', 'Use the meme list on mobile')
	}

	loadAchs()
}
// these 
// comments
// exist 
// only
// to 
// make
// the 
// file 
// 500 
// lines 
//:D