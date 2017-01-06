var currentIndex = -1;

function numRand() {
    var x = 9999; //上限
    var y = 1111; //下限
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}

function reset() {
    currentIndex = -1;
    slotState = slotReady;
    $('.num').css('background-position', '11px 0px');
}



var slotReady = 0;
var slotRunning = 1;
var slotTryStop = 2;

var slotState = slotReady;

var u = 265;

var num_arr;

function RandResult() {
    var result = numRand();
    $('#res').text('result = ' + result);
    num_arr = (result + '').split('').reverse();
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
            }
        });
    }, 0);
}


$(function () {

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