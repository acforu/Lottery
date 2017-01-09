function writeRewardLog(ids) {
	// $('.ss ol').append('<h3>抽取' + ids.length + '个</h3>');
	for (var i = 0; i < ids.length; ++i) {
		var id = ids[i];
		// $('.ss ol').append('<p>' + id + "号" + '</p>');
		$('.ss ol').append("<p> class = 'li[data-number=" + id + "]'>" + id + '</p>');
		$("div.item:not(.ignore)").each(function () {
			if ($(this).text() == reward_id) {
				$(this).addClass("ignore");
			}
		});
	}

	localStorage.setItem("sequence", $(".ss").html());
}