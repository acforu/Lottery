var currentIndex = -1;





var slotReady = 0;
var slotRunning = 1;
var slotTryStop = 2;

var slotState = slotReady;

var u = 347.2;

var num_arr;
var reward_id = 0;
var init_background_pos_x = "50%";

function numRand() {
    var rand = Math.floor(Math.random() * ($("div.item:not(.ignore)").size()));
	console.log("numRand",$("div.item:not(.ignore)").size());
    var ret = $("div.item:not(.ignore)").eq(rand).text();
    return ret;
}

function reset() {
    currentIndex = -1;
    slotState = slotReady;
    reward_id = 0;
    $('.num').css('background-position', init_background_pos_x + '0px');
}

function RandResult() {
    reward_id = numRand();
    // $('#res').text('result = ' + reward_id);
    var str = reward_id.toString();
    while(str.length < 3)
    {
        str = "0" + str;
    }
    num_arr = (str + '').split('');

    num_arr.reverse();
    $(".num").css('background-position', init_background_pos_x + ' 0px');
    console.log("RandResult", num_arr);
}



function slideNumber(index) {
    $('.n' + index).animate({
        backgroundPosition: init_background_pos_x +  ' 800000px'
    }, {
        //duration: 6000+index*3000,
        duration: 300000,
        // easing: "linear",
        // complete: function(){
        //     if(index==3) isBegin = false;
        // }
    });
}

function BeginSlot() {
    slotState = slotRunning;
    slideNumber(currentIndex);
}

function EndSlot() {
    slotState = slotTryStop;
    $('.n' + currentIndex).stop(true, false);

    //var yPos = (u*60) - (u*num_arr[currentIndex]);
    var backgroundPosition = $(".n" + currentIndex).css('backgroundPosition').split(" ");
    console.log("background", backgroundPosition);
    var curPos = parseFloat(backgroundPosition[1].replace(/[^0-9-.]/g, ''));
    //curPos = Math.floor(curPos);
    console.log("curPos" + curPos);
    var numsHeigth = (u * 10);
    var targetPos = curPos + numsHeigth - curPos % (numsHeigth) + 2 * numsHeigth - u * num_arr[currentIndex];
    console.log("targetPos" + targetPos);
    setTimeout(function () {
        $(".n" + currentIndex).animate({
            backgroundPosition: init_background_pos_x + " " + targetPos + 'px'
        }, {
            //duration: 6000+index*3000,
            duration: 3000,
            easing: "easeOutCubic",
            complete: function () {
                slotState = slotReady;
                if(currentIndex == 2)
                {
					var rewards = [reward_id];
                    writeRewardLog(rewards,"chair");
                }
            }
        });
    }, 0);
}


function hit()
{
 	if (slotState == slotReady) {
            if (currentIndex == -1) {
                RandResult();
            }

            currentIndex++;


            if (currentIndex < 3) {
                BeginSlot();
            }
        } else if (slotState == slotRunning) {
            EndSlot();
        }
}

$(function () {
    // $('.n3').hide();

	var backgroundPosition = $('.num').css('background-position').split(" ");
    init_background_pos_x = backgroundPosition[0];
	// console.log("init_background_pos_x",init_background_pos_x)
	console.log("not ignore count",$("div.item:not(.ignore)").size());

		$("body").keydown(function (e) {
		if(localStorage.getItem("model") !="slot-machine")
				return;

		

		if (e.keyCode == 32 ) {
			hit();
			return true;
		}

		if (e.keyCode == 46 ) {
			reset();
			return true;
		}
    });
});