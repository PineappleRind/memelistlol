let ncont = document.getElementById('notifs')
let col = 0
function notif(name,desc) {
    col = col + 10
    let notifBase = `
        <div class="notif" style="border-right: 5px solid hsl(${col},100%,50%)">
            <div class="notif-bottom">
                <h1>${name}</h1>
                <h2>${desc}</h2>
            </div>  
        </div>
        `
    if (ncont.children.length == 0) ncont.insertAdjacentHTML('beforeend', notifBase)
    else {
        clear(notifBase)
    }
}

function clear() {
    ncont.style.animationName = 'clearing'
    setTimeout(function(){
        ncont.innerHTML = ''
        setTimeout(function(){
            ncont.insertAdjacentHTML('beforeend', notifBase)
        })
                    ncont.style.animationName = ''
    },200)
}