$(function() {
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			$(".navbar.navbar-fixed-top").addClass("scroll");
		} else {
			$(".navbar.navbar-fixed-top").removeClass("scroll");
		}
	});

	$('.scroller').click(function() {
		var section = $($(this).data("section"));
		var top = section.offset().top;

		$('html, body').animate({scrollTop: top}, 700);
		return false;
	});


});
