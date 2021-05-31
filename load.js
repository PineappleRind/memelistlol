var bod = document.querySelector(".items-cont");
var main = document.querySelector('main')
var cloneCount = 0
var loaded
var memes = {
    andrewChester: {
        name: "Andrew Chester",
        description: "A nickname for Andrew. When he does a front flip on the trampoline, the form of the flip is thin and fast, much like the name Chester.",
        compatible: false
    },
    atTheBusinessCentre: {
        name: "At the business centre, I'm Mike Hepple",
        description: "This meme stemmed from a 680 News business anchorman saying the phrase \"At the business centre, i'm Mike Hepple\" at the end of his Business report.",
        compatible: false
    },
    aurearaBorealis: {
        name: "Aureara Borealis",
        description: "When Daniel was saying the phrase Aurora Borealis, he made a mistake and called it Aureara Borealis. The reaction was good enough to make the term a meme.",
        compatible: false
    },
    beOneWithThePieCrust: {
        name: "Be One with the Pie Crust",
        description: "Anthony was trying to make a gluten free/dairy free pumpkin pie. He found a recipe on YouTube featuring an energetic female Texan making a pumpkin pie. At one point she said, when molding the pie crust into the pie pan, \"Be One with the Pie Crust\".<hr> <b>To use this meme in Meme Craziness, say it slowly in an eerie, nasal kind of voice.</b>",
        compatible: true
    },
    boyBoy: {
        name: "BOYBOY",
        description: "On Discord, Anthony was spamming calling someone \"boy\", when he skipped pressing the Enter key to send it, causing a duplication of Boy.",
        compatible: false
    },
    cheapoulearni: {
        name: "Cheapoulearni",
        description: "At a part, Andrew declared he had found an Italian person with the last name \"C-H-E-A-P-O-U-L-E-A-R-N-I\". A video was being recorded of him spelling out the last name, and it ended up becoming a meme. ",
        compatible: true
    },
    canalaCanala: {
        name: "Canala! Canala!",
        description: "When Anthony and Daniel were repeating memes loudly, their dad said \"Can you guys stop going around like CANALA! CANALA!?\" <hr><b>To use this meme in Meme Craziness, say it quickly in a throaty voice. Repeat as many times as you want.</b>",
        compatible: true
    },
    chocoloFudgePeanutoCaramel: {
        name: "Chocolo-fudge peanuto-caramel",
        description: "The meme creators noticed that Sean had the essence of the name o'Henry, like the popular candy bar. They started associating the slogan of that candy bar with Sean, which was \"Chocolo-fudge Peanuto-caramel. O'Henry. Have it all.\" This was shortened to just Chocolo-fudge peanuto-caramel.",
        compatible: false
    },
    deepDave: {
        name: "Deep Dave",
        description: "Inspired by deep-voice announcers like Redd Pepper and the VoiceOver welcome voice, Deep Dave is a deep-voiced character made by Daniel. His catchphrase is \"My name is Dave.\"",
        compatible: false
    },
    fabian: {
        name: "Fabian",
        description: "Fabian is a singer with a high-pitched, chubby, buttery voice. He once did opera. His last name is Operadio. It was made from one of Daniel's funny voice ideas.",
        compatible: true
    },
    furball: {
        name: "Furball",
        description: "On a TV show called The Berenstain Bears, in an episode called \"The Big Blooper\", Sister and Lizzy watch a video titled \"Trouble at Big Bear High\". In the video, a basketball player says: \"Get out of my way, you furball.\" The opponent then returns with \"Who you calling furball, furball?\" And then proceeds to score a point. Sister and Lizzy then start using those phrases everywhere they go. In real life, the Meme Creators also started using it, and it became a meme. <hr><b>To use this meme in Meme Craziness, say the first phrase (\"Get out of my way, furball.\") and another person will say the second phrase (\"Who you calling furball, furball?\")",
        compatible: true
    },
    grahy: {
        name: "Grahy",
        description: "This meme was from a funny mispronunciation by Andrew and Marc's mom when trying to pronounce Gravy at the dinner table.",
        compatible: false
    },
    guySax: {
        name: "Guy Sax",
        description: "At a dinner table one evening, music started playing that sounded chill and attractive to listen to. Daniel consequently sucked in his cheeks and picked up a glass and calmly started drinking from it while twitching his eyebrows upward. It was called guy sax.",
        compatible: false
    },
    heathersKitchenParty: {
        name: "Heather's Kitchen Party",
        description: "On the radio, Thomas happened to catch a funny ad of \"Heather's Kithen Party, April 28th\" and record it.",
        compatible: false
    },
    hooie: {
        name: "Hooie",
        description: "This is one of the first memes ever created! The exact origin of this meme is not clear, but it has to do with one of Daniel's random sounds he made. Due to the funniness of this meme, the \"Hooy Club\" (as it was called originally) was formed, with Daniel being the Hooy Chief. It was later discontinued.",
        compatible: true
    },
    johnAndGladys: {
        name: "John and Gladys",
        description: "The Meme Creators turned shared features in some grandparents into stereotypes. These included taking a walk with their neighbor occasionally, sitting on the veranda on a rocking chair, having grandchildren, and having a carpenter husband whose name is John.",
        compatible: false
    },
    maNamesBritney: {
        name: "Ma name's BRITNEY",
        description: "The Meme Creators asked Marc to create a few memes. One of the memes he created was called \"Ma Name's Britney\". <hr><b>To use this meme in Meme Craziness, say it really high pitched.",
        compatible: true
    },
    meanig: {
        name: "Meanig",
        description: 'When Anthony was spamming "MEANIE" on discord, he accidentally put a G at the end instead of an E. Nowadays, the meme is used as a substitute for the word Meanie. It has no vocal form.',
        compatible: false
    },
    marcelloAndVivianMurphy: {
        name: "Marcello & Vivian Murphy",
        description:'The exact origin of this meme is unknown. Marcello and Vivian Murphy have extraordinary vocal chords and can do a multitude of string instrument sounds, but mainly cello and violin. Marcello got this talent from his mom, Dorothy Murphy, when she was trying to teach him how to do harp sounds (Dorothy could do harp sounds but not cello). Marcello, though, emitted a most unusual sound to Dorothy, and that was the cello. Marcello then passed the talent on to his wife and children.',
        compatible: false
    },
    maryolin: {
        name: "Maryolin!",
        description: "The exact origin of this meme is unknown. Maryolin does a weird sound that can be described like this: starting high-pitched, but not too high pitched, then up REALLY high to almost a scream, then ending in a monotone-like high-pitched voice. All this is done while saying MARYOLIN!",
        compatible: false
    },
    maurice: {
        name: "Maurice",
        description: "This meme, Maurice (pronounced Morris), was from a drummer on GarageBand. The original Maurice from GarageBand played loose, hip-hop drums. The meme-ified Maurice could literally play anything, at any speed, to the extent that he grows another arm on his chest to help play.",
        compatible: false
    },
    rambleberry: {
        name: "Rambleberry",
        description: "In one of the Meme Creator's beds, a picture was taken of a Meme Creator making a funny face. The face is extremely hard to describe! It ended up being called the Rambleberry Face. A song has been made about it.",
        compatible: false
    },
    regionOfPrescott: {
        name: "Region of Prescott",
        description: "An announcer on a TV show was recorded saying \"Region of Prescott\". <hr><b>To use this meme in Meme Craziness, say each syllable in the following intonation: low, low, low, high, very high",
        compatible: true
    },
    scuzi: {
        name: "Scuzi",
        description: "The exact origin of this meme is unknown. Here's a story associated with the meme: It's 1 AM. The Meme Creator is in the bed with Andrew. Andrew asked the Meme Creator to say Scuzi. He did. <hr> <b> To use this meme in Meme Craziness, say each syllable with the following intonations: scu medium, zi low then high </b>",
        compatible: true
    },
    titongoGetNoPay: {
        name: "TITONGO GET NO PAY",
        description: "This meme refers to an Argentinian web developer who designed the UtilityBot website. The website looked horrible and Andrew decided to not pay him (he never said he was paying anyway). <hr><b>To use this meme in Meme Craziness, say it in a high-pitched Indian Voice.</b>",
        compatible: true
    },
    zhou: {
        name: "Zhou",
        description: "One of the Meme Creators said to the other, \"Zhou\". The other Meme Creator died laughing. Another form: \"We are going to the Zhou.\" <hr> <b>To use this meme in meme craziness, say it with an unnatural elongation of the syllable Zh and slightly high-pitched voice, ending with the Ou a little lower.</b>",
        compatible: true
    }
}
let valDone = getVal(sort(memes))
let arrDone = propValToArr(valDone)
var Memes = {
    load: function() {
        $('input').style.display = 'inline-block'
        $('search').style.display = 'inline-block'
        $('info').style.display = 'block'
       loadMemes()
    }
}
function $(e) {
    return document.getElementById(e)
}
function getVal(e) {
    return Object.values(e)
}
function propValToArr(obj) {
    var arr = [];
    for (let i = 0; i < obj.length; i++) {
        arr.push(obj[i].name)
       if (i == obj.length - 1) return arr.sort()
     }
}
function getNextKey(e, n) {
    var r = Object.keys(e),
        t = r.indexOf(n),
        o = r[t + 1];
    return e[o]
}

