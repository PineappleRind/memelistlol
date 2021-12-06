function $(id) {return document.getElementById(id)}
let saveData = JSON.parse(localStorage.getItem('memelistdata'))
if (typeof saveData === 'string') {
	saveData = JSON.parse(saveData)
}

function save() {
	localStorage.setItem('memelistdata', JSON.stringify(saveData))
}
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

function hooyTypeBegin() {
	let curLetter = 0, wrongLetters = 0, str = hooyGenStr(), mod = document.querySelector('.container')
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
			carot.style.left = currentLetterBCR.left + 20 +  'px'
			carot.style.top = currentLetterBCR.top + 'px'
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
	let score = (Math.round(((typed - (wrong * 1.2)) / (res * 1.2)) * 100) / 100) * 120
	let modal = document.querySelector('.container')
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
	<h1>Your Results</h1>
	<h2>${grade}</h2>
	<p>Elapsed time <light>${res} seconds</light></p>
	<p>Letters Typed <light>${typed}</light></p>
	<p>Wrong Letters <light>${wrong}</light></p>
	<p>Correct Letters <light>${typed - wrong}</light></p>
	<p>Your Score   <light>${score}</light></p>`

	saveData.gameScores[0].score = score
	save()
}