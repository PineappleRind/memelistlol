var bod = document.querySelector("main");
var cloneCount = 0
var memes = {
    andrewChester: {
        name: "Andrew Chester",
        description: "A nickname for Andrew. When he does a front flip on the trampoline, the form of the flip is thin and fast, much like the name Chester."
    },
    atTheBusinessCentre: {
        name: "At the business centre, I'm Mike Hepple",
        description: "This meme stemmed from a 680 News business anchorman saying the phrase \"At the business centre, i'm Mike Hepple\" at the end of his Business report."
    },
    aurearaBorealis: {
        name: "Aureara Borealis",
        description: "When Daniel was saying the phrase Aurora Borealis, he made a mistake and called it Aureara Borealis. The reaction was good enough to make the term a meme."
    },
    beOneWithThePieCrust: {
        name: "Be One with the Pie Crust",
        description: "Anthony was trying to make a gluten free/dairy free pumpkin pie. He found a recipe on YouTube featuring an energetic female Texan making a pumpkin pie. At one point she said, when molding the pie crust into the pie pan, \"Be One with the Pie Crust\"."
    },
    boyBoy: {
        name: "BOYBOY",
        description: "On Discord, Anthony was spamming calling someone \"boy\", when he skipped pressing the Enter key to send it, causing a duplication of Boy."
    },
    cheapoulearni: {
        name: "Cheapoulearni",
        description: "At a part, Andrew declared he had found an Italian person with the last name \"C-H-E-A-P-O-U-L-E-A-R-N-I\". A video was being recorded of him spelling out the last name, and it ended up becoming a meme."
    },
    canalaCanala: {
        name: "Canala! Canala!",
        description: "When Anthony and Daniel were repeating memes loudly, their dad said \"Can you guys stop going around like CANALA! CANALA!?\""
    },
    chocoloFudgePeanutoCaramel: {
        name: "Chocolo-fudge peanuto-caramel",
        description: "The meme creators noticed that Sean had the essence of the name o'Henry, like the popular candy bar. They started associating the slogan of that candy bar with Sean, which was \"Chocolo-fudge Peanuto-caramel. O'Henry. Have it all.\" This was shortened to just Chocolo-fudge peanuto-caramel."
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
    let y = '<button class="item" style="background: ' + clr() + '">' + final[i].name + '</button>' 
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