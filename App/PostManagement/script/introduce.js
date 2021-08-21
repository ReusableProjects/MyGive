$(document).ready(function(){
    $('.companyImg, .companyTextDiv').click(function(){
        window.open($(this).attr('data'));
    })
})