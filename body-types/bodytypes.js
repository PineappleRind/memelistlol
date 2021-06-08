function $(id){return document.querySelectorAll(id)}

for (let i = 0; i < $('td').length; i++) {
  $('td')[i].onclick = () => {
    let desc = $('td')[i].getAttribute('description')
    openModal($('td')[i].innerHTML,desc)
  }
  console.log(i)
}

  let modalWrap = $('.modal-wrap')[0]
  let modal = $('.modal')[0]
    modalWrap.onclick = closeModal
function openModal(e,t){
  let html = `
  <h1>Body Type: ${e}</h1>
  <p>${t}</p>
  `

  modal.innerHTML = html
  modalWrap.classList.add('open')
  modal.classList.add('open')
  

}

function closeModal(){ let modalWrap = $('.modal-wrap')[0];
  let modal = $('.modal')[0];modalWrap.classList.add('open');
  modal.classList.add('open')}
