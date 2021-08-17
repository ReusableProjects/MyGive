$(document).ready(function(){
    $('#loginLetter').hover(function(){
        $('#loginLetter').css('color', 'gray');
    });
    $('#loginBox').hover(function(){
        $('#loginLetter').css('color', '#0d2123');
    });
    $('#loginBox').click(function(){
        window.location.href="../../MemberManagement/html/login.html";
    });
    $('#logo').click(function(){
        window.location.href="../../PostManagement/html/index.html";
    });
    $('#title').click(function(){
        window.location.href="../../PostManagement/html/index.html";
    });

    $('#homeTab').click(function(){
        window.location.href="../../PostManagement/html/index.html";
    });
    $('#introduceTab').click(function(){
        window.location.href="../../PostManagement/html/introduce.html";
    });
    $('#donateTab').click(function(){
        window.location.href="../../PostManagement/html/donate.html";
    });
    $('#historyTab').click(function(){
        window.location.href="../../CardHistoryManagement/html/history.html";
    });
    var popup=false;
    $('#moreTab').hover(function(){
        $('.popupMenu').css('visibility', "visible");
        popup=true;
    });
    $('#titleBox').hover(function(){
        $('.popupMenu').css('visibility', "hidden");
        popup=false;
    });
    $('#moreTab').click(function(){
        if(popup==false){
            $('.popupMenu').css('visibility', "visible");
            popup=true;
        }
        else{
            $('.popupMenu').css('visibility', "hidden");
            popup=false;
        }
    });
    $('#goodsTab').click(function(){
        window.location.href="../../PostManagement/html/goods.html";
    });
    $('#relayTab').click(function(){
        window.location.href="../../PostManagement/html/relay.html";
    });
    $('#FAQTab').click(function(){
        window.location.href="../../PostManagement/html/Q&A.html";
    });

    $('#footerWrap #facebookIcon').click(function(){
        window.open("https://facebook.com");
    });
    $('#footerWrap #twitterIcon').click(function(){
        window.open("https://twitter.com");
    });
    $('#footerWrap #instagramIcon').click(function(){
        window.open("https://instagram.com");
    });
});