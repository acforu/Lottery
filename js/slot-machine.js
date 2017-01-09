var currentIndex = -1;





var slotReady = 0;
var slotRunning = 1;
var slotTryStop = 2;

var slotState = slotReady;

var u = 265;

var num_arr;
var reward_id = 0;

function numRand() {
    var rand = Math.floor(Math.random() * ($("div.item:not(.ignore)").size()));
    var ret = $("div.item:not(.ignore)").eq(rand).text();
    return ret;
}

function reset() {
    currentIndex = -1;
    slotState = slotReady;
    reward_id = 0;
    $('.num').css('background-position', '11px 0px');
}

function RandResult() {
    reward_id = numRand();
    $('#res').text('result = ' + reward_id);
    var str = reward_id.toString();
    while(str.length < 3)
    {
        str = "0" + str;
    }
    num_arr = (str + '').split('');

    num_arr.reverse();
    $(".num").css('background-position', '11px 0');
    console.log("RandResult", num_arr);
}



function slideNumber(index) {
    $('.n' + index).animate({
        backgroundPosition: '11px ' + 800000 + 'px'
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
            backgroundPosition: '11px ' + targetPos + 'px'
        }, {
            //duration: 6000+index*3000,
            duration: 3000,
            easing: "easeOutCubic",
            complete: function () {
                slotState = slotReady;
                if(currentIndex == 2)
                {
					var rewards = [reward_id];
                    writeRewardLog(rewards);
                }
            }
        });
    }, 0);
}


$(function () {
    // $('.n3').hide();
    $('.btn').click(function () {
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
    });

    $('.reset_btn').click(function () {
        reset();
    });
});