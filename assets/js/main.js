// Sidebar collapse
// $("#menu-toggle").click(function(e) {
//   e.preventDefault();
//   $("#wrapper").toggleClass("toggled");
// });

// Scrollspy
$('body').scrollspy({ target: '.nav-menu' })

// Scroll to top
const scrollToTopButton = document.getElementById('scroll-to-top');

window.onscroll = () => scrollCheck();

const scrollCheck = () => {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
};

const scrollToTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  window.location.hash = '';
};

// Tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})