function sort(e) {
    let n = Object.keys(e).sort().reduce(function(n, r) {
        return n[r] = e[r], n
    }, {});
    return n
}
Object.size = function(e) {
    var n, r = 0;
    for (n in e) e.hasOwnProperty(n) && r++;
    return r
}
let light = 0;
function clr() {
    light = light + 10
    if (light <= 100 || light >= 50) return `hsl(${light},100%,30%)`
    else return `hsl(${light},100%,50%)`
}

function loadMemes() {
    loaded = true;
    for (let i = 0; i < Object.size(memes); i++) {
        var y = document.createElement('BUTTON')
        y.classList.add('item')
        y.innerHTML = valDone[i].name
        y.style.background = clr()
        y.description = getNextKey(valDone[i],'name')
        if (valDone[i].compatible === true) y.style.fontWeight = '900';
        bod.appendChild(y)

        setTimeout(function() {
            var o = document.querySelectorAll('.item')[i]
            o.onclick = () => {
                modal(o, o.innerHTML, o.description)
            }
            removeText(bod.firstChild)
        //console.clear()
    })
    }
    bod.insertAdjacentHTML('beforeend', y)
}
function modal(btn,name,desc) {
    let o = $('overlay')
o.setAttribute('style','opacity:1;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px;)')
    buttonClone(btn)
    showModal(name,desc)
}

