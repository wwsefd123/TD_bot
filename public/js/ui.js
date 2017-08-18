$(function(){
    imgOptimize();
});

//이미지 최적화
function imgOptimize()
{
    for(var i=0; i<$('img').length; i++)
    {
       $('img').eq(i).on('error',function(){

           if($(this).parent().height()<$(this).parent().width())
           {
               $(this).css({width:'auto', height:$(this).parent().height()+'px'});
           }else{
               $(this).css({width:'auto', height:'auto'});
           }
        });
    }
}

// 타이머 초기화
var timeoutSecond = 60;
var touchDt = new Date();
function initTimer()
{
    setInterval(function () {
        var nowDt = new Date();
        var sec = parseInt((nowDt.getTime() - touchDt.getTime()) / 1000);
        if (timeoutSecond > 0 && sec >= timeoutSecond) {
            touchDt = new Date();
            movePageTwist("/main/timeout");
        }
    }, 1000);

    $(window).on('touchend', function (e) {
        touchDt = new Date();
    });
}

// 타이머 설정
function setTimeoutSecond(sec)
{
    timeoutSecond = sec;
}

// 타이머 시작
function startTimer()
{
    touchDt = new Date();
}

// 타이머 정지
function stopTimer()
{
    timeoutSecond = 0;
}

//페이지 변환 로딩
var wait_loading = function()
{
    this.openPopup = function() {
        var tag = '<div class="loading_popup">'+
            '<div>'+
            '<span><img src="/img/loading.png" alt="로딩중" /></span>'+
            '</div>'+
            '</div>';
        $('body').append(tag);
    }

    this.closePopup = function() {
        $('.loading_popup').remove();
    }
}

function ajaxSend(url, data, type, contentType, dataType, callOk, callErr) {
    if (typeof(type) === undefined) {
        type = "GET";
    }

    if (typeof(contentType) === undefined) {
        contentType = "html";
    }

    if (typeof(dataType) === undefined) {
        dataType = "html";
    }

    if (contentType == "json") {
        contentType = "application/json; charset=UTF-8";
        data = JSON.stringify(data);
    } else {
        contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    }

    $.ajax({
        url: url,
        global: true,
        async: true,
        type: type,
        dataType: dataType,
        contentType: contentType,
        data: data,
        timeout: 300000,
        success: (data) => {
            if (typeof(callOk) !== typeof(undefined)) callOk(data);
        },
        error: (xhr, exception) => {
            console.log(xhr + ',' + exception);
            if (typeof(callErr) !== typeof(undefined)) callErr();
        }
    });
}

function TwistIn(callback) {
    TweenMax.set($('header'), {opacity: 0, rotationX:-30, transformPerspective:2000, transformOrigin:"50% 50% -100"});
    TweenMax.to($('header'), 0.5, {opacity: 1, rotationX:0, ease:Cubic.easeInOut, onComplete: callback});
    for(var i = 0; i < $('section').length; i++) {
        TweenMax.set($('section').eq(i), {opacity:0, rotationY:30, transformPerspective:2000, transformOrigin:"50% 50% -500"});
        TweenMax.to($('section').eq(i), 0.5, {delay:i*0.05, opacity: 1, rotationY:0, ease:Cubic.easeInOut});
    }
}

function TwistOut(callback) {
    TweenMax.to($('header'), 0.5, {opacity: 0, rotationX:30, ease:Cubic.easeInOut, transformPerspective:2000, transformOrigin:"50% 50% -100", onComplete: callback});
    for(var i = 0; i < $('section').length; i++) {
        TweenMax.to($('section').eq(i), 0.5, {delay:i*0.05, opacity: 0, rotationY:-30, ease:Cubic.easeInOut, transformPerspective:2000, transformOrigin:"50% 50% -500"});
    }
}

function movePageTwist(url, data, type, contentType, dataType) {
    if (window.lock != 'lock') {
        window.lock = 'lock';

        startTimer();
        TwistOut(() => {
            if (typeof(type) === undefined) {
                type = "GET";
            }

            if (typeof(contentType) === undefined) {
                contentType = "html";
            }

            if (typeof(dataType) === undefined) {
                dataType = "html";
            }

            var loaded = new wait_loading();
            loaded.openPopup();
            ajaxSend(url, data, type, contentType, dataType, (data) => {
                $("body").html(data);
                TwistIn();
                loaded.closePopup();
                window.lock = '';
            }, () => {
                loaded.closePopup();
                window.lock = '';
                ajaxSend("/main/error", {}, "GET", "html", "html", (data) => {
                    $("body").append(data);
                });
            });
        });
    }
}

function movePageFadeOut(url) {
    TweenMax.to($(".wrap"), 0.5, {opacity: 0, onComplete: () => {
        movePageTwist(url);
    }});
}

function movePageTwist1(url, data, type, contentType, dataType) {
    if (window.lock != 'lock') {
        window.lock = 'lock';

        startTimer();
        TwistOut(() => {
            if (typeof(type) === undefined) {
                type = "GET";
            }

            if (typeof(contentType) === undefined) {
                contentType = "html";
            }

            if (typeof(dataType) === undefined) {
                dataType = "html";
            }

            var loaded = new wait_loading();
            loaded.openPopup();
            $.ajax({
                type: type,
                url: url,
                data: data,
                success: function() {   
                    location.herf = url;  
                }
            });
        });
    }
}