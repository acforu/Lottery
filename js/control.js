$("document").ready(function () {
	sync(false);
	$("#submit").click(
		function () {
			sync(true);


			var ss_model = "desk";
			if (localStorage.getItem("model")) {
				var model = localStorage.getItem("model");
				if (model == "desk")
					ss_model = "desk";
				else
					ss_model = "chair";
			}

			var array = $("#ignore-numbers").val().split(",").map(Number);
			writeReward2Log(array, ss_model);

			$("#ignore-numbers").val("");
		}
	);

	$("#reset").click(
		function () {
			if (confirm("点击确定将清空抽奖结果。")) {
				reset();
			}

		}
	);
});


function reset() {
	localStorage.setItem("desk-sequence", "");
	localStorage.setItem("chair-sequence", "");
	$("#ignore-numbers").val("");
}
var binding_data = [
	["#title", "title", "抽奖"],
	// ["#ignore-numbers", "ignore-numbers", ""],
	["#personCount", "personCount", "32"],
	["#itemk", "itemk", "40px"],
	["#itemg", "itemg", "40px"],
	["#count-round", "count-round", "5"],
]

function sync(save) {
	//初始化标题

	if (save) {
		for (var index = 0; index < binding_data.length; ++index) {
			var item = binding_data[index];
			var default_val = item[2];
			var storage_key = item[1];
			var id = item[0];
			localStorage.setItem(storage_key, $(id).val());
		}
	} else {
		for (var index = 0; index < binding_data.length; ++index) {
			var item = binding_data[index];
			var default_val = item[2];
			var storage_key = item[1];
			var id = item[0];
			if (localStorage.getItem(storage_key))
				$(id).val(localStorage.getItem(storage_key));
			else
				$(id).val(default_val);
		}
	}

	//模式选择
	if (save) {
		localStorage.setItem("model", $('input[type="radio"][name="model"]:checked').val());
		console.log("save");
	} else {
		var select_val = "desk";
		if (localStorage.getItem("model"))
			select_val = localStorage.getItem("model");

		$("input[type='radio'][name='model'][value= " + select_val + "]").attr("checked", "checked");
	}

}