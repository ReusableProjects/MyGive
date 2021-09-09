$(document).ready(function(){
        //테이블에 요청 전송
        function send(){
            $.post('/organizationList');//기부자가 기부한 조직의 목록을 불러옵니다
        };
        send();
    var homepageFlag=false;
    var certificationFlag=false;
    $('.homepage').click(function(){
        homepageFlag=true;
        window.open($(this).attr('data')).setTimeout(function(){//data속성으로 홈페이지 주소를 넣어두고 클릭시 꺼내와서 열어줍니다
           homepageFlag=false;
        }, 10);

    })
    $('#organizationHistoryDiv li').click(function(){//기업카드를 클릭시 해당 기업의 카드 입출금 내역이 뜹니다
        if(homepageFlag==false)
        {
            $('#popupBackground').css('visibility', 'visible');
            $('#popupContent').css('visibility', 'visible');
        }
    })
    $('#historyPopup #popupBackground, #quit').click(function(){//팝업창의 x버튼 또는 검은 뒷배경 클릭시 팝업창이 사라집니다
        $('#popupContent').css('visibility', 'hidden');
        $('#popupBackground').css('visibility', 'hidden');
        $('#certificationImg').css('visibility', 'hidden');
    })
    $('.receipt').click(function(){//영수증 인증버튼 클릭시 사진이 해당 출금의 영수증내역으로 바뀌며 보이게됩니다
        $('#certificationImg').attr('src', $(this).attr('data'));
        $('#certificationImg').css('visibility', 'visible');
        certificationFlag=true;
        setTimeout(function(){
            certificationFlag=false;
        }, 10);//판단이 끝난 후 거의 곧바로 flag를 원래대로 돌려주어 다음 클릭에 대비합니다
    })
    $('.photo').click(function(){//사진 인증버튼 클릭시 사진이 해당 출금의 사진내역으로 바뀌며 보이게됩니다
        $('#certificationImg').attr('src', $(this).attr('data'));
        $('#certificationImg').css('visibility', 'visible');
        certificationFlag=true;
        setTimeout(function(){
            certificationFlag=false;
        }, 10);
    })
    $('#popupContent').click(function(){//기업카드 내의 홈페이지 버튼을 클릭할 떄에도 기업 카드 입출금내역이 뜨는 현상을 방지합니다
        if(certificationFlag==false)//certificationFlag를 탐지하여 홈페이지를 누르려 한 것인지 카드를 누르려 한 것인지 알아냅니다
            $('#certificationImg').css('visibility', 'hidden');
    })
});