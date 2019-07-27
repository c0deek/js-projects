var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');

$overlay.append($image)
$("body").append($overlay);

$('#imageGallery a').click(function(event) {
	event.preventDefault();
	$overlay.show();
	var imgLocation = $(this).attr('href');
	$image.attr("src", imgLocation);
});

$overlay.click(function(event) {
	event.preventDefault();
	$overlay.hide();
});