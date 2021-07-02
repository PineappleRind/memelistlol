var cookie = {
        achievementsList: null,
        memes: [
                {name:"Andrew Chester",description:"A nickname for Andrew. When he does a front flip on the trampoline, the form of the flip is thin and fast, much like the name Chester.",compatible:false,achievements:["Chester Simp","Chester Servant","Chester Spouse"]},
                {name:"Appley",description:"Some people have excess fat. Some people sound soapy, like apples. Some people have a round body. Some people are very very fast. And some people have all of these qualities! Introducing: Appley People.",compatible:false,achievements:["Red Delicious Apple","Gala Apple","Spartan Apple"]},
                {name:'Assorted "Insults"',description:"These \"Insults\" are from different places. They are pretty funny, but sometimes people don't like them (I have no idea why 😭). A few of these are: <br>You sound like a blender | You're a bronze goblin | You're a busted scooter at the dump. | You're so old, you smell like musty bean water.<br>There are a lot more too! They're all memes.<hr><b>To use this meme in meme craziness, randomly insult someone!</b>",compatible:true,achievements:["You’re a bronze goblin","You sound like a blender","You're worse than 300 itchy sweaters"]},
                {name:"At the business centre, I'm Mike Hepple",description:'This meme stemmed from a 680 News business anchorman saying the phrase "At the business centre, i\'m Mike Hepple" at the end of his Business report.',compatible:false,achievements:["Mike's friend","Mike's colleague","Mike himself"]},
                {name:"Aureara Borealis",description:"When Meme Creator 1 was saying the phrase Aurora Borealis, he made a mistake and called it Aureara Borealis. The reaction was good enough to make the term a meme.",compatible:false,achievements:["Lights","Southern Lights","Northern Lights"]},
                {name:"Be One with the Pie Crust",description:'Meme Creator 2 was trying to make a gluten free/dairy free pumpkin pie. He found a recipe on YouTube featuring an energetic female Texan making a pumpkin pie. At one point she said, when molding the pie crust into the pie pan, "Be One with the Pie Crust".<hr> <b>To use this meme in Meme Craziness, say it slowly in an eerie, nasal kind of voice.</b>',compatible:true,achievements:["Lights","Southern Lights","Northern Lights"]},
                {name:"Body Types",description:'This meme is about the shapes of some people\'s bodies. For example, a Ball is shaped like a ball. <b>We have a website JUST for body types! <a href="/body-types">Here it is :)</a>',compatible:false,achievements:["Column","Wide Column","Wider Column"]},
                {name:"BOYBOY",description:'On Discord, Meme Creator 2 was spamming calling someone "boy", when he skipped pressing the Enter key to send it, causing a duplication of Boy.',compatible:false,achievements:["Boy","Boyboy","BOYBOYBOY"]}
        ],
        timesViewed: 0, // How many times the page was viewed by the user
        lightMode: false, // If light mode is turned on
        timesSearched: 0, // This will increment upwards when the search button is pressed :)
        timesClicked: 0, // Every time the user clicks on a meme button.
}
for (let i = 0; i < len(memes); i++) {
    cookie.memes.push(ind(memes,i))

}
function len(e) {
    var size = 0,
        key;
    for (key in e) {
     if (e.hasOwnProperty(key)) size++;
    }
    return size
}
function set(name,val) {
    const d = new Date();
    d.setTime(d.getTime() + (8640000000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function get(name) {
  name = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function ind(e,i) {
    return e[Object.keys(e)[i]];
}

function achievement() {
    for (let i = 0; i < len(memes); i++) {
    
    }
}
