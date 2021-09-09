$(document).ready(function(){
    $('.companyImg, .companyTextDiv').click(function(){
        window.open($(this).attr('data'));
        //각 참여 기업에 data로 홈페이지 주소를 저장해둔 후 기업블럭이 클릭될시 해당 데이터를 꺼내와 홈페이지를 열어줍니다
    })
})