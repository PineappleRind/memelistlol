/***************************
 * Auringe Juice Game
 * started oct 2 2021
 * by me lol
 */

 let auringePitcher, isAuringePouring, auringeJuiceAmt, auringeGamearea = document.querySelector('.container'), auringeBeaker, timeToStopPouringAuringeJuice, auringeText

 function auringeStart(e) {
     if (!e) {
         auringeGamearea.classList.add('auringe-modal')
         auringeGamearea.innerHTML = `
         <p class="score">0</p>
     <div class="auringe-gamearea">
     <div class="pitcher"></div>
     <div class="beaker">
         <img draggable="false" src="../imgs/beaker.png" alt="">
         <div class="beakerContent"></div>
         <div class="redLine"></div>
     </div>
     </div>`
     }
     auringeBeaker = document.querySelector('.beaker')
     auringeText = document.querySelector('.score')
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
 
         let curScore = auringeCompute(auringeJuiceAmt, timeToStopPouringAuringeJuice)
         auringeText.innerHTML = 'Points: ' + curScore.score
     }, 30)
     setTimeout(function () {
         if (auringePitcher.classList.contains('upside-down')) auringePitcher.classList.add('pouring')
     }, 200)
 }
 function auringeTryAgain() {
     auringePitcher.classList.remove('upside-down')
     auringeJuiceAmt = 0
     document.querySelector('.results').remove()
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
     let finscore = auringeCompute(score, actual)
     games[1].highScore = finscore.score
     saveData.gameScores[1].score = finscore.score
     auringeGamearea.innerHTML += `<div class="results">
         <h1>${finscore.rating}</h1>
          <p>Your score is ${finscore.score}, off by ${finscore.pixels} pixel${finscore.plural()}</p>
          <div>
              <button onclick="window.location.href = 'https://memelist.ml'">Quit</button>
              <button onclick="auringeTryAgain();this.parentElement.remove()">Try again</button>
         </div>
          </div>
          `
 }
 function auringeCompute(a, b) {
     let res = {}
     res.pixels = Math.abs(b - 8 - a)
     res.plural = function() {
         return res.pixels != 1 ? 's' : ''
     }
     res.score = Math.max(0, Math.round(1000 - Math.abs(b - 8 - a) / 1.4 * 10))
     if (res.score == 0) res.rating = "Horrible"
     else if (res.score <= 100 && res.score > 0) res.rating = "Very bad"
     else if (res.score <= 300 && res.score > 100) res.rating = "Bad"
     else if (res.score <= 600 && res.score > 300) res.rating = "Poor"
     else if (res.score <= 850 && res.score > 600) res.rating = "Fair"
     else if (res.score <= 900 && res.score > 850) res.rating = "Average"
     else if (res.score <= 960 && res.score > 900) res.rating = "Good"
     else if (res.score <= 999 && res.score > 960) res.rating = "Almost perfect"
     else if (res.score <= 1000 && res.score > 999) res.rating = "Perfect!"
     else res.rating = "Good job buddy, you broke the algorithm"
     return res
 }
 