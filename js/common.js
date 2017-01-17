function writeRewardLog(ids,storage_key) {
	// for (var i = 0; i < ids.length; ++i) {
	// 	var id = ids[i];
	// 	$('.ss.'+storage_key +' ol ').append("<li data-number='" + id + "'>" + id + '</li>');
		
	// 	$("div.item:not(.ignore)").each(function () {
	// 		if ($(this).text() == id) {
	// 			$(this).addClass("ignore");
	// 		}
	// 	});
	// }
	// console.log("writeRewardLog",ids.length,storage_key+ "-sequence",$(".ss."+storage_key).html())
	// localStorage.setItem(storage_key+ "-sequence", $(".ss."+ storage_key).html());
	writeReward2UI(ids,storage_key);
	writeReward2Log(ids,storage_key);
}

function writeReward2UI(ids,storage_key){
	for (var i = 0; i < ids.length; ++i) {
		var id = ids[i];
		$('.ss.'+storage_key +' ol ').append("<li data-number='" + id + "'>" + id + '</li>');
		$("div.item:not(.ignore)").each(function () {
			if ($(this).text() == id) {
				$(this).addClass("ignore");
			}
		});
	}
}

function writeReward2Log(ids,storage_key) {
	var log = localStorage.getItem(storage_key+ "-sequence");
	for (var i = 0; i < ids.length; ++i) {
		var id = ids[i];
		log += ("<li data-number='" + id + "'>" + id + '</li>');
	}
	localStorage.setItem(storage_key+ "-sequence",log);
}

function writeSingleRewardLog(id)
{
	var ids = new Array();
	ids.push(id);
	writeRewardLog(ids);
}