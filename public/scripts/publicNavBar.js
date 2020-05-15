document.addEventListener("scroll", function(){
  let a = document.getElementById('section2');
  let nav = document.getElementById('navbar');
  if (a && nav){
    if (window.pageYOffset > a.offsetTop){
      nav.style.display = 'flex';
    }
    else {
      nav.style.display = 'none';
    }
  }
})

console.log('Script is added');