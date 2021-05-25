var bod = document.querySelector("main");
let things = ["BOYBOY","Furball","Meanig","Zhou", "Scuzi", "Grahy", "Heather's Kitchen Party", "Be One with the Pie Crust","Bad dad ad that make me sad, i am crab with a pad", "Fat Christina", "Maryolin!", "Ma name's BRITNEY", "Fabian", "At the business centre, Mike Hepple", "Marcello & Vivian Murphy", "Maurice", "John & Gladys", "Deep Dave", "Grapey", "C-H-E-A-P-O-U-L-E-A-R-N-I cheapoulearni", "Hoooooie", "Canala! Canala!", "TITONGO GET NO PAY", "Chocolo-fudge peanuto-caramel", "Andrew Chester", "Region of Prescott", "Rambleberry", "Aureara Borealis", "Guy Sax"];
function $(e) {
    return document.getElementById(e)
}
let hue = 0;
function clr() {
    hue = hue + 10
    return `hsl(${hue},70%,50%)`
}
function mergeSort(e) {
    let t = e.length / 2;
    return e.length < 2 ? e : merge(mergeSort(e.splice(0, t)), mergeSort(e))
}

function merge(e, t) {
    let n = [];
    for (; e.length && t.length;) e[0] < t[0] ? n.push(e.shift()) : n.push(t.shift());
    return [...n, ...e, ...t]
}
let sorted = mergeSort(things);
it = sorted.map(function(e) {
    return '<button class="item" style="background: ' + clr() + '">' + e + '</button>'
}).join("") + "</button>"

bod.insertAdjacentHTML('beforeend',it)