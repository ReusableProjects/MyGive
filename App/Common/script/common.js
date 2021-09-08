$(document).ready(function(){
    $('#headerWrap #loginLetter').hover(function(){
        $('#loginLetter').css('color', 'gray');
    });
    $('#headerWrap #loginBox').hover(function(){
        $('#loginLetter').css('color', '#0d2123');
    });
    $('#headerWrap #loginBox').click(function(){
        window.location.href="../../MemberManagement/html/login.html";
    });
    $('#headerWrap #logo').click(function(){
        window.location.href="../../PostManagement/html/home.html";
    });
    $('#headerWrap #title').click(function(){
        window.location.href="../../PostManagement/html/home.html";
    });

    $('#headerWrap #homeTab').click(function(){
        window.location.href="../../PostManagement/html/home.html";
    });
    $('#headerWrap #introduceTab').click(function(){
        window.location.href="../../PostManagement/html/introduce.html";
    });
    $('#headerWrap #donateTab').click(function(){
        window.location.href="../../PostManagement/html/donate.html";
    });
    $('#headerWrap #historyTab').click(function(){
        window.location.href="../../CardHistoryManagement/html/cardHistory.html";
    });
    var popup=false;
    $('#headerWrap #moreTab').hover(function(){
        $('.popupMenu').css('visibility', "visible");
        popup=true;
    });
    $('#headerWrap #titleBox').hover(function(){
        $('.popupMenu').css('visibility', "hidden");
        popup=false;
    });
    $('#headerWrap #moreTab').click(function(){
        if(popup==false){
            $('.popupMenu').css('visibility', "visible");
            popup=true;
        }
        else{
            $('.popupMenu').css('visibility', "hidden");
            popup=false;
        }
    });
    $('#headerWrap #goodsTab').click(function(){
        window.location.href="../../PostManagement/html/goods.html";
    });
    $('#headerWrap #relayTab').click(function(){
        window.location.href="../../PostManagement/html/relay.html";
    });
    $('#headerWrap #FAQTab').click(function(){
        window.location.href="../../PostManagement/html/Q&A.html";
    });

    $('#contentWrap #FAQButton').click(function(){
        window.location.href="../html/Q&A.html";
     })
     $('#contentWrap .goodsBlockButton').click(function(){
         window.open($(this).attr('data'));
      })
    $('#contentWrap .serviceBlockButton').click(function(){
      window.location.href=$(this).attr('data');
    })

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