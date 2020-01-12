$(document).ready(function () {
	$('.talk-description').click(function() {
		$(this).toggleClass('truncate');
	});

	$('.vote-up').click(function(e) {
		vote($(this));
		e.preventDefault();
	});

	$('.vote-down').click(function(e) {
		vote($(this));
		e.preventDefault();
	});

	$('.search').keyup(function() {
		search($(this));
	});

	$('form').submit(function(e) {
		search($(this).find('.search').first());
		e.preventDefault();
	});

	$('form .button').click(function(e) {
		search($(this).parent().parent().find('.search').first());
		e.preventDefault();
	});

	$('.sort-title').click(function() {
		// Credits: https://stackoverflow.com/a/1134983/1532986
		var list = $('.talk-list .row').first();
		var listitems = list.children().get();
		listitems.sort(function(a, b) {
			// Credits: https://stackoverflow.com/a/4374890/1532986
			a = $(a).find('.talk-title').first().text().toLowerCase().replace(/[^\w\s]/gi, '');
			b = $(b).find('.talk-title').first().text().toLowerCase().replace(/[^\w\s]/gi, '');
			return a.localeCompare(b);
		});
		$.each(listitems, function(index, item) {
			list.append(item);
		});
	});

	$('.sort-duration').click(function() {
		var list = $('.talk-list .row').first();
		var listitems = list.children().get();
		listitems.sort(function(a, b) {
			// Credits: https://stackoverflow.com/a/32885749/1532986
			a = $(a).find('.talk-duration').first().text().split(':');
			b = $(b).find('.talk-duration').first().text().split(':');
			var a_minutes = (+a[0]) * 60 + (+a[1]);
			var b_minutes = (+b[0]) * 60 + (+b[1]);
			// Credits: https://stackoverflow.com/a/11338910/1532986
			return (a_minutes < b_minutes) ? -1 : (a_minutes > b_minutes) ? 1 : 0;
		});
		$.each(listitems, function(index, item) {
			list.append(item);
		});
	});

	$('.sort-votes').click(function() {
		var list = $('.talk-list .row').first();
		var listitems = list.children().get();
		listitems.sort(function(a, b) {
			// Credits: https://stackoverflow.com/a/32885749/1532986
			a = Number($(a).find('.votes').first().text());
			b = Number($(b).find('.votes').first().text());
			// Credits: https://stackoverflow.com/a/11338910/1532986
			return (a < b) ? 1 : (a > b) ? -1 : 0;
		});
		$.each(listitems, function(index, item) {
			list.append(item);
		});
	});
});

function vote(elem) {
		$.get(elem.children().first().attr('href')).done(function() {
			var votes = Number(elem.parent().parent().find('.votes').text());
			if (elem.hasClass('vote-up')) {
				elem.parent().parent().find('.votes').text(votes + 1);
			} else if (elem.hasClass('vote-down')) {
				elem.parent().parent().find('.votes').text(votes - 1);
			}
		});
}

function search(elem) {
	$('.talk-item').removeClass('hide');
	var search = elem.val().toLowerCase();

	$('.talk-item').filter(function() {
		console.log($(this).find('.talk-description').text().toLowerCase().indexOf(search));
		return ($(this).find('.talk-title').text().toLowerCase().indexOf(search) < 0 && $(this).find('.talk-description').text().toLowerCase().indexOf(search) < 0);
	}).addClass('hide');
}
