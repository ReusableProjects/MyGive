$(document).ready(function(){
    var bannerFirstNum=1;
    var bannerLastNum=3;
    var bannerPositionNum=1;
    $('#bannerMoveButtonLeft').click(function(){
        if(bannerPositionNum==bannerFirstNum)
            bannerPositionNum=bannerLastNum+1;
        bannerPositionNum--;
        str="../image/bannerImg"+bannerPositionNum+".png";
        $('#bannerImg').attr('src', str);
        $('.bannerPosition').css('background-color', 'gray');
        $('#bannerPosition'+bannerPositionNum).css('background-color', 'white');
    })
    $('#bannerMoveButtonRight').click(function(){
        if(bannerPositionNum==bannerLastNum)
            bannerPositionNum=bannerFirstNum-1;
        bannerPositionNum++;
        str="../image/bannerImg"+bannerPositionNum+".png";
        $('#bannerImg').attr('src', str);
        $('.bannerPosition').css('background-color', 'gray');
        $('#bannerPosition'+bannerPositionNum).css('background-color', 'white');
    })
})