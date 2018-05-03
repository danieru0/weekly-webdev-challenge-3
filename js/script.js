(function() {
	let menu = document.getElementById('menu'),
		hamburger = document.getElementById('hamburger'),
		nav = document.getElementById('navbar');
	
	hamburger.addEventListener('click', function() {
		if(menu.classList.contains('navbar__list--is-active')) {
			menu.classList.remove('navbar__list--is-active');
		} else {
			menu.classList.add('navbar__list--is-active');
		}
	});
	
	window.addEventListener('scroll', function() {
		let currentPosition = pageYOffset;
		if (currentPosition > 30) {
			nav.classList.add('navbar--is-sticky');
		} else {
			nav.classList.remove('navbar--is-sticky');
		}
	});
})();