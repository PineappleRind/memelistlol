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
        compatible: false
    },
    beOneWithThePieCrust: {
        name: "Be One with the Pie Crust",
        description: "Anthony was trying to make a gluten free/dairy free pumpkin pie. He found a recipe on YouTube featuring an energetic female Texan making a pumpkin pie. At one point she said, when molding the pie crust into the pie pan, \"Be One with the Pie Crust\". <b>To use this meme in Meme Craziness, say it slowly in an eerie, nasal kind of voice.</b>",
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
        description: "When Anthony and Daniel were repeating memes loudly, their dad said \"Can you guys stop going around like CANALA! CANALA!?\" <b>To use this meme in Meme Craziness, say it quickly in a throaty voice. Repeat as many times as you want.</b>",
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
        description: "The Meme Creators asked Marc to create a few memes. One of the memes he created was called \"Ma Name's Britney\". <b>To use this meme in Meme Craziness, say it really high pitched.",
        compatible: true
    },
    meanig: {
        name: "Meanig",
        description: 'When Anthony was spamming "MEANIE" on discord, he accidentally put a G at the end instead of an E. Nowadays, the meme is used as a substitute for the word Meanie. It has no vocal form.',
        compatible: false
    }
}
let valDone = getVal(sort(memes))
let arrDone = propValToArr(valDone)
var Memes = {
    load: function() {
        bod.insertAdjacentHTML('beforeend',`<i>Click for info. Bold = meme craziness compatible.</i>
        <form autocomplete="off" action="/action_page.php">
  <div class="autocomplete" style="width:300px;">
    <input id="myInput" type="text" name="myCountry" placeholder="Country">
  </div>
  <input type="submit">
</form><br>`)
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

function loadMemes() {
    autocomplete(document.getElementById("myInput"),arrDone,valDone)
    for (let i=0;i<Object.size(memes);i++){
        if (valDone[i].compatible === false) {
            var y = '<button class="item" style="background: ' + clr() + '">' + valDone[i].name + '</button>' 
        }
        else {
            var y = '<button class="item" style="background: ' + clr() + '; font-weight:900;">' + valDone[i].name + '</button>' 
        }
        bod.insertAdjacentHTML('beforeend',y)
        setTimeout(function(){
            let o = document.querySelectorAll('.item')[i]
            o.onclick = () => {
                modal(o,valDone[i].name,valDone[i].description)
            }
            //console.clear()
        })
    }
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


function autocomplete(inp, arr,obj) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }