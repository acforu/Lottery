function writeRewardLog(ids,storage_key) {
	// $('.ss ol').append('<h3>抽取' + ids.length + '个</h3>');
	for (var i = 0; i < ids.length; ++i) {
		var id = ids[i];
		// $('.ss.'+storage_key +' ol ').append('<p>' + id + "号" + '</p>');
		$('.ss.'+storage_key +' ol ').append("<li data-number='" + id + "'>" + id + '</li>');
		
		$("div.item:not(.ignore)").each(function () {
			if ($(this).text() == id) {
				$(this).addClass("ignore");
			}
		});
	}
	console.log("writeRewardLog",ids.length,storage_key+ "-sequence",$(".ss."+storage_key).html())
	localStorage.setItem(storage_key+ "-sequence", $(".ss."+ storage_key).html());
}

function writeSingleRewardLog(id)
{
	var ids = new Array();
	ids.push(id);
	writeRewardLog(ids);
}