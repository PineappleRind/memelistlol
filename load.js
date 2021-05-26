var bod = document.querySelector("main");
var cloneCount = 0
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
        compatible: true
    },
    beOneWithThePieCrust: {
        name: "Be One with the Pie Crust",
        description: "Anthony was trying to make a gluten free/dairy free pumpkin pie. He found a recipe on YouTube featuring an energetic female Texan making a pumpkin pie. At one point she said, when molding the pie crust into the pie pan, \"Be One with the Pie Crust\".",
        compatible: true
    },
    boyBoy: {
        name: "BOYBOY",
        description: "On Discord, Anthony was spamming calling someone \"boy\", when he skipped pressing the Enter key to send it, causing a duplication of Boy.",
        compatible: false
    },
    cheapoulearni: {
        name: "Cheapoulearni",
        description: "At a part, Andrew declared he had found an Italian person with the last name \"C-H-E-A-P-O-U-L-E-A-R-N-I\". A video was being recorded of him spelling out the last name, and it ended up becoming a meme.",
        compatible: true
    },
    canalaCanala: {
        name: "Canala! Canala!",
        description: "When Anthony and Daniel were repeating memes loudly, their dad said \"Can you guys stop going around like CANALA! CANALA!?\"",
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
    grahy: {
        name: "Grahy",
        description: "This meme was from a funny mispronunciation by Andrew and Marc's mom when trying to pronounce Gravy at the dinner table.",
        compatible: false
    },
    guySax: {
        name: "Guy Sax",
        description: "At a dinner table one evening, music started playing that sounded chill and attractive to listen to. Daniel consequently sucked in his cheeks and picked up a glass and calmly started drinking from it while twitching his eyebrows upward. It was called guy sax.",
        compatible: true
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
    }
}
function $(e) {
    return document.getElementById(e)
}
function getVal(e) {
    return Object.values(e)
}
Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
function sort(e) {
    let fin = Object.keys(e)
    .sort()
    .reduce(function (acc, key) { 
        acc[key] = e[key];
        return acc;
    }, {});
    console.log(fin)
    return fin
}
let light = 0;
function clr() {
    light = light + 10
    if (light <= 100 || light >= 50) return `hsl(${light},100%,30%)`
    else return `hsl(${light},100%,50%)`
}
let final = getVal(sort(memes))
for (let i=0;i<Object.size(memes);i++){
    if (final[i].compatible === false) {
        var y = '<button class="item" style="background: ' + clr() + '">' + final[i].name + '</button>' 
    }
    else {
        var y = '<button class="item" style="background: ' + clr() + '; font-weight:900;">' + final[i].name + '</button>' 
    }
    bod.insertAdjacentHTML('beforeend',y)
    setTimeout(function(){
        let o = document.querySelectorAll('.item')[i]
        o.onclick = () => {
            modal(o,final[i].name,final[i].description)
        }
        console.clear()
    })
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
    m.style.transform = 'translateY(10px)'
    setTimeout(function(){
        m.remove()
        o.setAttribute('style','opacity:0;pointer-events: none;')
    },1000)
}
$('darkToggle').onclick = () => {
    document.body.classList.toggle('dark')
}