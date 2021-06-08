function $(id){return document.querySelectorAll(id)}

for (let i = 0; i < $('td').length; i++) {
  $('td')[i].onclick = () => {
    let desc = $('td')[i].getAttribute('description')
    openModal($('td')[i].innerHTML,desc)
  }
  console.log(i)
}

function openModal(e,t){
  let html = `
  <h1>Body Type: ${e}</h1>
  <p>${t}</p>
  `
  let modalWrap = $('.modal-wrap')[0]
  let modal = $('.modal')[0]
  modal.innerHTML = html
  modalWrap.classList.add('open')
  modal.classList.add('open')
}
