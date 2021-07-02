var cookie = {
        achievementsList: null,
        memes: [
        
        ],
        timesViewed: 0, // How many times the page was viewed by the user
        lightMode: false, // If light mode is turned on
        timesSearched: 0, // This will increment upwards when the search button is pressed :)
        timesClicked: 0, // Every time the user clicks on a meme button.
}
for (let i = 0; i < len(memes); i++) {
    cookie.memes.push(ind(memes,i))
    if (i == memes.length - 1) console.log(cookie.memes)
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

