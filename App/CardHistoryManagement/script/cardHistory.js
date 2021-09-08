$(document).ready(function(){
    var homepageFlag=false;
    $('.homepage').click(function(){
        homepageFlag=true;
        window.open($(this).attr('data')).setTimeout(function(){
           homepageFlag=false;
        }, 10);

    })
    $('#organizationHistoryDiv li').click(function(){
        if(homepageFlag==false)
        {
            $('#popupBackground').css('visibility', 'visible');
            $('#popupContent').css('visibility', 'visible');
        }
    })
    $('#historyPopup #popupBackground, #quit').click(function(){
        $('#popupContent').css('visibility', 'hidden');
        $('#popupBackground').css('visibility', 'hidden');
    })
   
})