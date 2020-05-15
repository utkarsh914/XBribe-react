export const dismissModal = (id) => {
  // $(`#${id}`).modal('hide')
  let modal = document.getElementById(id);
  let modalBackdrops = document.getElementsByClassName('modal-backdrop');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  document.body.removeChild(modalBackdrops[0]);
  document.body.classList.remove('modal-open');
  document.body.style.paddingRight = 0;
}