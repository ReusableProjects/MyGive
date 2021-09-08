$(document).ready(function(){
    var homepageFlag=false;
    var certificationFlag=false;
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
        $('#certificationImg').css('visibility', 'hidden');
    })
    $('.receipt').click(function(){
        $('#certificationImg').attr('src', $(this).attr('data'));
        $('#certificationImg').css('visibility', 'visible');
        certificationFlag=true;
        setTimeout(function(){
            certificationFlag=false;
        }, 10);
    })
    $('.photo').click(function(){
        $('#certificationImg').attr('src', $(this).attr('data'));
        $('#certificationImg').css('visibility', 'visible');
        certificationFlag=true;
        setTimeout(function(){
            certificationFlag=false;
        }, 10);
    })
    $('#popupContent').click(function(){
        if(certificationFlag==false)
            $('#certificationImg').css('visibility', 'hidden');
    })
   
})