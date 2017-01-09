function writeRewardLog(ids) {
	// $('.ss ol').append('<h3>抽取' + ids.length + '个</h3>');
	for (var i = 0; i < ids.length; ++i) {
		var id = ids[i];
		// $('.ss ol').append('<p>' + id + "号" + '</p>');
		$('.ss ol').append("<li data-number='" + id + "'>" + id + '</li>');
		$("div.item:not(.ignore)").each(function () {
			if ($(this).text() == id) {
				$(this).addClass("ignore");
			}
		});
	}

	localStorage.setItem("sequence", $(".ss").html());
}

function writeSingleRewardLog(id)
{
	var ids = new Array();
	ids.push(id);
	writeRewardLog(ids);
}