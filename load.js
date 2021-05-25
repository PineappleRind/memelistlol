var bod = document.querySelector("main");
let things = ["BOYBOY","Furball","Meanig","Zhou", "Scuzi", "Grahy", "Heather's Kitchen Party", "Be One with the Pie Crust","Bad dad ad that make me sad, i am crab with a pad", "Fat Christina", "Maryolin!", "Ma name's BRITNEY", "Fabian", "At the business centre, Mike Hepple", "Marcello & Vivian Murphy", "Maurice", "John & Gladys", "Deep Dave", "Grapey", "C-H-E-A-P-O-U-L-E-A-R-N-I cheapoulearni", "Hoooooie", "Canala! Canala!", "TITONGO GET NO PAY", "Chocolo-fudge peanuto-caramel", "Andrew Chester", "Region of Prescott", "Rambleberry", "Aureara Borealis", "Guy Sax"];
var memes = {
    andrewChester: {
        name: "Andrew Chester",
        description: "A nickname for Andrew. When he does a front flip on the trampoline, the form of the flip is thin and fast, much like the name Chester."
    },
    atTheBusinessCentre: {
        name: "At the business centre, i'm Mike Hepple",
        description: "This meme stemmed from a 680 News business anchorman saying the phrase \"At the business centre, i'm Mike Hepple\" at the end of his Business report."
    },
    aurearaBorealis: {
        name: "Aureara Borealis",
        description: "When D was saying the phrase Aurora Borealis, he made a mistake and called it Aureara Borealis. The reaction was good enough to make the term a meme."
    },
    boyBoy: {
        name: "BOYBOY",
        description: "On Discord, A was spamming calling someone \"boy\", when he skipped pressing the Enter key to send it, causing a duplication of Boy,"
    },
}
function $(e) {
    return document.getElementById(e)
}
function getVal(e) {
    return Object.values(e)
}
let hue = 0;
function clr() {
    hue = hue + 10
    return `hsl(${hue},70%,50%)`
}
let final = getVal(memes)
let sorted = things.sort();
for (let i=0;i<things.length;i++){
    let y = '<button class="item" style="background: ' + clr() + '">' + final[i].name + '</button>' 
    bod.insertAdjacentHTML('beforeend',y)
}