function buttonClone(e) {
    if (e.childElementCount < 1) {
        let y = document.createElement('BUTTON')
        y.classList.add('item')
        y.style.backgroundColor = e.style.backgroundColor
        y.innerHTML = e.innerHTML
        e.appendChild(y)
        setTimeout(function(){
            y.remove()
        },800)
    }
    else return
    cloneCount++
}
function showModal(r,t) {
    let y = document.createElement('DIV')
    y.classList.add('modal')
    y.innerHTML = `
    <h1>Meme Info - ${r}</h1>
    <hr>
    <p>${t}</p>
    <p id="close" onclick="closeModal($('overlay'),document.querySelector('.modal'))">&times;</p>
    `
    let wr = document.querySelector('.modalwrap')
    wr.innerHTML = ''
    wr.appendChild(y)
}
function closeModal(o,m) {
    m.style.opacity = '0'
    m.style.transform = 'translateY(30px)'
    setTimeout(function(){
        m.remove()
        o.setAttribute('style','opacity:0;pointer-events: none;')
    },1000)
}
$('darkToggle').onclick = () => {
    document.body.classList.toggle('dark')
}


function autocomplete() {
    let input = document.getElementById('input')
    let removeCount = 0
    clear()
    setTimeout(function(){loadMemes();
    setTimeout(function(){
        searchDups()
        for (let i = 0; i < 5; i++){
            for (let j = 0; j < document.getElementsByClassName('item').length; j++) {
                let content = document.getElementsByClassName('item')[j].textContent.toLowerCase()
                if (!content.includes(input.value)) document.getElementsByClassName('item')[j].remove()
                removeCount++
                if (document.getElementsByClassName('item').length == 0) main.innerHTML += 'No results :( <button onclick="window.location.href=\'https://memelist.ml\'">Try again</button>'
            }
        }
    },100)},100)
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
