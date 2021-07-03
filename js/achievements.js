var cookie = {
        "achievementsList": null,
        "memes": [
                {
                "name": "Andrew Chester",
                "achievements": ["Chester Simp", "Chester Servant", "Chester Spouse"],
                "viewed": 0,
                "reqs": [2,5,10],
            },
        ],
        "timesViewed": 0, // How many times the page was viewed by the user
        "lightMode": false, // If light mode is turned on
        "timesSearched": 0, // This will increment upwards when the search button is pressed :)
        "timesClicked": 0, // Every time the user clicks on a meme button.
}
onload = () => {
  loadCookie()
  cookie.timesViewed++
  updateCookie()
}
  console.log(get("achievements"))
function updateCookie(e) {
  set('achievements',JSON.stringify(cookie))
}
function loadCookie() {
  cookie = JSON.parse(get('achievements'))
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
    document.cookie = name + "=" + val + ";" + expires + ";path=/";
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
      if (memes[i].viewed >= memes[i].reqs[0]) {
        notifcation(memes[i].achievements[0])
        arrRemove(memes[i].reqs[0])
        arrRemove(memes[i].achievements[0])
        arrRemove(cookie.memes[i].achievements[0])
      }
    }
}

function arrRemove(arr, index) {
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function notification(name,desc) {
   iziToast.show({
    title: `Achievement Unlocked: ${name}<p style="display:block;font-weight:200;margin-bottom:10px;margin-right:14px;margin-top:10px;">${desc}</p>`,
    timeout: 115000,
    titleSize: '20px',
    theme:'dark'
});
}